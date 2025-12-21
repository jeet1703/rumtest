package com.example.Rum.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response DTO for Page Speed Statistics
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageSpeedStatsResponseDTO {
    private String pageUrl;
    private Long viewCount;
    private Double avgLoadTime;
    private Double minLoadTime;
    private Double maxLoadTime;
}

