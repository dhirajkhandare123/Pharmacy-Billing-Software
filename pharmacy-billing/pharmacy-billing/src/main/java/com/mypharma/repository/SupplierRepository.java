package com.mypharma.repository;



import com.mypharma.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    List<Supplier> findByActiveTrue();

    boolean existsByPhone(String phone);

    boolean existsByGstNumber(String gstNumber);
}
