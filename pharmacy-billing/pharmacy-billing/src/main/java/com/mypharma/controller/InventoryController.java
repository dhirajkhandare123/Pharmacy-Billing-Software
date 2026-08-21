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
    public ResponseEntity<List<InventoryResponseDTO>> getInventory() {

        return ResponseEntity.ok(
                inventoryService.getInventory()
        );
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<InventoryResponseDTO>>
    getLowStockMedicines() {

        return ResponseEntity.ok(
                inventoryService.getLowStockMedicines()
        );
    }

    @GetMapping("/expired")
    public ResponseEntity<List<InventoryResponseDTO>>
    getExpiredMedicines() {

        return ResponseEntity.ok(
                inventoryService.getExpiredMedicines()
        );
    }

    @GetMapping("/expiring")
    public ResponseEntity<List<InventoryResponseDTO>>
    getExpiringMedicines(
            @RequestParam(defaultValue = "30") int days) {

        return ResponseEntity.ok(
                inventoryService.getExpiringMedicines(days)
        );
    }
}
