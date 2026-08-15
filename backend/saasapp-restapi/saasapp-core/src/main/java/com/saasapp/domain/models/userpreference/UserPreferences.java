package com.saasapp.domain.models.userpreference;

/**
 * Structured user preferences persisted as a JSON document.
 */
public record UserPreferences(AppearancePreferences appearance, NotificationPreferences notifications) {

    // Falls back to defaults instead of rejecting nulls: this is deserialized
    // straight from the `user_preference.preferences` jsonb column, and rows
    // written before a field existed simply won't have that key in their
    // JSON - Jackson passes null for it, not a validation error to surface.
    public UserPreferences {
        if (appearance == null) {
            appearance = AppearancePreferences.defaultPreferences();
        }
        if (notifications == null) {
            notifications = NotificationPreferences.defaultPreferences();
        }
    }

    public static UserPreferences of(AppearancePreferences appearance, NotificationPreferences notifications) {
        return new UserPreferences(appearance, notifications);
    }

    public static UserPreferences defaults() {
        return new UserPreferences(
                AppearancePreferences.defaultPreferences(),
                NotificationPreferences.defaultPreferences()
        );
    }
}
