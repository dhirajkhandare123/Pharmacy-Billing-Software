package com.mypharma.repository;


import com.mypharma.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    List<Medicine> findByStockQuantityLessThanEqual(Integer quantity);

    List<Medicine> findByNameContainingIgnoreCase(String name);

    // for dashboard
    @Query("""
           SELECT COUNT(m)
           FROM Medicine m
           WHERE m.stockQuantity <= m.minimumStockLevel
           """)
    Long countLowStock();

//    @Query("""
//           SELECT COUNT(m)
//           FROM Medicine m
//           WHERE m.expiryDate IS NOT NULL
//           AND m.expiryDate >= CURRENT_DATE
//           AND m.expiryDate <= CURRENT_DATE + 30
//           """)
//    Long countExpiringSoon();
}
