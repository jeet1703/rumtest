package com.example.Rum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NetworkErrorEventDTO {
    private String type;
    private Long timestamp;
    private String sessionId;
    private String userId;
    private String pageUrl;
    private String userAgent;

    @JsonProperty("data")
    private NetworkErrorData data;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class NetworkErrorData {
        private String url;
        private String method;
        private Integer statusCode;
        private String message;
        private Double duration;
        private String errorType;
    }
}

