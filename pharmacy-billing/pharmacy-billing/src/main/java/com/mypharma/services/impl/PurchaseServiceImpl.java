package com.mypharma.services.impl;



import com.mypharma.dto.PurchaseItemDTO;
import com.mypharma.dto.PurchaseRequestDTO;
import com.mypharma.dto.PurchaseResponseDTO;
import com.mypharma.entity.Medicine;
import com.mypharma.entity.Purchase;
import com.mypharma.entity.PurchaseItem;
import com.mypharma.entity.Supplier;
import com.mypharma.exception.ResourceNotFoundException;
import com.mypharma.mapper.PurchaseMapper;
import com.mypharma.repository.MedicineRepository;
import com.mypharma.repository.PurchaseRepository;
import com.mypharma.repository.SupplierRepository;
import com.mypharma.services.PurchaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PurchaseServiceImpl implements PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final SupplierRepository supplierRepository;
    private final MedicineRepository medicineRepository;

    private final PurchaseMapper purchaseMapper;

    @Override
    @Transactional
    public PurchaseResponseDTO createPurchase(PurchaseRequestDTO request) {

        // 1. Find Supplier
        Supplier supplier = supplierRepository.findById(request.getSupplierId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Supplier not found with id: "
                                        + request.getSupplierId()
                        ));

        // 2. Check duplicate invoice
        if (purchaseRepository.existsByInvoiceNumber(
                request.getInvoiceNumber())) {

            throw new IllegalArgumentException(
                    "Invoice number already exists"
            );
        }

        // 3. Create Purchase
        Purchase purchase = Purchase.builder()
                .invoiceNumber(request.getInvoiceNumber())
                .purchaseDate(
                        request.getPurchaseDate() != null
                                ? request.getPurchaseDate()
                                : LocalDate.now()
                )
                .supplier(supplier)
                .paymentStatus(request.getPaymentStatus())
                .totalAmount(BigDecimal.ZERO)
                .build();

        BigDecimal totalAmount = BigDecimal.ZERO;

        // 4. Process Items
        for (PurchaseItemDTO itemDTO : request.getItems()) {

            Medicine medicine = medicineRepository
                    .findById(itemDTO.getMedicineId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Medicine not found with id: "
                                            + itemDTO.getMedicineId()
                            ));

            // Calculate item total
            BigDecimal itemTotal =
                    itemDTO.getPurchasePrice()
                            .multiply(
                                    BigDecimal.valueOf(
                                            itemDTO.getQuantity()
                                    )
                            );

            // Create Purchase Item
            PurchaseItem purchaseItem = PurchaseItem.builder()
                    .batchNumber(itemDTO.getBatchNumber())
                    .expiryDate(itemDTO.getExpiryDate())
                    .quantity(itemDTO.getQuantity())
                    .purchasePrice(itemDTO.getPurchasePrice())
                    .sellingPrice(itemDTO.getSellingPrice())
                    .totalPrice(itemTotal)
                    .purchase(purchase)
                    .medicine(medicine)
                    .build();

            purchase.getPurchaseItems().add(purchaseItem);

            // 5. Update Inventory
            Integer currentStock = medicine.getStockQuantity();

            if (currentStock == null) {
                currentStock = 0;
            }

            medicine.setStockQuantity(
                    currentStock + itemDTO.getQuantity()
            );

            medicineRepository.save(medicine);

            // 6. Add total
            totalAmount = totalAmount.add(itemTotal);
        }

        purchase.setTotalAmount(totalAmount);

        // 7. Save Purchase
        Purchase savedPurchase = purchaseRepository.save(purchase);

//        return mapToDTO(savedPurchase);
        return purchaseMapper.toResponseDTO(savedPurchase);
    }

    @Override
    public PurchaseResponseDTO getPurchaseById(Long id) {

        Purchase purchase = purchaseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Purchase not found with id: " + id
                        ));

//        return mapToDTO(purchase);
        return purchaseMapper.toResponseDTO(purchase);
    }

    @Override
    public List<PurchaseResponseDTO> getAllPurchases() {

        return purchaseRepository.findAll()
                .stream()
                .map(purchaseMapper::toResponseDTO)
                .toList();
    }

    @Override
    public List<PurchaseResponseDTO> getPurchasesByDate(LocalDate date) {

        return purchaseRepository.findByPurchaseDate(date)
                .stream()
                .map(purchaseMapper::toResponseDTO)
                .toList();
    }

    @Override
    public List<PurchaseResponseDTO> getPurchasesBySupplier(Long supplierId) {

        return purchaseRepository.findBySupplierId(supplierId)
                .stream()
                .map(purchaseMapper::toResponseDTO)
                .toList();
    }

//    private PurchaseResponseDTO mapToDTO(Purchase purchase) {
//
//        List<PurchaseItemDTO> items =
//                purchase.getPurchaseItems()
//                        .stream()
//                        .map(item -> PurchaseItemDTO.builder()
//                                .medicineId(item.getMedicine().getId())
//                                .batchNumber(item.getBatchNumber())
//                                .expiryDate(item.getExpiryDate())
//                                .quantity(item.getQuantity())
//                                .purchasePrice(item.getPurchasePrice())
//                                .sellingPrice(item.getSellingPrice())
//                                .build())
//                        .toList();
//
//        return PurchaseResponseDTO.builder()
//                .id(purchase.getId())
//                .invoiceNumber(purchase.getInvoiceNumber())
//                .purchaseDate(purchase.getPurchaseDate())
//                .supplierId(purchase.getSupplier().getId())
//                .supplierName(purchase.getSupplier().getName())
//                .totalAmount(purchase.getTotalAmount())
//                .paymentStatus(purchase.getPaymentStatus())
//                .items(items)
//                .build();
//    }
}
