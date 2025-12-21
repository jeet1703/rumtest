package com.example.Rum.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

/**
 * Response DTO for Web Vital Event
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WebVitalEventResponseDTO {
    private Long id;
    private String sessionId;
    private String userId;
    private String pageUrl;
    private String userAgent;
    private String metricName; // LCP, FCP, CLS, INP, TTFB
    private Double value;
    private String rating;
    private String navigationType;
    private LocalDateTime eventTimestamp;
    private LocalDateTime createdAt;
}

