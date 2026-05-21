package com.example.demo;

import lombok.Data;

@Data
public class OutfitRequest {
    private Season season;
    private String weather;
    private String timeOfDay;
    private String style;
}
