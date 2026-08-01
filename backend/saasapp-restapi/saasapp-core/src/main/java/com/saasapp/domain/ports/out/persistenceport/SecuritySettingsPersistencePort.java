package com.saasapp.domain.ports.out.persistenceport;

import com.saasapp.domain.models.securitysettings.SecuritySettings;

import java.util.Optional;

/**
 * Persistence port for the singleton security settings.
 */
public interface SecuritySettingsPersistencePort {

    /**
     * Persists or updates the security settings.
     *
     * @param securitySettings the settings to save
     * @return the saved settings
     */
    SecuritySettings save(SecuritySettings securitySettings);

    /**
     * Returns the security settings if they exist.
     *
     * @return the settings, or empty if not yet created
     */
    Optional<SecuritySettings> find();
}
