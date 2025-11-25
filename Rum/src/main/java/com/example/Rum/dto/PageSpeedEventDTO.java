package com.example.Rum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageSpeedEventDTO {
    private String type;
    private Long timestamp;
    private String sessionId;
    private String userId;
    private String pageUrl;

    @JsonProperty("data")
    private PageSpeedData data;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PageSpeedData {
        private Double loadTime;
        private Double domContentLoaded;
        private Double domInteractive;
        private Double resourceLoadTime;
        private Double firstPaint;
    }
}

