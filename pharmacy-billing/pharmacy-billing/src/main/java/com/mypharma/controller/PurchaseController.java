package com.mypharma.controller;



import com.mypharma.dto.PurchaseRequestDTO;
import com.mypharma.dto.PurchaseResponseDTO;
import com.mypharma.services.PurchaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/purchases")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PurchaseController {

    private final PurchaseService purchaseService;

    @PostMapping
    public ResponseEntity<PurchaseResponseDTO> createPurchase(
            @RequestBody PurchaseRequestDTO request) {

        return new ResponseEntity<>(
                purchaseService.createPurchase(request),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<PurchaseResponseDTO>> getAllPurchases() {

        return ResponseEntity.ok(
                purchaseService.getAllPurchases()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseResponseDTO> getPurchase(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                purchaseService.getPurchaseById(id)
        );
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<PurchaseResponseDTO>> getByDate(
            @PathVariable
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date) {

        return ResponseEntity.ok(
                purchaseService.getPurchasesByDate(date)
        );
    }

    @GetMapping("/supplier/{supplierId}")
    public ResponseEntity<List<PurchaseResponseDTO>> getBySupplier(
            @PathVariable Long supplierId) {

        return ResponseEntity.ok(
                purchaseService.getPurchasesBySupplier(supplierId)
        );
    }
}