package com.example.Rum.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

/**
 * Response DTO for Error Event
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorEventResponseDTO {
    private Long id;
    private String sessionId;
    private String userId;
    private String pageUrl;
    private String message;
    private String source;
    private Integer lineno;
    private Integer colno;
    private String stack;
    private String errorType;
    private String severity;
    private String userAgent;
    private String breadcrumbs; // JSON string
    private String componentStack;
    private LocalDateTime eventTimestamp;
    private LocalDateTime createdAt;
}

