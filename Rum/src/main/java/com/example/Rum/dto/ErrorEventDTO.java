package com.example.Rum.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorEventDTO {
    private String type; // error
    private Long timestamp;
    private String sessionId;
    private String userId;
    private String pageUrl;
    private String userAgent;

    @JsonProperty("data")
    private ErrorData data;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ErrorData {
        private String message;
        private String source;
        private Integer lineno;
        private Integer colno;
        private String stack;
        private String errorType;
        private String severity;
    }
}

