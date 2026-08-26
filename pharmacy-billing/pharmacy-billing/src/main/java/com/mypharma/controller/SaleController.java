package com.mypharma.controller;

import com.mypharma.dto.SaleRequestDTO;
import com.mypharma.dto.SaleResponseDTO;
import com.mypharma.services.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SaleController {

    private final SaleService saleService;

    @PostMapping
    public ResponseEntity<SaleResponseDTO> createSale(
            @RequestBody SaleRequestDTO request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saleService.createSale(request));
    }

    @GetMapping
    public ResponseEntity<List<SaleResponseDTO>> getAllSales() {

        return ResponseEntity.ok(
                saleService.getAllSales()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<SaleResponseDTO> getSaleById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                saleService.getSaleById(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSale(
            @PathVariable Long id
    ) {

        saleService.deleteSale(id);

        return ResponseEntity.noContent().build();
    }
}