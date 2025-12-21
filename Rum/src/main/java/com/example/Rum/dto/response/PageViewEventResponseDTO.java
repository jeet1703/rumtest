package com.example.Rum.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

/**
 * Response DTO for Page View Event
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageViewEventResponseDTO {
    private Long id;
    private String sessionId;
    private String userId;
    private String pageUrl;
    private String userAgent;
    private String pagePath;
    private String pageTitle;
    private String referrer;
    private String previousPage;
    private LocalDateTime eventTimestamp;
    private LocalDateTime createdAt;
}

