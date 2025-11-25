package com.example.Rum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResourcePerformanceEventDTO {
    private String type;
    private Long timestamp;
    private String sessionId;
    private String userId;
    private String pageUrl;

    @JsonProperty("data")
    private ResourcePerformanceData data;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResourcePerformanceData {
        private String url;
        private String resourceType;
        private Double duration;
        private Long transferSize;
        private Long encodedBodySize;
        private Long decodedBodySize;
        private Boolean cacheHit;
    }
}

