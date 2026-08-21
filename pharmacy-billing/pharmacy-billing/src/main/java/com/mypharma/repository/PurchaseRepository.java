package com.mypharma.repository;



import com.mypharma.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    boolean existsByInvoiceNumber(String invoiceNumber);

    List<Purchase> findByPurchaseDate(LocalDate date);

    List<Purchase> findBySupplierId(Long supplierId);
}
