package com.mypharma.mapper;

import com.mypharma.dto.PurchaseRequestDTO;
import com.mypharma.dto.PurchaseResponseDTO;
import com.mypharma.dto.PurchaseItemDTO;
import com.mypharma.entity.Purchase;
import com.mypharma.entity.PurchaseItem;
import com.mypharma.entity.Supplier;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PurchaseMapper {

    private final PurchaseItemMapper purchaseItemMapper;

    public PurchaseMapper(PurchaseItemMapper purchaseItemMapper) {
        this.purchaseItemMapper = purchaseItemMapper;
    }

    // RequestDTO -> Entity
    public Purchase toEntity(PurchaseRequestDTO dto, Supplier supplier) {

        Purchase purchase = Purchase.builder()
                .invoiceNumber(dto.getInvoiceNumber())
                .purchaseDate(dto.getPurchaseDate())
                .supplier(supplier)
                .paymentStatus(dto.getPaymentStatus())
                .build();

        if (dto.getItems() != null) {
            List<PurchaseItem> items = dto.getItems()
                    .stream()
                    .map(itemDTO -> {
                        PurchaseItem item = purchaseItemMapper.toEntity(itemDTO);
                        item.setPurchase(purchase);
                        return item;
                    })
                    .toList();

            purchase.setPurchaseItems(items);
        }

        return purchase;
    }


    // Entity -> ResponseDTO
    public PurchaseResponseDTO toResponseDTO(Purchase purchase) {

        List<PurchaseItemDTO> items = purchase.getPurchaseItems()
                .stream()
                .map(purchaseItemMapper::toDTO)
                .toList();

        return PurchaseResponseDTO.builder()
                .id(purchase.getId())
                .invoiceNumber(purchase.getInvoiceNumber())
                .purchaseDate(purchase.getPurchaseDate())
                .supplierId(purchase.getSupplier().getId())
                .supplierName(purchase.getSupplier().getName())
                .totalAmount(purchase.getTotalAmount())
                .paymentStatus(purchase.getPaymentStatus())
                .items(items)
                .build();
    }
}
