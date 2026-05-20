package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClothingItemRepository extends JpaRepository<ClothingItem, Long> {
    List<ClothingItem> findByCategory(Category category);
    List<ClothingItem> findBySeason(Season season);
    List<ClothingItem> findByCategoryAndSeason(Category category, Season season);
}
