package com.example.Rum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EngagementEventDTO {
    private String type;
    private Long timestamp;
    private String sessionId;
    private String userId;
    
    private String pageUrl;

    @JsonProperty("data")
    private EngagementData data;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EngagementData {
        private Long timeOnPage;
        private Integer scrollDepth;
        private Integer interactionCount;
        private String exitType;
    }
}

