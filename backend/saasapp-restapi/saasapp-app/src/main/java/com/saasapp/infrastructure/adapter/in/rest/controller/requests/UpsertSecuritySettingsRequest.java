package com.saasapp.infrastructure.adapter.in.rest.controller.requests;

public record UpsertSecuritySettingsRequest(
        boolean twoFactorRequired
) {
}
