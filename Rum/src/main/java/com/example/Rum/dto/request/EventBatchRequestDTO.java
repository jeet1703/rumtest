package com.example.Rum.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * Request DTO for batch event ingestion
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventBatchRequestDTO {
    private List<Object> events; // Can contain any event type (WebVitalEventDTO, ErrorEventDTO, etc.)
}

