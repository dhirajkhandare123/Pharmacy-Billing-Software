package com.mypharma.controller;

import com.mypharma.dto.InventoryResponseDTO;
import com.mypharma.services.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping
    public ResponseEntity<List<InventoryResponseDTO>> getAllInventory() {

        return ResponseEntity.ok(
                inventoryService.getAllInventory()
        );
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<InventoryResponseDTO>> getLowStock() {

        return ResponseEntity.ok(
                inventoryService.getLowStock()
        );
    }

    @GetMapping("/expired")
    public ResponseEntity<List<InventoryResponseDTO>> getExpired() {

        return ResponseEntity.ok(
                inventoryService.getExpired()
        );
    }

    @GetMapping("/expiring-soon")
    public ResponseEntity<List<InventoryResponseDTO>> getExpiringSoon() {

        return ResponseEntity.ok(
                inventoryService.getExpiringSoon()
        );
    }
}