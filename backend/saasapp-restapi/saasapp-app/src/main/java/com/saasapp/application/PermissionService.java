package com.saasapp.application;

import com.saasapp.domain.models.query.PagedResult;
import com.saasapp.domain.models.rbac.Permission;
import com.saasapp.domain.ports.in.PermissionUseCase;
import com.saasapp.domain.ports.out.persistenceport.PermissionPersistencePort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Application service implementing {@link PermissionUseCase}: read-only permission queries.
 */
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PermissionService implements PermissionUseCase {

    private final PermissionPersistencePort permissionPersistencePort;

    @Override
    public List<Permission> findAll() {
        return permissionPersistencePort.findAll();
    }

    @Override
    public PagedResult<Permission> findAll(int page, int size) {
        return permissionPersistencePort.findAll(page, size);
    }
}
