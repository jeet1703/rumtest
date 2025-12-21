package com.example.Rum.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request DTO for session-based queries
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionRequestDTO {
    private String sessionId;
}

