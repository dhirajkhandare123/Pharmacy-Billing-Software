// MedicineServiceImpl.java
package com.mypharma.services.impl;

import com.mypharma.dto.MedicineDTO;
import com.mypharma.entity.Medicine;
import com.mypharma.mapper.MedicineMapper;
import com.mypharma.repository.MedicineRepository;
import com.mypharma.services.MedicineService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicineServiceImpl implements MedicineService {

    private final MedicineRepository medicineRepository;
    private final MedicineMapper medicineMapper;




    @Override
    public MedicineDTO createMedicine(@RequestBody MedicineDTO dto) {
        Medicine medicine = medicineMapper.convertToEntity(dto);
        return medicineMapper.convertToDTO(medicineRepository.save(medicine));
    }

    @Override
    public MedicineDTO updateMedicine(Long id, MedicineDTO dto) {
        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));
        medicine.setName(dto.getName());
        medicine.setManufacturer(dto.getManufacturer());
        medicine.setDescription(dto.getDescription());
        medicine.setStockQuantity(dto.getStockQuantity());
        medicine.setMinimumStockLevel(dto.getMinimumStockLevel());
        return medicineMapper.convertToDTO(medicineRepository.save(medicine));
    }

    @Override
    public void deleteMedicine(Long id) {
        medicineRepository.deleteById(id);
    }

    @Override
    public MedicineDTO getMedicineById(Long id) {
        return medicineRepository.findById(id)
                .map(medicineMapper::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));
    }

    @Override
    public List<MedicineDTO> getAllMedicines() {
        return medicineRepository.findAll()
                .stream()
                .map(medicineMapper::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<MedicineDTO> searchByName(String name) {
        return medicineRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(medicineMapper::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<MedicineDTO> lowStockMedicines(Integer threshold) {
        return medicineRepository.findByStockQuantityLessThanEqual(threshold)
                .stream()
                .map(medicineMapper::convertToDTO)
                .collect(Collectors.toList());
    }
}
