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

    public ClothingItem getItemById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Clothing item not found with id: " + id));
    }

    public ClothingItem addItem(ClothingItem item) {
        return repository.save(item);
    }

    public ClothingItem updateItem(Long id, ClothingItem itemDetails) {
        ClothingItem item = getItemById(id);

        item.setName(itemDetails.getName());
        item.setCategory(itemDetails.getCategory());
        item.setColor(itemDetails.getColor());
        item.setSeason(itemDetails.getSeason());
        item.setImageUrl(itemDetails.getImageUrl());

        return repository.save(item);
    }

    public void deleteItem(Long id) {
        ClothingItem item = getItemById(id);
        repository.delete(item);
    }

    public List<ClothingItem> getItemsByCategoryAndSeason(Category category, Season season) {
        if (category != null && season != null) {
            return repository.findByCategoryAndSeason(category, season);
        } else if (category != null) {
            return repository.findByCategory(category);
        } else if (season != null) {
            return repository.findBySeason(season);
        } else {
            return getAllItems();
        }
    }

    public List<ClothingItem> getItemsForSeason(Season season) {
        if (season == null || season == Season.ALL) {
            return getAllItems();
        }
        return repository.findBySeason(season);
    }
    
    // Future logic for AI outfit generation will be added here
}
