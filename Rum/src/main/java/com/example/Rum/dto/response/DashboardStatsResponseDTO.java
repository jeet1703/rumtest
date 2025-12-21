package com.example.Rum.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response DTO for Dashboard Statistics
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponseDTO {
    private Long uniqueSessions;
    private Long uniqueUsers;
    private Long totalPageViews;
    private Long totalErrors;
    private Double avgPageLoadTime;
}

