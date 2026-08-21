package com.mypharma.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplierDTO {

    private Long id;

    private String name;

    private String companyName;

    private String phone;

    private String email;

    private String address;

    private String gstNumber;

    private Boolean active;
}
