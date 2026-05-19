package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/outfits")
public class OutfitController {

    private final OutfitService service;

    public OutfitController(OutfitService service) {
        this.service = service;
    }

    @GetMapping("/items")
    public List<ClothingItem> getAllItems() {
        return service.getAllItems();
    }

    @PostMapping("/items")
    public ClothingItem addItem(@RequestBody ClothingItem item) {
        return service.addItem(item);
    }
}
