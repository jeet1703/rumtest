package com.example.Rum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageViewEventDTO {
    private String type;
    private Long timestamp;
    private String sessionId;
    private String userId;
    private String pageUrl;
    private String userAgent;

    @JsonProperty("data")
    private PageViewData data;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PageViewData {
        private String pagePath;
        private String pageTitle;
        private String referrer;
        private String previousPage;
    }
}

