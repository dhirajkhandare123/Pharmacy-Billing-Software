// MedicineController.java
package com.mypharma.controller;

import com.mypharma.dto.MedicineDTO;
import com.mypharma.services.MedicineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MedicineController {

    private final MedicineService medicineService;

    @PostMapping
    public ResponseEntity<MedicineDTO> create(@RequestBody MedicineDTO dto) {
        return ResponseEntity.ok(medicineService.createMedicine(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicineDTO> update(@PathVariable Long id, @RequestBody MedicineDTO dto) {
        return ResponseEntity.ok(medicineService.updateMedicine(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        medicineService.deleteMedicine(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicineDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(medicineService.getMedicineById(id));
    }

    @GetMapping
    public ResponseEntity<List<MedicineDTO>> getAll() {
        return ResponseEntity.ok(medicineService.getAllMedicines());
    }

    @GetMapping("/search")
    public ResponseEntity<List<MedicineDTO>> search(@RequestParam String name) {
        return ResponseEntity.ok(medicineService.searchByName(name));
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<MedicineDTO>> lowStock(@RequestParam(defaultValue = "10") Integer threshold) {
        return ResponseEntity.ok(medicineService.lowStockMedicines(threshold));
    }
}
