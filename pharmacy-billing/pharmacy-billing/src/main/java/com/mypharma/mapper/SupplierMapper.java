package com.mypharma.mapper;

import com.mypharma.dto.SupplierDTO;
import com.mypharma.entity.Supplier;
import org.springframework.stereotype.Component;

@Component
public class SupplierMapper {
    // Entity -> DTO
    public SupplierDTO toDTO(Supplier supplier) {
        return SupplierDTO.builder()
                .id(supplier.getId())
                .name(supplier.getName())
                .companyName(supplier.getCompanyName())
                .phone(supplier.getPhone())
                .email(supplier.getEmail())
                .address(supplier.getAddress())
                .gstNumber(supplier.getGstNumber())
                .active(supplier.getActive())
                .build();
    }

    // DTO -> Entity
    public Supplier toEntity(SupplierDTO supplierDTO) {
        return Supplier.builder()
                .id(supplierDTO.getId())
                .name(supplierDTO.getName())
                .companyName(supplierDTO.getCompanyName())
                .phone(supplierDTO.getPhone())
                .email(supplierDTO.getEmail())
                .address(supplierDTO.getAddress())
                .gstNumber(supplierDTO.getGstNumber())
                .active(supplierDTO.getActive())
                .build();
    }
}
