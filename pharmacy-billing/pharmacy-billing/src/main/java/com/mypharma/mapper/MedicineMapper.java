package com.mypharma.mapper;

import com.mypharma.dto.MedicineDTO;
import com.mypharma.entity.Medicine;
import org.springframework.stereotype.Component;

@Component
public class MedicineMapper {
    public MedicineDTO convertToDTO(Medicine medicine) {
        return MedicineDTO.builder()
                .id(medicine.getId())
                .name(medicine.getName())
                .manufacturer(medicine.getManufacturer())
                .description(medicine.getDescription())
                .stockQuantity(medicine.getStockQuantity())
                .minimumStockLevel(medicine.getMinimumStockLevel())
                .build();
    }

    public Medicine convertToEntity(MedicineDTO dto) {
        return Medicine.builder()
                .id(dto.getId())
                .name(dto.getName())
                .manufacturer(dto.getManufacturer())
                .description(dto.getDescription())
                .stockQuantity(dto.getStockQuantity())
                .minimumStockLevel(dto.getMinimumStockLevel())
                .build();
    }
}
