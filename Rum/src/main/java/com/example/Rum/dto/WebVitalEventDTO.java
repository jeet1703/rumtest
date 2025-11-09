package com.example.Rum.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WebVitalEventDTO {
    private String type; // webVital
    private Long timestamp;
    private String sessionId;
    private String pageUrl;

    @JsonProperty("data")
    private WebVitalData data;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WebVitalData {
        private String name; // LCP, FCP, CLS, INP, TTFB
        private Double value;
        private String rating;
        private String navigationType;
    }
}

