package com.mypharma.mapper;

import com.mypharma.dto.PurchaseItemDTO;
import com.mypharma.entity.PurchaseItem;
import org.springframework.stereotype.Component;

@Component
public class PurchaseItemMapper {

    public PurchaseItem toEntity(PurchaseItemDTO dto) {
        return PurchaseItem.builder()
                // .productId(dto.getProductId())
                // .quantity(dto.getQuantity())
                // .unitPrice(dto.getUnitPrice())
                // .batchNumber(dto.getBatchNumber())
                // etc.
                .build();
    }

    public PurchaseItemDTO toDTO(PurchaseItem entity) {
        return PurchaseItemDTO.builder()
                // .productId(entity.getProductId())
                // .quantity(entity.getQuantity())
                // .unitPrice(entity.getUnitPrice())
                // .batchNumber(entity.getBatchNumber())
                // etc.
                .build();
    }
}
