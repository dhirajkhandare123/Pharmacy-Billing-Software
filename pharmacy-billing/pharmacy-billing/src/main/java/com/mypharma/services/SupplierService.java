package com.mypharma.services;


import com.mypharma.dto.SupplierDTO;

import java.util.List;

public interface SupplierService {

    SupplierDTO createSupplier(SupplierDTO dto);

    SupplierDTO getSupplierById(Long id);

    List<SupplierDTO> getAllSuppliers();

    SupplierDTO updateSupplier(Long id, SupplierDTO dto);

    void deleteSupplier(Long id);
}