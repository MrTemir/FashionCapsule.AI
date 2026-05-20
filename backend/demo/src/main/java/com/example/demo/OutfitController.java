package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/outfits")
public class OutfitController {

    private final OutfitService service;

    public OutfitController(OutfitService service) {
        this.service = service;
    }

    @GetMapping("/")
    public String root() {
        return "Backend is running";
    }
    
    @GetMapping("/items")
    public List<ClothingItem> getAllItems(
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) Season season) {
        return service.getItemsByCategoryAndSeason(category, season);
    }

    @GetMapping("/items/{id}")
    public ClothingItem getItemById(@PathVariable Long id) {
        return service.getItemById(id);
    }

    @PostMapping("/items")
    public ClothingItem addItem(@RequestBody ClothingItem item) {
        return service.addItem(item);
    }

    @PutMapping("/items/{id}")
    public ClothingItem updateItem(@PathVariable Long id, @RequestBody ClothingItem itemDetails) {
        return service.updateItem(id, itemDetails);
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        service.deleteItem(id);
        return ResponseEntity.ok().build();
    }
}
