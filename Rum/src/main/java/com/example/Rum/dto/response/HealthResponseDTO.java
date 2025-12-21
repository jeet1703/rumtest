package com.example.Rum.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response DTO for Health Check
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HealthResponseDTO {
    private String status;
    private String service;
    private Long timestamp;
}

