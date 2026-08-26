package com.mypharma.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaleItemResponseDTO {

    private Long id;

    private Long medicineId;

    private String medicineName;

    private Integer quantity;

    private BigDecimal sellingPrice;

    private BigDecimal totalPrice;
}