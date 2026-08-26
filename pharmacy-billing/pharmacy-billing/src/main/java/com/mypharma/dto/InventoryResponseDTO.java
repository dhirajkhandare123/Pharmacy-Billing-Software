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

    private Integer minStock;

    private LocalDate expiryDate;

    private String status;
}
