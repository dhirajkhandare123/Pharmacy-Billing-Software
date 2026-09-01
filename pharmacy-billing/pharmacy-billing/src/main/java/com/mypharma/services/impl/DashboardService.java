package com.mypharma.services.impl;

import com.mypharma.dto.dashboard.DashboardResponseDTO;
import com.mypharma.repository.MedicineRepository;
import com.mypharma.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final MedicineRepository medicineRepository;
    private final SaleRepository saleRepository;

    public DashboardResponseDTO getDashboardData() {

        Double todaysSales = saleRepository.getTodaysSales();

        Long totalMedicines = medicineRepository.count();

        Long lowStock = medicineRepository.countLowStock();

//        Long expiringSoon = medicineRepository.countExpiringSoon();

        return DashboardResponseDTO.builder()
                .todaysSales(todaysSales)
                .totalMedicines(totalMedicines)
                .lowStock(lowStock)
//                .expiringSoon(expiringSoon)
                .build();
    }
}