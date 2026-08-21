package com.mypharma.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "suppliers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String companyName;

    @Column(unique = true)
    private String phone;

    private String email;

    private String address;

    private String gstNumber;

    private Boolean active = true;
}
