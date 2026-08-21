package com.mypharma.controller;



import com.mypharma.dto.SupplierDTO;
import com.mypharma.services.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SupplierController {

    private final SupplierService supplierService;

    @PostMapping
    public ResponseEntity<SupplierDTO> createSupplier(
            @RequestBody SupplierDTO dto) {

        return new ResponseEntity<>(
                supplierService.createSupplier(dto),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<SupplierDTO>> getAllSuppliers() {

        return ResponseEntity.ok(
                supplierService.getAllSuppliers()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierDTO> getSupplier(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                supplierService.getSupplierById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierDTO> updateSupplier(
            @PathVariable Long id,
            @RequestBody SupplierDTO dto) {

        return ResponseEntity.ok(
                supplierService.updateSupplier(id, dto)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSupplier(
            @PathVariable Long id) {

        supplierService.deleteSupplier(id);

        return ResponseEntity.ok(
                "Supplier deleted successfully"
        );
    }
}
