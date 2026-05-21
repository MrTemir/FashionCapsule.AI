package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(ClothingItemRepository repository) {
        return args -> {
            // Clear the database to avoid duplicates on restart
            repository.deleteAll();

            // Tops
            repository.save(new ClothingItem(null, "White T-Shirt", Category.TOP, "White", Season.ALL, "https://example.com/images/white_tshirt.jpg"));
            repository.save(new ClothingItem(null, "Black Hoodie", Category.TOP, "Black", Season.WINTER, "https://example.com/images/black_hoodie.jpg"));
            repository.save(new ClothingItem(null, "Blue Blouse", Category.TOP, "Blue", Season.SPRING, "https://example.com/images/blue_blouse.jpg"));

            // Bottoms
            repository.save(new ClothingItem(null, "Blue Jeans", Category.BOTTOM, "Blue", Season.ALL, "https://example.com/images/blue_jeans.jpg"));
            repository.save(new ClothingItem(null, "Black Trousers", Category.BOTTOM, "Black", Season.FALL, "https://example.com/images/black_trousers.jpg"));
            repository.save(new ClothingItem(null, "Gray Shorts", Category.BOTTOM, "Gray", Season.SUMMER, "https://example.com/images/gray_shorts.jpg"));

            // Shoes
            repository.save(new ClothingItem(null, "White Sneakers", Category.SHOES, "White", Season.ALL, "https://example.com/images/white_sneakers.jpg"));
            repository.save(new ClothingItem(null, "Brown Boots", Category.SHOES, "Brown", Season.WINTER, "https://example.com/images/brown_boots.jpg"));

            // Accessories
            repository.save(new ClothingItem(null, "Black Sunglasses", Category.ACCESSORY, "Black", Season.SUMMER, "https://example.com/images/sunglasses.jpg"));
            repository.save(new ClothingItem(null, "Wool Scarf", Category.ACCESSORY, "Red", Season.WINTER, "https://example.com/images/scarf.jpg"));
        };
    }
}
