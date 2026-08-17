package com.saasapp.infrastructure.adapter.in.rest.controller.mapper;

import com.saasapp.domain.models.appconfiguration.AppConfiguration;
import com.saasapp.infrastructure.adapter.in.rest.controller.dto.AppConfigurationDTO;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

/**
 * MapStruct mapper converting {@link com.saasapp.domain.models.appconfiguration.AppConfiguration} to {@link com.saasapp.infrastructure.adapter.in.rest.controller.dto.AppConfigurationDTO}.
 */
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface AppConfigurationDtoMapper {

    AppConfigurationDTO toDTO(AppConfiguration appConfiguration);
}
