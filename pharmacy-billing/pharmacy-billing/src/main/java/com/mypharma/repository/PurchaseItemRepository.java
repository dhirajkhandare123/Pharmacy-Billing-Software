package com.mypharma.repository;

import com.mypharma.entity.PurchaseItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseItemRepository extends JpaRepository<PurchaseItem, Long> {

    List<PurchaseItem> findByMedicineId(Long medicineId);

    List<PurchaseItem> findByMedicineIdAndBatchNumber(
            Long medicineId,
            String batchNumber
    );
}
