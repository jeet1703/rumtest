package com.example.Rum.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

/**
 * Response DTO for Page Speed Event
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageSpeedEventResponseDTO {
    private Long id;
    private String sessionId;
    private String userId;
    private String pageUrl;
    private Double loadTime;
    private Double domContentLoaded;
    private Double domInteractive;
    private Double resourceLoadTime;
    private Double firstPaint;
    private LocalDateTime eventTimestamp;
    private LocalDateTime createdAt;
}

