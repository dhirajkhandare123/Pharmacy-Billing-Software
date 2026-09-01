package com.mypharma.repository;

import com.mypharma.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SaleRepository extends JpaRepository<Sale, Long> {

    boolean existsByInvoiceNumber(String invoiceNumber);

    // for dashboard

    @Query("""
       SELECT COALESCE(SUM(s.totalAmount), 0)
       FROM Sale s
       WHERE s.saleDate = CURRENT_DATE
       """)
    Double getTodaysSales();


}