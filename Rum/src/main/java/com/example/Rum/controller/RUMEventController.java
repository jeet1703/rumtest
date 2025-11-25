package com.example.Rum.controller;

import com.example.Rum.dto.*;
import com.example.Rum.model.ErrorEvent;
import com.example.Rum.model.WebVitalEvent;
import com.example.Rum.service.RUMEventService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
     * Ingest batch of RUM events
     * POST /api/rum
     * Body: Array of event objects
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> ingestEvents(@RequestBody List<JsonNode> events) {
        try {
            log.info("Received batch of {} RUM events", events.size());

            if (events.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Empty event batch"));
            }

            int processed = 0;
            for (JsonNode event : events) {
                String type = event.get("type").asText();
                try {
                    switch (type) {
                        case "webVital":
                            WebVitalEventDTO vitalDto = objectMapper.treeToValue(event, WebVitalEventDTO.class);
                            rumEventService.processWebVital(vitalDto);
                            processed++;
                            break;
                        case "error":
                            ErrorEventDTO errorDto = objectMapper.treeToValue(event, ErrorEventDTO.class);
                            rumEventService.processError(errorDto);
                            processed++;
                            break;
                        case "pageView":
                            PageViewEventDTO pageViewDto = objectMapper.treeToValue(event, PageViewEventDTO.class);
                            rumEventService.processPageView(pageViewDto);
                            processed++;
                            break;
                        case "pageSpeed":
                            PageSpeedEventDTO pageSpeedDto = objectMapper.treeToValue(event, PageSpeedEventDTO.class);
                            rumEventService.processPageSpeed(pageSpeedDto);
                            processed++;
                            break;
                        case "engagement":
                            EngagementEventDTO engagementDto = objectMapper.treeToValue(event, EngagementEventDTO.class);
                            rumEventService.processEngagement(engagementDto);
                            processed++;
                            break;
                        case "networkError":
                            NetworkErrorEventDTO networkErrorDto = objectMapper.treeToValue(event, NetworkErrorEventDTO.class);
                            rumEventService.processNetworkError(networkErrorDto);
                            processed++;
                            break;
                        case "resourcePerformance":
                            ResourcePerformanceEventDTO rpDto = objectMapper.treeToValue(event, ResourcePerformanceEventDTO.class);
                            rumEventService.processResourcePerformance(rpDto);
                            processed++;
                            break;
                        case "userAction":
                            UserActionEventDTO uaDto = objectMapper.treeToValue(event, UserActionEventDTO.class);
                            rumEventService.processUserAction(uaDto);
                            processed++;
                            break;
                        default:
                            log.warn("Unknown event type: {}", type);
                    }
                } catch (Exception e) {
                    log.error("Error processing event of type {}: {}", type, e.getMessage());
                }
            }

            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "Processed " + processed + " events",
                    "processed", processed,
                    "failed", events.size() - processed
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
     * GET /api/rum/health
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "RUM Backend",
                "timestamp", String.valueOf(System.currentTimeMillis())
        ));
    }
}

