package com.example.demo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "clothing_items")
@NoArgsConstructor
@AllArgsConstructor
public class ClothingItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private Category category;

    private String color;

    @Enumerated(EnumType.STRING)
    private Season season;

    private String imageUrl;
}
