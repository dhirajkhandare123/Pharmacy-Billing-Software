package com.mypharma.dto;


import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryResponseDTO {

    private Long medicineId;

    private String medicineName;

    private String batchNumber;

    private Integer quantity;

    private Integer minimumStockLevel;

    private LocalDate expiryDate;

    private Boolean lowStock;

    private Boolean expired;
}
