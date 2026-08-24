// MedicineService.java
package com.mypharma.services;

import com.mypharma.dto.MedicineDTO;
import java.util.List;

public interface MedicineService {
    MedicineDTO createMedicine(MedicineDTO dto);
    MedicineDTO updateMedicine(Long id, MedicineDTO dto);
    void deleteMedicine(Long id);
    MedicineDTO getMedicineById(Long id);
    List<MedicineDTO> getAllMedicines();
    List<MedicineDTO> searchByName(String name);
    List<MedicineDTO> lowStockMedicines(Integer threshold);
}
