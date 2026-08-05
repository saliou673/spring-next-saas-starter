package com.saasapp.application;

import com.saasapp.config.ApplicationProperties;
import com.saasapp.domain.exceptions.*;
import com.saasapp.domain.models.auth.*;
import com.saasapp.domain.models.rbac.Permission;
import com.saasapp.domain.models.user.AuthenticatedUser;
import com.saasapp.domain.models.user.User;
import com.saasapp.domain.ports.in.TwoFactorUseCase;
import com.saasapp.domain.ports.out.CurrentUserEmailPort;
import com.saasapp.domain.ports.out.PasswordHasherPort;
import com.saasapp.domain.ports.out.TwoFactorProviderPort;
import com.saasapp.domain.ports.out.persistenceport.TwoFactorChallengePersistencePort;
import com.saasapp.domain.ports.out.persistenceport.UserPersistencePort;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Application service implementing {@link TwoFactorUseCase}: 2FA setup, confirmation, disable, and login verification.
 */
@Slf4j
@Service
@Transactional
public class TwoFactorService implements TwoFactorUseCase {

    private final Map<TwoFactorMethodType, TwoFactorProviderPort> providers;
    private final TwoFactorChallengePersistencePort challengePersistencePort;
    private final UserPersistencePort userPersistencePort;
    private final PasswordHasherPort passwordHasherPort;
    private final CurrentUserEmailPort currentUserEmailPort;
    private final ApplicationProperties applicationProperties;
    private final AuthenticationService authenticationService;

    public TwoFactorService(
            List<TwoFactorProviderPort> providers,
            TwoFactorChallengePersistencePort challengePersistencePort,
            UserPersistencePort userPersistencePort,
            PasswordHasherPort passwordHasherPort,
            CurrentUserEmailPort currentUserEmailPort,
            ApplicationProperties applicationProperties,
            AuthenticationService authenticationService
    ) {
        this.providers = providers.stream()
                .collect(Collectors.toMap(TwoFactorProviderPort::getType, Function.identity()));
        this.challengePersistencePort = challengePersistencePort;
        this.userPersistencePort = userPersistencePort;
        this.passwordHasherPort = passwordHasherPort;
        this.currentUserEmailPort = currentUserEmailPort;
        this.applicationProperties = applicationProperties;
        this.authenticationService = authenticationService;
    }

    @Override
    public Optional<TotpSetupData> initSetup(TwoFactorMethodType type) {
        User user = getCurrentUser();

        if (user.isTwoFactorEnabled()) {
            throw new TwoFactorAlreadyEnabledException();
        }

        TwoFactorProviderPort provider = getProvider(type);
        String code = provider.generateAndSendCode(user);

        challengePersistencePort.deleteByUserId(user.getId());

        Instant expiryDate = Instant.now().plus(applicationProperties.getTwoFactor().codeValidityPeriod());
        TwoFactorChallenge challenge = TwoFactorChallenge.create(
                UUID.randomUUID().toString(),
                user,
                code,
                type,
                TwoFactorChallengePurpose.SETUP,
                false,
                expiryDate
        );
        challengePersistencePort.save(challenge);

        return provider.buildSetupData(user, code);
    }

    @Override
    public void confirmSetup(String code) {
        User user = getCurrentUser();

        TwoFactorChallenge challenge = challengePersistencePort
                .findByUserIdAndPurpose(user.getId(), TwoFactorChallengePurpose.SETUP)
                .orElseThrow(InvalidTwoFactorChallengeException::noPendingSetup);

        if (challenge.isExpired()) {
            throw InvalidTwoFactorChallengeException.setupExpired();
        }

        TwoFactorProviderPort provider = getProvider(challenge.getType());
        if (!provider.verify(user, challenge.getCode(), code)) {
            throw InvalidTwoFactorChallengeException.invalidCode();
        }

        challengePersistencePort.deleteById(challenge.getId());

        if (TwoFactorMethodType.TOTP.equals(challenge.getType())) {
            user.setTotpSecret(challenge.getCode());
        }
        user.enableTwoFactor(challenge.getType());
        userPersistencePort.save(user);
    }

    @Override
    public void disable(String currentPassword) {
        User user = getCurrentUser();

        if (!user.isTwoFactorEnabled()) {
            throw new FunctionalException(
                    "error.two-factor.not-enabled",
                    "Two-factor authentication is not enabled for this account."
            );
        }

        if (!passwordHasherPort.matches(currentPassword, user.getUserCredentials().getPasswordHash())) {
            throw new InvalidCurrentPasswordException();
        }

        challengePersistencePort.deleteByUserId(user.getId());
        user.disableTwoFactor();
        userPersistencePort.save(user);
    }

    @Override
    public JwtToken verifyLoginChallenge(String challengeId, String code) {
        TwoFactorChallenge challenge = challengePersistencePort.findById(challengeId)
                .orElseThrow(InvalidTwoFactorChallengeException::notFoundOrExpired);

        if (!TwoFactorChallengePurpose.LOGIN.equals(challenge.getPurpose())) {
            throw InvalidTwoFactorChallengeException.invalidPurpose();
        }

        if (challenge.isExpired()) {
            throw InvalidTwoFactorChallengeException.expired();
        }

        User user = challenge.getUser();
        TwoFactorProviderPort provider = getProvider(challenge.getType());

        if (!provider.verify(user, challenge.getCode(), code)) {
            throw InvalidTwoFactorChallengeException.invalidCode();
        }

        challengePersistencePort.deleteById(challengeId);

        String authorities = user.resolvePermissions()
                .stream()
                .map(Permission::code)
                .collect(Collectors.joining(" "));

        AuthenticatedUser authenticatedUser = new AuthenticatedUser(
                user.getUserCredentials().getEmail(),
                authorities
        );

        return authenticationService.completeLogin(authenticatedUser, user.getUserCredentials().getEmail(), challenge.isRememberMe()).token();
    }

    private User getCurrentUser() {
        String email = currentUserEmailPort.getCurrentUserEmail();
        return userPersistencePort.findWithAuthoritiesByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));
    }

    private TwoFactorProviderPort getProvider(TwoFactorMethodType type) {
        TwoFactorProviderPort provider = providers.get(type);
        if (provider == null) {
            throw new IllegalStateException("No 2FA provider registered for type: " + type);
        }
        return provider;
    }
}
