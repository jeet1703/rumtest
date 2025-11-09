package com.example.Rum.controller;

import com.example.Rum.dto.ErrorEventDTO;
import com.example.Rum.dto.WebVitalEventDTO;
import com.example.Rum.model.ErrorEvent;
import com.example.Rum.model.WebVitalEvent;
import com.example.Rum.service.RUMEventService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rum")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class RUMEventController {

    private final RUMEventService rumEventService;
    private final ObjectMapper objectMapper;

    /**
     * Endpoint to receive batched RUM events from frontend
     * Accepts mixed array of WebVitalEventDTO and ErrorEventDTO
     */
    @PostMapping
    public ResponseEntity<Map<String, String>> ingestEvents(@RequestBody List<Map<String, Object>> events) {
        try {
            log.info("Received batch of {} RUM events", events.size());

            if (events.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Empty event batch"));
            }

            // Convert Map objects to DTOs based on type field
            List<Object> convertedEvents = new ArrayList<>();
            for (Map<String, Object> eventMap : events) {
                String type = (String) eventMap.get("type");
                if ("webVital".equals(type)) {
                    WebVitalEventDTO dto = objectMapper.convertValue(eventMap, WebVitalEventDTO.class);
                    convertedEvents.add(dto);
                } else if ("error".equals(type)) {
                    ErrorEventDTO dto = objectMapper.convertValue(eventMap, ErrorEventDTO.class);
                    convertedEvents.add(dto);
                } else {
                    log.warn("Unknown event type: {}", type);
                }
            }

            // Process the batch
            rumEventService.processBatch(convertedEvents);

            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "Processed " + convertedEvents.size() + " events"
            ));
        } catch (Exception e) {
            log.error("Error ingesting events", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Get web vitals for a specific session
     */
    @GetMapping("/sessions/{sessionId}/vitals")
    public ResponseEntity<List<WebVitalEvent>> getSessionVitals(@PathVariable String sessionId) {
        List<WebVitalEvent> vitals = rumEventService.getWebVitalsBySession(sessionId);
        return ResponseEntity.ok(vitals);
    }

    /**
     * Get errors for a specific session
     */
    @GetMapping("/sessions/{sessionId}/errors")
    public ResponseEntity<List<ErrorEvent>> getSessionErrors(@PathVariable String sessionId) {
        List<ErrorEvent> errors = rumEventService.getErrorsBySession(sessionId);
        return ResponseEntity.ok(errors);
    }

    /**
     * Get web vitals for a time range
     * Query params: startMs (epoch ms) and endMs (epoch ms)
     */
    @GetMapping("/vitals/range")
    public ResponseEntity<List<WebVitalEvent>> getVitalsByTimeRange(
            @RequestParam Long startMs,
            @RequestParam Long endMs
    ) {
        List<WebVitalEvent> vitals = rumEventService.getWebVitalsByTimeRange(startMs, endMs);
        return ResponseEntity.ok(vitals);
    }

    /**
     * Get errors for a time range
     */
    @GetMapping("/errors/range")
    public ResponseEntity<List<ErrorEvent>> getErrorsByTimeRange(
            @RequestParam Long startMs,
            @RequestParam Long endMs
    ) {
        List<ErrorEvent> errors = rumEventService.getErrorsByTimeRange(startMs, endMs);
        return ResponseEntity.ok(errors);
    }

    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "RUM Backend"));
    }
}

