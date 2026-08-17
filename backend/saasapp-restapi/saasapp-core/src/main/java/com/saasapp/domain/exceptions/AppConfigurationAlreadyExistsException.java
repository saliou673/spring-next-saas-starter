package com.saasapp.domain.exceptions;

import com.saasapp.domain.enumerations.AppConfigurationCategory;

/**
 * Thrown when attempting to create a configuration entry that already exists.
 */
public class AppConfigurationAlreadyExistsException extends FunctionalException {
    public AppConfigurationAlreadyExistsException(AppConfigurationCategory category, String code) {
        super(
                "error.app-configuration.already-exists",
                "Reference data with category " + category + " and code " + code + " already exists.",
                category,
                code);
    }
}
