package com.example.Rum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserActionEventDTO {
    private String type;
    private Long timestamp;
    private String sessionId;
    private String userId;
    private String pageUrl;

    @JsonProperty("data")
    private UserActionData data;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserActionData {
        private String actionType;
        private String targetElement;
        private String targetText;
        private String targetId;
        private String targetClass;
        private String xPath;
        private String value;
    }
}

