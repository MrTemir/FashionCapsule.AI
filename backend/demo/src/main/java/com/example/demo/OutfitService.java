package com.example.demo;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OutfitService {
    
    private final ClothingItemRepository repository;

    public OutfitService(ClothingItemRepository repository) {
        this.repository = repository;
    }

    public List<ClothingItem> getAllItems() {
        return repository.findAll();
    }

    public ClothingItem addItem(ClothingItem item) {
        return repository.save(item);
    }
    
    // Future logic for AI outfit generation will be added here
}
