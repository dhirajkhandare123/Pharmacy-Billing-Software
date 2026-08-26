package com.mypharma.services.impl;

import com.mypharma.dto.SaleItemRequestDTO;
import com.mypharma.dto.SaleItemResponseDTO;
import com.mypharma.dto.SaleRequestDTO;
import com.mypharma.dto.SaleResponseDTO;
import com.mypharma.entity.Medicine;
import com.mypharma.entity.Sale;
import com.mypharma.entity.SaleItem;
import com.mypharma.repository.MedicineRepository;
import com.mypharma.repository.SaleRepository;
import com.mypharma.services.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SaleServiceImpl implements SaleService {

    private final SaleRepository saleRepository;
    private final MedicineRepository medicineRepository;

    @Override
    public SaleResponseDTO createSale(SaleRequestDTO request) {

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new RuntimeException("Sale must contain at least one medicine");
        }

        if (saleRepository.existsByInvoiceNumber(request.getInvoiceNumber())) {
            throw new RuntimeException(
                    "Invoice number already exists: "
                            + request.getInvoiceNumber()
            );
        }

        Sale sale = Sale.builder()
                .invoiceNumber(request.getInvoiceNumber())
                .saleDate(LocalDateTime.now())
                .paymentStatus(request.getPaymentStatus())
                .build();

        BigDecimal calculatedTotal = BigDecimal.ZERO;

        for (SaleItemRequestDTO itemRequest : request.getItems()) {

            Medicine medicine = medicineRepository
                    .findById(itemRequest.getMedicineId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Medicine not found with id: "
                                            + itemRequest.getMedicineId()
                            )
                    );

            if (itemRequest.getQuantity() == null
                    || itemRequest.getQuantity() <= 0) {

                throw new RuntimeException(
                        "Quantity must be greater than zero"
                );
            }

            Integer currentStock = medicine.getStockQuantity();

            if (currentStock == null) {
                currentStock = 0;
            }

            if (itemRequest.getQuantity() > currentStock) {

                throw new RuntimeException(
                        "Insufficient stock for medicine: "
                                + medicine.getName()
                                + ". Available stock: "
                                + currentStock
                );
            }

            BigDecimal sellingPrice = itemRequest.getSellingPrice();

            if (sellingPrice == null) {
                throw new RuntimeException(
                        "Selling price is required for medicine: "
                                + medicine.getName()
                );
            }

            BigDecimal itemTotal =
                    sellingPrice.multiply(
                            BigDecimal.valueOf(itemRequest.getQuantity())
                    );

            SaleItem saleItem = SaleItem.builder()
                    .medicine(medicine)
                    .quantity(itemRequest.getQuantity())
                    .sellingPrice(sellingPrice)
                    .totalPrice(itemTotal)
                    .sale(sale)
                    .build();

            sale.getSaleItems().add(saleItem);

            // Deduct stock
            medicine.setStockQuantity(
                    currentStock - itemRequest.getQuantity()
            );

            medicineRepository.save(medicine);

            calculatedTotal = calculatedTotal.add(itemTotal);
        }

        sale.setTotalAmount(calculatedTotal);

        Sale savedSale = saleRepository.save(sale);

        return convertToResponse(savedSale);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SaleResponseDTO> getAllSales() {

        return saleRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public SaleResponseDTO getSaleById(Long id) {

        Sale sale = saleRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Sale not found with id: " + id
                        )
                );

        return convertToResponse(sale);
    }

    @Override
    public void deleteSale(Long id) {

        Sale sale = saleRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Sale not found with id: " + id
                        )
                );

        /*
         * Sale delete karne par sold quantity
         * stock mein wapas add kar rahe hain.
         */
        for (SaleItem item : sale.getSaleItems()) {

            Medicine medicine = item.getMedicine();

            Integer currentStock = medicine.getStockQuantity();

            if (currentStock == null) {
                currentStock = 0;
            }

            medicine.setStockQuantity(
                    currentStock + item.getQuantity()
            );

            medicineRepository.save(medicine);
        }

        saleRepository.delete(sale);
    }

    private SaleResponseDTO convertToResponse(Sale sale) {

        List<SaleItemResponseDTO> items =
                sale.getSaleItems()
                        .stream()
                        .map(item ->
                                SaleItemResponseDTO.builder()
                                        .id(item.getId())
                                        .medicineId(
                                                item.getMedicine().getId()
                                        )
                                        .medicineName(
                                                item.getMedicine().getName()
                                        )
                                        .quantity(item.getQuantity())
                                        .sellingPrice(
                                                item.getSellingPrice()
                                        )
                                        .totalPrice(
                                                item.getTotalPrice()
                                        )
                                        .build()
                        )
                        .toList();

        return SaleResponseDTO.builder()
                .id(sale.getId())
                .invoiceNumber(sale.getInvoiceNumber())
                .saleDate(sale.getSaleDate())
                .totalAmount(sale.getTotalAmount())
                .paymentStatus(sale.getPaymentStatus())
                .items(items)
                .build();
    }
}