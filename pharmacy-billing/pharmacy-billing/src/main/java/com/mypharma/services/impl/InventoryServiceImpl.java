package com.mypharma.services.impl;

import com.mypharma.dto.InventoryResponseDTO;
import com.mypharma.entity.Medicine;
import com.mypharma.entity.PurchaseItem;
import com.mypharma.repository.PurchaseItemRepository;
import com.mypharma.services.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final PurchaseItemRepository purchaseItemRepository;

    @Override
    public List<InventoryResponseDTO> getAllInventory() {

        List<PurchaseItem> items = purchaseItemRepository.findAll();

        return items.stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public List<InventoryResponseDTO> getLowStock() {

        List<PurchaseItem> items = purchaseItemRepository.findAll();

        return items.stream()
                .filter(item -> {

                    Medicine medicine = item.getMedicine();

                    return medicine.getStockQuantity() != null
                            && medicine.getMinimumStockLevel() != null
                            && medicine.getStockQuantity()
                            <= medicine.getMinimumStockLevel();
                })
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public List<InventoryResponseDTO> getExpired() {

        LocalDate today = LocalDate.now();

        return purchaseItemRepository
                .findByExpiryDateBefore(today)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public List<InventoryResponseDTO> getExpiringSoon() {

        LocalDate today = LocalDate.now();

        LocalDate thirtyDaysLater = today.plusDays(30);

        return purchaseItemRepository
                .findByExpiryDateBetween(today, thirtyDaysLater)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    private InventoryResponseDTO convertToDTO(PurchaseItem item) {

        Medicine medicine = item.getMedicine();

        String status = calculateStatus(medicine, item);

        return InventoryResponseDTO.builder()
                .medicineId(medicine.getId())
                .medicineName(medicine.getName())
                .batchNumber(item.getBatchNumber())
                .quantity(item.getQuantity())
                .minStock(medicine.getMinimumStockLevel())
                .expiryDate(item.getExpiryDate())
                .status(status)
                .build();
    }

    private String calculateStatus(
            Medicine medicine,
            PurchaseItem item
    ) {

        LocalDate today = LocalDate.now();

        // First priority: Expired
        if (item.getExpiryDate() != null
                && item.getExpiryDate().isBefore(today)) {

            return "EXPIRED";
        }

        // Second priority: Expiring Soon
        if (item.getExpiryDate() != null
                && !item.getExpiryDate().isBefore(today)
                && !item.getExpiryDate().isAfter(today.plusDays(30))) {

            return "EXPIRING SOON";
        }

        // Third priority: Low Stock
        if (medicine.getStockQuantity() != null
                && medicine.getMinimumStockLevel() != null
                && medicine.getStockQuantity()
                <= medicine.getMinimumStockLevel()) {

            return "LOW STOCK";
        }

        return "NORMAL";
    }
}