package com.example.demo;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class GeminiOutfitService {

    private static final String GEMINI_URL_FORMAT = "https://gemini.googleapis.com/v1/models/%s:generate";

    private final OutfitService outfitService;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;
    private final String apiKey;
    private final String model;

    public GeminiOutfitService(
            OutfitService outfitService,
            ObjectMapper objectMapper,
            @Value("${google.gemini.api-key:}") String apiKey,
            @Value("${google.gemini.model:gemini-1.5-pro}") String model) {
        this.outfitService = outfitService;
        this.objectMapper = objectMapper;
        this.apiKey = apiKey;
        this.model = model;
        this.httpClient = HttpClient.newHttpClient();
    }

    public OutfitRecommendation generateOutfit(OutfitRequest request) {
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("Google Gemini API key is not configured. Set GOOGLE_GEMINI_API_KEY or google.gemini.api-key.");
        }

        List<ClothingItem> items = outfitService.getItemsForSeason(request.getSeason());
        String prompt = buildPrompt(items, request);

        String geminiAnswer = callGemini(prompt);

        List<String> availableItems = items.stream()
                .map(item -> String.format("%s (%s, %s, %s)", item.getName(), item.getCategory(), item.getColor(), item.getSeason()))
                .collect(Collectors.toList());

        return new OutfitRecommendation(geminiAnswer, availableItems);
    }

    private String buildPrompt(List<ClothingItem> items, OutfitRequest request) {
        String seasonText = request.getSeason() == null ? "any season" : request.getSeason().name();
        String weatherText = request.getWeather() == null || request.getWeather().isBlank() ? "any weather" : request.getWeather();
        String timeText = request.getTimeOfDay() == null || request.getTimeOfDay().isBlank() ? "day" : request.getTimeOfDay();
        String styleText = request.getStyle() == null || request.getStyle().isBlank() ? "comfortable" : request.getStyle();

        StringBuilder builder = new StringBuilder();
        builder.append("You are an intelligent personal stylist. Use the available wardrobe items below to recommend the best outfit for the day.");
        builder.append("\n");
        builder.append("Season: ").append(seasonText).append("\n");
        builder.append("Weather: ").append(weatherText).append("\n");
        builder.append("Time of day: ").append(timeText).append("\n");
        builder.append("Style: ").append(styleText).append("\n");
        builder.append("\n");
        builder.append("Available items:\n");

        for (ClothingItem item : items) {
            builder.append(String.format("- %s: %s, color %s, season %s", item.getCategory(), item.getName(), item.getColor(), item.getSeason()));
            if (item.getImageUrl() != null && !item.getImageUrl().isBlank()) {
                builder.append(String.format(", image %s", item.getImageUrl()));
            }
            builder.append("\n");
        }

        builder.append("\nPlease return a short recommendation in Russian. Include the suggested items and why they work for this weather and time of day.");
        builder.append("\n");
        builder.append("Answer only as plain text.");

        return builder.toString();
    }

    private String callGemini(String prompt) {
        try {
            String url = String.format(GEMINI_URL_FORMAT, model) + "?key=" + apiKey;
            Map<String, Object> body = Map.of(
                    "prompt", Map.of(
                            "messages", List.of(
                                    Map.of(
                                            "role", "user",
                                            "content", Map.of("text", prompt)
                                    )
                            )
                    ),
                    "temperature", 0.7
            );

            String requestBody = objectMapper.writeValueAsString(body);
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody, StandardCharsets.UTF_8))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            if (response.statusCode() >= 300) {
                throw new IllegalStateException("Gemini request failed: " + response.statusCode() + " " + response.body());
            }

            JsonNode root = objectMapper.readTree(response.body());
            JsonNode candidate = root.path("candidates").path(0).path("content").path("text");
            if (candidate.isMissingNode() || candidate.asText().isBlank()) {
                throw new IllegalStateException("Gemini returned empty answer: " + response.body());
            }

            return candidate.asText();
        } catch (Exception e) {
            throw new RuntimeException("Failed to call Gemini API", e);
        }
    }
}
