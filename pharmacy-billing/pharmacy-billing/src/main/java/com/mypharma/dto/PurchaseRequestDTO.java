package com.mypharma.dto;


import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseRequestDTO {

    private String invoiceNumber;

    private LocalDate purchaseDate;

    private Long supplierId;

    private String paymentStatus;

    private List<PurchaseItemDTO> items;
}
