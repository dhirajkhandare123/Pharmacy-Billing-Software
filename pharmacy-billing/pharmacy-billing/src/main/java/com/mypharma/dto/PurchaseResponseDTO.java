package com.mypharma.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseResponseDTO {

    private Long id;

    private String invoiceNumber;

    private LocalDate purchaseDate;

    private Long supplierId;

    private String supplierName;

    private BigDecimal totalAmount;

    private String paymentStatus;

    private List<PurchaseItemDTO> items;
}
