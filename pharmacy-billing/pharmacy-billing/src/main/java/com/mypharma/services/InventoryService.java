package com.mypharma.services;


import com.mypharma.dto.InventoryResponseDTO;

import java.util.List;

public interface InventoryService {

    List<InventoryResponseDTO> getInventory();

    List<InventoryResponseDTO> getLowStockMedicines();

    List<InventoryResponseDTO> getExpiredMedicines();

    List<InventoryResponseDTO> getExpiringMedicines(int days);
}
