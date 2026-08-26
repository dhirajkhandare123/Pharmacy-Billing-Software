package com.mypharma.services;

import com.mypharma.dto.SaleRequestDTO;
import com.mypharma.dto.SaleResponseDTO;

import java.util.List;

public interface SaleService {

    SaleResponseDTO createSale(SaleRequestDTO request);

    List<SaleResponseDTO> getAllSales();

    SaleResponseDTO getSaleById(Long id);

    void deleteSale(Long id);
}