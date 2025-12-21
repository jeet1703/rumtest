package com.example.Rum.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request DTO for time range queries
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimeRangeRequestDTO {
    private Long startMs;
    private Long endMs;
}

