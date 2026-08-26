package com.mypharma.services;

import com.mypharma.dto.InventoryResponseDTO;

import java.util.List;

public interface InventoryService {

    List<InventoryResponseDTO> getAllInventory();

    List<InventoryResponseDTO> getLowStock();

    List<InventoryResponseDTO> getExpired();

    List<InventoryResponseDTO> getExpiringSoon();
}