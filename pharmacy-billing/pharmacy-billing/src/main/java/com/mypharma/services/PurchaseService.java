package com.mypharma.services;



import com.mypharma.dto.PurchaseRequestDTO;
import com.mypharma.dto.PurchaseResponseDTO;

import java.time.LocalDate;
import java.util.List;

public interface PurchaseService {

    PurchaseResponseDTO createPurchase(PurchaseRequestDTO request);

    PurchaseResponseDTO getPurchaseById(Long id);

    List<PurchaseResponseDTO> getAllPurchases();

    List<PurchaseResponseDTO> getPurchasesByDate(LocalDate date);

    List<PurchaseResponseDTO> getPurchasesBySupplier(Long supplierId);
}