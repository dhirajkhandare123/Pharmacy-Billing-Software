package com.mypharma.services.impl;



import com.mypharma.dto.InventoryResponseDTO;
import com.mypharma.entity.Medicine;
import com.mypharma.entity.PurchaseItem;
import com.mypharma.repository.MedicineRepository;
import com.mypharma.repository.PurchaseItemRepository;
import com.mypharma.services.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final MedicineRepository medicineRepository;
    private final PurchaseItemRepository purchaseItemRepository;

    @Override
    public List<InventoryResponseDTO> getInventory() {

        List<InventoryResponseDTO> result = new ArrayList<>();

        List<Medicine> medicines = medicineRepository.findAll();

        for (Medicine medicine : medicines) {

            List<PurchaseItem> items =
                    purchaseItemRepository.findByMedicineId(
                            medicine.getId()
                    );

            if (items.isEmpty()) {

                result.add(createDTO(
                        medicine,
                        null
                ));

            } else {

                for (PurchaseItem item : items) {

                    result.add(createDTO(
                            medicine,
                            item
                    ));
                }
            }
        }

        return result;
    }

    @Override
    public List<InventoryResponseDTO> getLowStockMedicines() {

        List<Medicine> medicines = medicineRepository.findAll();

        return medicines.stream()
                .filter(medicine ->
                        medicine.getStockQuantity() != null
                                && medicine.getMinimumStockLevel() != null
                                && medicine.getStockQuantity()
                                <= medicine.getMinimumStockLevel()
                )
                .map(medicine ->
                        createDTO(medicine, null)
                )
                .toList();
    }

    @Override
    public List<InventoryResponseDTO> getExpiredMedicines() {

        LocalDate today = LocalDate.now();

        List<InventoryResponseDTO> result = new ArrayList<>();

        List<Medicine> medicines = medicineRepository.findAll();

        for (Medicine medicine : medicines) {

            List<PurchaseItem> items =
                    purchaseItemRepository.findByMedicineId(
                            medicine.getId()
                    );

            for (PurchaseItem item : items) {

                if (item.getExpiryDate() != null
                        && item.getExpiryDate().isBefore(today)) {

                    result.add(createDTO(
                            medicine,
                            item
                    ));
                }
            }
        }

        return result;
    }

    @Override
    public List<InventoryResponseDTO> getExpiringMedicines(int days) {

        LocalDate today = LocalDate.now();

        LocalDate expiryLimit =
                today.plusDays(days);

        List<InventoryResponseDTO> result = new ArrayList<>();

        List<Medicine> medicines = medicineRepository.findAll();

        for (Medicine medicine : medicines) {

            List<PurchaseItem> items =
                    purchaseItemRepository.findByMedicineId(
                            medicine.getId()
                    );

            for (PurchaseItem item : items) {

                LocalDate expiryDate =
                        item.getExpiryDate();

                if (expiryDate != null
                        && !expiryDate.isBefore(today)
                        && !expiryDate.isAfter(expiryLimit)) {

                    result.add(createDTO(
                            medicine,
                            item
                    ));
                }
            }
        }

        return result;
    }

    private InventoryResponseDTO createDTO(
            Medicine medicine,
            PurchaseItem item) {

        LocalDate expiryDate = null;
        String batchNumber = null;

        if (item != null) {
            expiryDate = item.getExpiryDate();
            batchNumber = item.getBatchNumber();
        }

        boolean expired =
                expiryDate != null
                        && expiryDate.isBefore(LocalDate.now());

        boolean lowStock =
                medicine.getStockQuantity() != null
                        && medicine.getMinimumStockLevel() != null
                        && medicine.getStockQuantity()
                        <= medicine.getMinimumStockLevel();

        return InventoryResponseDTO.builder()
                .medicineId(medicine.getId())
                .medicineName(medicine.getName())
                .batchNumber(batchNumber)
                .quantity(medicine.getStockQuantity())
                .minimumStockLevel(medicine.getMinimumStockLevel())
                .expiryDate(expiryDate)
                .lowStock(lowStock)
                .expired(expired)
                .build();
    }
}
