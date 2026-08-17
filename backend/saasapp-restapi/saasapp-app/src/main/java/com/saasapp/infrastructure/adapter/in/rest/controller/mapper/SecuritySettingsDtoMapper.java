package com.saasapp.infrastructure.adapter.in.rest.controller.mapper;

import com.saasapp.domain.models.securitysettings.SecuritySettings;
import com.saasapp.infrastructure.adapter.in.rest.controller.dto.SecuritySettingsDTO;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

/**
 * MapStruct mapper converting {@link SecuritySettings} to {@link SecuritySettingsDTO}.
 */
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface SecuritySettingsDtoMapper {

    SecuritySettingsDTO toDTO(SecuritySettings securitySettings);
}
