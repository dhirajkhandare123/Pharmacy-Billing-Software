package com.mypharma.repository;

import com.mypharma.entity.PurchaseItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface PurchaseItemRepository extends JpaRepository<PurchaseItem, Long> {

    List<PurchaseItem> findByMedicineId(Long medicineId);

    List<PurchaseItem> findByMedicineIdAndBatchNumber(
            Long medicineId,
            String batchNumber
    );

    // for Inventry

    List<PurchaseItem> findByExpiryDateBefore(LocalDate date);

    List<PurchaseItem> findByExpiryDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );


}
