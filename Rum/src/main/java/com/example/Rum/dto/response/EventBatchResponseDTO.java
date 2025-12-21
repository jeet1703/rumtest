package com.example.Rum.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response DTO for batch event processing
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventBatchResponseDTO {
    private Integer processed;
    private Integer failed;
    private Integer total;
}

