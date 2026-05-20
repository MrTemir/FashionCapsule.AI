package com.example.demo;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "clothing_items")
public class ClothingItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category; // e.g., Top, Bottom, Shoes, Accessory
    private String color;
    private String season;   // e.g., Summer, Winter, Fall, Spring, All
}
