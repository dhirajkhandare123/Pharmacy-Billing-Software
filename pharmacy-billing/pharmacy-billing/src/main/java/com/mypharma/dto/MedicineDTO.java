// MedicineDTO.java
package com.mypharma.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicineDTO {
    private Long id;
    private String name;
    private String manufacturer;
    private String description;
    private Integer stockQuantity;
    private Integer minimumStockLevel;
}
