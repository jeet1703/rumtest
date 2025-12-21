package com.example.Rum.controller;

import com.example.Rum.dto.common.ApiResponseDTO;
import com.example.Rum.dto.response.*;
import com.example.Rum.dto.*;
import com.example.Rum.mapper.RUMEventMapper;
import com.example.Rum.service.RUMEventService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rum")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class RUMEventController {

    private final RUMEventService rumEventService;
    private final ObjectMapper objectMapper;
    private final RUMEventMapper rumEventMapper;

    /**
     * Ingest batch of RUM events
     * POST /api/rum
     * Body: Array of event objects
     */
    @PostMapping
    public ResponseEntity<ApiResponseDTO<EventBatchResponseDTO>> ingestEvents(@RequestBody List<JsonNode> events) {
        try {
            log.info("Received batch of {} RUM events", events.size());

            if (events == null || events.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponseDTO.error("Empty event batch"));
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

            EventBatchResponseDTO batchResponse = new EventBatchResponseDTO();
            batchResponse.setProcessed(processed);
            batchResponse.setFailed(events.size() - processed);
            batchResponse.setTotal(events.size());
            
            return ResponseEntity.ok(ApiResponseDTO.success(
                    "Processed " + processed + " events",
                    batchResponse,
                    processed,
                    events.size() - processed
            ));
        } catch (Exception e) {
            log.error("Error ingesting events", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponseDTO.error(e.getMessage()));
        }
    }

    /**
     * Get web vitals for a specific session
     */
    @GetMapping("/sessions/{sessionId}/vitals")
    public ResponseEntity<ApiResponseDTO<List<WebVitalEventResponseDTO>>> getSessionVitals(
            @PathVariable String sessionId) {
        var vitals = rumEventService.getWebVitalsBySession(sessionId);
        List<WebVitalEventResponseDTO> responseDTOs = rumEventMapper.toWebVitalEventResponseDTOList(vitals);
        return ResponseEntity.ok(ApiResponseDTO.success("Retrieved web vitals for session", responseDTOs));
    }

    /**
     * Get errors for a specific session
     */
    @GetMapping("/sessions/{sessionId}/errors")
    public ResponseEntity<ApiResponseDTO<List<ErrorEventResponseDTO>>> getSessionErrors(
            @PathVariable String sessionId) {
        var errors = rumEventService.getErrorsBySession(sessionId);
        List<ErrorEventResponseDTO> responseDTOs = rumEventMapper.toErrorEventResponseDTOList(errors);
        return ResponseEntity.ok(ApiResponseDTO.success("Retrieved errors for session", responseDTOs));
    }

    /**
     * Get web vitals for a time range
     * Query params: startMs (epoch ms) and endMs (epoch ms)
     */
    @GetMapping("/vitals/range")
    public ResponseEntity<ApiResponseDTO<List<WebVitalEventResponseDTO>>> getVitalsByTimeRange(
            @RequestParam Long startMs,
            @RequestParam Long endMs) {
        var vitals = rumEventService.getWebVitalsByTimeRange(startMs, endMs);
        List<WebVitalEventResponseDTO> responseDTOs = rumEventMapper.toWebVitalEventResponseDTOList(vitals);
        return ResponseEntity.ok(ApiResponseDTO.success("Retrieved web vitals for time range", responseDTOs));
    }

    /**
     * Get errors for a time range
     */
    @GetMapping("/errors/range")
    public ResponseEntity<ApiResponseDTO<List<ErrorEventResponseDTO>>> getErrorsByTimeRange(
            @RequestParam Long startMs,
            @RequestParam Long endMs) {
        var errors = rumEventService.getErrorsByTimeRange(startMs, endMs);
        List<ErrorEventResponseDTO> responseDTOs = rumEventMapper.toErrorEventResponseDTOList(errors);
        return ResponseEntity.ok(ApiResponseDTO.success("Retrieved errors for time range", responseDTOs));
    }

    /**
     * Get page views for a time range
     */
    @GetMapping("/pageviews/range")
    public ResponseEntity<ApiResponseDTO<List<PageViewEventResponseDTO>>> getPageViewsByTimeRange(
            @RequestParam Long startMs,
            @RequestParam Long endMs) {
        var pageViews = rumEventService.getPageViewsByTimeRange(startMs, endMs);
        List<PageViewEventResponseDTO> responseDTOs = rumEventMapper.toPageViewEventResponseDTOList(pageViews);
        return ResponseEntity.ok(ApiResponseDTO.success("Retrieved page views for time range", responseDTOs));
    }

    /**
     * Get page speed events for a time range
     */
    @GetMapping("/pagespeed/range")
    public ResponseEntity<ApiResponseDTO<List<PageSpeedEventResponseDTO>>> getPageSpeedByTimeRange(
            @RequestParam Long startMs,
            @RequestParam Long endMs) {
        var pageSpeed = rumEventService.getPageSpeedByTimeRange(startMs, endMs);
        List<PageSpeedEventResponseDTO> responseDTOs = rumEventMapper.toPageSpeedEventResponseDTOList(pageSpeed);
        return ResponseEntity.ok(ApiResponseDTO.success("Retrieved page speed events for time range", responseDTOs));
    }

    /**
     * Get page speed statistics grouped by page URL
     */
    @GetMapping("/pagespeed/stats")
    public ResponseEntity<ApiResponseDTO<List<PageSpeedStatsResponseDTO>>> getPageSpeedStats(
            @RequestParam Long startMs,
            @RequestParam Long endMs) {
        var stats = rumEventService.getPageSpeedStatsByPage(startMs, endMs);
        List<PageSpeedStatsResponseDTO> responseDTOs = rumEventMapper.toPageSpeedStatsResponseDTOList(stats);
        return ResponseEntity.ok(ApiResponseDTO.success("Retrieved page speed statistics", responseDTOs));
    }

    /**
     * Get dashboard statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<ApiResponseDTO<DashboardStatsResponseDTO>> getDashboardStats(
            @RequestParam Long startMs,
            @RequestParam Long endMs) {
        var stats = rumEventService.getDashboardStats(startMs, endMs);
        DashboardStatsResponseDTO responseDTO = rumEventMapper.toDashboardStatsResponseDTO(stats);
        return ResponseEntity.ok(ApiResponseDTO.success("Retrieved dashboard statistics", responseDTO));
    }

    /**
     * Health check endpoint
     * GET /api/rum/health
     */
    @GetMapping("/health")
    public ResponseEntity<ApiResponseDTO<HealthResponseDTO>> health() {
        HealthResponseDTO response = new HealthResponseDTO();
        response.setStatus("UP");
        response.setService("RUM Backend");
        response.setTimestamp(System.currentTimeMillis());
        return ResponseEntity.ok(ApiResponseDTO.success("Service is healthy", response));
    }
}

