package com.mypharma.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaleResponseDTO {

    private Long id;

    private String invoiceNumber;

//    private String customer;

    private LocalDateTime saleDate;

    private BigDecimal totalAmount;

    private String paymentStatus;

    private List<SaleItemResponseDTO> items;
}