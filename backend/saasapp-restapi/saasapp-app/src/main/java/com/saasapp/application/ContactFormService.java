package com.saasapp.application;

import com.saasapp.domain.models.contact.ContactForm;
import com.saasapp.domain.ports.in.ContactFormUseCase;
import com.saasapp.domain.ports.out.NotificationSenderPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Application service implementing {@link ContactFormUseCase}: dispatches contact form submissions via notifications.
 */
@Service
@RequiredArgsConstructor
public class ContactFormService implements ContactFormUseCase {

    private final NotificationSenderPort notificationSenderPort;

    @Override
    public void submit(ContactForm contactForm) {
        notificationSenderPort.sendContactFormToAdmin(contactForm);
        notificationSenderPort.sendContactFormConfirmationToUser(contactForm);
    }
}
