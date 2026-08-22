package com.mypharma.services.impl;

import com.mypharma.dto.SupplierDTO;
import com.mypharma.entity.Supplier;
import com.mypharma.exception.ResourceNotFoundException;
import com.mypharma.mapper.SupplierMapper;
import com.mypharma.repository.SupplierRepository;
import com.mypharma.services.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;
    private final SupplierMapper supplierMapper;

    @Override
    public SupplierDTO createSupplier(SupplierDTO dto) {

        Supplier supplier = Supplier.builder()
                .name(dto.getName())
                .companyName(dto.getCompanyName())
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .address(dto.getAddress())
                .gstNumber(dto.getGstNumber())
                .active(true)
                .build();

        Supplier saved = supplierRepository.save(supplier);

//        return mapToDTO(saved);
        return supplierMapper.toDTO(saved);
    }

    @Override
    public SupplierDTO getSupplierById(Long id) {

        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Supplier not found with id: " + id
                        ));

        return supplierMapper.toDTO(supplier);
    }

    @Override
    public List<SupplierDTO> getAllSuppliers() {

        return supplierRepository.findByActiveTrue()
                .stream()
                .map(supplierMapper::toDTO)
                .toList();
    }

    @Override
    public SupplierDTO updateSupplier(Long id, SupplierDTO dto) {

        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Supplier not found with id: " + id
                        ));

        supplier.setName(dto.getName());
        supplier.setCompanyName(dto.getCompanyName());
        supplier.setPhone(dto.getPhone());
        supplier.setEmail(dto.getEmail());
        supplier.setAddress(dto.getAddress());
        supplier.setGstNumber(dto.getGstNumber());

        Supplier updated = supplierRepository.save(supplier);

        return supplierMapper.toDTO(updated);
    }

    @Override
    public void deleteSupplier(Long id) {

        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Supplier not found with id: " + id
                        ));

        supplier.setActive(false);

        supplierRepository.save(supplier);
    }

//    private SupplierDTO mapToDTO(Supplier supplier) {
//
//        return SupplierDTO.builder()
//                .id(supplier.getId())
//                .name(supplier.getName())
//                .companyName(supplier.getCompanyName())
//                .phone(supplier.getPhone())
//                .email(supplier.getEmail())
//                .address(supplier.getAddress())
//                .gstNumber(supplier.getGstNumber())
//                .active(supplier.getActive())
//                .build();
//    }
}
