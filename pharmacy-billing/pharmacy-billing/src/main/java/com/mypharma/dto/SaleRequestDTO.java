package com.mypharma.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaleRequestDTO {

    private String invoiceNumber;

    private String customer;

    private BigDecimal totalAmount;

    private String paymentStatus;

    private List<SaleItemRequestDTO> items;
}