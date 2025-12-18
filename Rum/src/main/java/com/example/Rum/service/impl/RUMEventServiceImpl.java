package com.example.Rum.service.impl;

import com.example.Rum.dto.*;
import com.example.Rum.model.*;
import com.example.Rum.repository.*;
import com.example.Rum.service.RUMEventService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
@Slf4j
public class RUMEventServiceImpl implements RUMEventService {

    private final WebVitalEventRepository webVitalRepository;
    private final ErrorEventRepository errorEventRepository;
    private final PageViewEventRepository pageViewRepository;
    private final PageSpeedEventRepository pageSpeedRepository;
    private final EngagementEventRepository engagementRepository;
    private final NetworkErrorEventRepository networkErrorRepository;
    private final ResourcePerformanceEventRepository resourceRepository;
    private final UserActionEventRepository userActionRepository;

    /**
     * Process and save a web vital event
     */
    @Override
    @Transactional
    public void processWebVital(WebVitalEventDTO dto) {
        try {
            WebVitalEvent entity = new WebVitalEvent();
            entity.setSessionId(dto.getSessionId());
            entity.setUserId(dto.getUserId());
            entity.setPageUrl(dto.getPageUrl());
            entity.setUserAgent(dto.getUserAgent());
            entity.setMetricName(dto.getData().getName());
            entity.setValue(dto.getData().getValue());
            entity.setRating(dto.getData().getRating());
            entity.setNavigationType(dto.getData().getNavigationType());
            entity.setEventTimestamp(convertTimestamp(dto.getTimestamp()));

            webVitalRepository.save(entity);
            log.debug("Saved web vital: {} = {}", dto.getData().getName(), dto.getData().getValue());
        } catch (Exception e) {
            log.error("Error processing web vital event", e);
        }
    }

    /**
     * Process and save an error event
     */
    @Override
    @Transactional
    public void processError(ErrorEventDTO dto) {
        try {
            ErrorEvent entity = new ErrorEvent();
            entity.setSessionId(dto.getSessionId());
            entity.setUserId(dto.getUserId());
            entity.setPageUrl(dto.getPageUrl());
            entity.setUserAgent(dto.getUserAgent());
            entity.setMessage(dto.getData().getMessage());
            entity.setSource(dto.getData().getSource());
            entity.setLineno(dto.getData().getLineno());
            entity.setColno(dto.getData().getColno());
            entity.setStack(dto.getData().getStack());
            entity.setErrorType(dto.getData().getErrorType());
            entity.setSeverity(dto.getData().getSeverity());
            entity.setEventTimestamp(convertTimestamp(dto.getTimestamp()));

            errorEventRepository.save(entity);
            log.debug("Saved error event: {}", dto.getData().getMessage());
        } catch (Exception e) {
            log.error("Error processing error event", e);
        }
    }

    /**
     * Process and save a page view event
     */
    @Override
    @Transactional
    public void processPageView(PageViewEventDTO dto) {
        try {
            PageViewEvent entity = new PageViewEvent();
            entity.setSessionId(dto.getSessionId());
            entity.setUserId(dto.getUserId());
            entity.setPageUrl(dto.getPageUrl());
            entity.setUserAgent(dto.getUserAgent());
            entity.setPagePath(dto.getData().getPagePath());
            entity.setPageTitle(dto.getData().getPageTitle());
            entity.setReferrer(dto.getData().getReferrer());
            entity.setPreviousPage(dto.getData().getPreviousPage());
            entity.setEventTimestamp(convertTimestamp(dto.getTimestamp()));

            pageViewRepository.save(entity);
            log.debug("Saved page view: {}", dto.getData().getPagePath());
        } catch (Exception e) {
            log.error("Error processing page view event", e);
        }
    }

    /**
     * Process and save a page speed event
     */
    @Override
    @Transactional
    public void processPageSpeed(PageSpeedEventDTO dto) {
        try {
            // Validate and ensure non-negative values
            double loadTime = Math.max(0, dto.getData().getLoadTime());
            double domContentLoaded = Math.max(0, dto.getData().getDomContentLoaded());
            double domInteractive = Math.max(0, dto.getData().getDomInteractive());
            double resourceLoadTime = Math.max(0, dto.getData().getResourceLoadTime());
            Double firstPaint = dto.getData().getFirstPaint() != null ? Math.max(0, dto.getData().getFirstPaint()) : null;

            PageSpeedEvent entity = new PageSpeedEvent();
            entity.setSessionId(dto.getSessionId());
            entity.setUserId(dto.getUserId());
            entity.setPageUrl(dto.getPageUrl());
            entity.setLoadTime(loadTime);
            entity.setDomContentLoaded(domContentLoaded);
            entity.setDomInteractive(domInteractive);
            entity.setResourceLoadTime(resourceLoadTime);
            entity.setFirstPaint(firstPaint);
            entity.setEventTimestamp(convertTimestamp(dto.getTimestamp()));

            pageSpeedRepository.save(entity);
            log.debug("Saved page speed: load={}ms", loadTime);
        } catch (Exception e) {
            log.error("Error processing page speed event", e);
        }
    }

    /**
     * Process and save an engagement event
     */
    @Override
    @Transactional
    public void processEngagement(EngagementEventDTO dto) {
        try {
            EngagementEvent entity = new EngagementEvent();
            entity.setSessionId(dto.getSessionId());
            entity.setUserId(dto.getUserId());
            entity.setPageUrl(dto.getPageUrl());
            entity.setTimeOnPage(dto.getData().getTimeOnPage());
            entity.setScrollDepth(dto.getData().getScrollDepth());
            entity.setInteractionCount(dto.getData().getInteractionCount());
            entity.setExitType(dto.getData().getExitType());
            entity.setEventTimestamp(convertTimestamp(dto.getTimestamp()));

            engagementRepository.save(entity);
            log.debug("Saved engagement: time={}ms", dto.getData().getTimeOnPage());
        } catch (Exception e) {
            log.error("Error processing engagement event", e);
        }
    }

    /**
     * Process and save a network error event
     */
    @Override
    @Transactional
    public void processNetworkError(NetworkErrorEventDTO dto) {
        try {
            NetworkErrorEvent entity = new NetworkErrorEvent();
            entity.setSessionId(dto.getSessionId());
            entity.setUserId(dto.getUserId());
            entity.setPageUrl(dto.getPageUrl());
            entity.setUserAgent(dto.getUserAgent());
            entity.setUrl(dto.getData().getUrl());
            entity.setMethod(dto.getData().getMethod());
            entity.setStatusCode(dto.getData().getStatusCode());
            entity.setMessage(dto.getData().getMessage());
            entity.setDuration(dto.getData().getDuration());
            entity.setErrorType(dto.getData().getErrorType());
            entity.setEventTimestamp(convertTimestamp(dto.getTimestamp()));

            networkErrorRepository.save(entity);
            log.debug("Saved network error: {} {}", dto.getData().getMethod(), dto.getData().getUrl());
        } catch (Exception e) {
            log.error("Error processing network error event", e);
        }
    }

    /**
     * Process and save a resource performance event
     */
    @Override
    @Transactional
    public void processResourcePerformance(ResourcePerformanceEventDTO dto) {
        try {
            ResourcePerformanceEvent entity = new ResourcePerformanceEvent();
            entity.setSessionId(dto.getSessionId());
            entity.setUserId(dto.getUserId());
            entity.setPageUrl(dto.getPageUrl());
            entity.setUrl(dto.getData().getUrl());
            entity.setResourceType(dto.getData().getResourceType());
            entity.setDuration(dto.getData().getDuration());
            entity.setTransferSize(dto.getData().getTransferSize());
            entity.setEncodedBodySize(dto.getData().getEncodedBodySize());
            entity.setDecodedBodySize(dto.getData().getDecodedBodySize());
            entity.setCacheHit(dto.getData().getCacheHit());
            entity.setEventTimestamp(convertTimestamp(dto.getTimestamp()));

            resourceRepository.save(entity);
            log.debug("Saved resource performance: {}", dto.getData().getUrl());
        } catch (Exception e) {
            log.error("Error processing resource performance event", e);
        }
    }

    /**
     * Process and save a user action event
     */
    @Override
    @Transactional
    public void processUserAction(UserActionEventDTO dto) {
        try {
            UserActionEvent entity = new UserActionEvent();
            entity.setSessionId(dto.getSessionId());
            entity.setUserId(dto.getUserId());
            entity.setPageUrl(dto.getPageUrl());
            entity.setActionType(dto.getData().getActionType());
            entity.setTargetElement(dto.getData().getTargetElement());
            entity.setTargetText(dto.getData().getTargetText());
            entity.setTargetId(dto.getData().getTargetId());
            entity.setTargetClass(dto.getData().getTargetClass());
            entity.setXPath(dto.getData().getXPath());
            entity.setValue(dto.getData().getValue());
            entity.setEventTimestamp(convertTimestamp(dto.getTimestamp()));

            userActionRepository.save(entity);
            log.debug("Saved user action: {}", dto.getData().getActionType());
        } catch (Exception e) {
            log.error("Error processing user action event", e);
        }
    }

    /**
     * Get all web vitals for a session
     */
    @Override
    public List<WebVitalEvent> getWebVitalsBySession(String sessionId) {
        return webVitalRepository.findBySessionId(sessionId);
    }

    /**
     * Get all errors for a session
     */
    @Override
    public List<ErrorEvent> getErrorsBySession(String sessionId) {
        return errorEventRepository.findBySessionId(sessionId);
    }

    /**
     * Get web vitals for a time range
     */
    @Override
    public List<WebVitalEvent> getWebVitalsByTimeRange(Long startMs, Long endMs) {
        LocalDateTime start = convertTimestamp(startMs);
        LocalDateTime end = convertTimestamp(endMs);
        return webVitalRepository.findByTimeRange(start, end);
    }

    /**
     * Get errors for a time range
     */
    @Override
    public List<ErrorEvent> getErrorsByTimeRange(Long startMs, Long endMs) {
        LocalDateTime start = convertTimestamp(startMs);
        LocalDateTime end = convertTimestamp(endMs);
        return errorEventRepository.findByTimeRange(start, end);
    }

    /**
     * Get page views for a time range
     */
    @Override
    public List<PageViewEvent> getPageViewsByTimeRange(Long startMs, Long endMs) {
        LocalDateTime start = convertTimestamp(startMs);
        LocalDateTime end = convertTimestamp(endMs);
        return pageViewRepository.findByTimeRange(start, end);
    }

    /**
     * Get page speed events for a time range
     */
    @Override
    public List<PageSpeedEvent> getPageSpeedByTimeRange(Long startMs, Long endMs) {
        LocalDateTime start = convertTimestamp(startMs);
        LocalDateTime end = convertTimestamp(endMs);
        return pageSpeedRepository.findByTimeRange(start, end);
    }

    /**
     * Get page speed statistics grouped by page URL
     */
    @Override
    public List<Map<String, Object>> getPageSpeedStatsByPage(Long startMs, Long endMs) {
        LocalDateTime start = convertTimestamp(startMs);
        LocalDateTime end = convertTimestamp(endMs);
        List<Object[]> results = pageSpeedRepository.findPageSpeedStatsByPage(start, end);
        
        return results.stream().map(row -> {
            Map<String, Object> stat = new java.util.HashMap<>();
            stat.put("pageUrl", row[0]);
            stat.put("viewCount", ((Number) row[1]).longValue());
            double avgLoadTime = row[2] != null ? ((Number) row[2]).doubleValue() : 0.0;
            double minLoadTime = row[3] != null ? ((Number) row[3]).doubleValue() : 0.0;
            double maxLoadTime = row[4] != null ? ((Number) row[4]).doubleValue() : 0.0;
            stat.put("avgLoadTime", Math.max(0, avgLoadTime));
            stat.put("minLoadTime", Math.max(0, minLoadTime));
            stat.put("maxLoadTime", Math.max(0, maxLoadTime));
            return stat;
        }).collect(java.util.stream.Collectors.toList());
    }

    /**
     * Get dashboard statistics
     */
    @Override
    public Map<String, Object> getDashboardStats(Long startMs, Long endMs) {
        LocalDateTime start = convertTimestamp(startMs);
        LocalDateTime end = convertTimestamp(endMs);
        
        Map<String, Object> stats = new java.util.HashMap<>();
        
        // Count unique sessions
        long uniqueSessions = webVitalRepository.findAll().stream()
            .filter(e -> !e.getEventTimestamp().isBefore(start) && !e.getEventTimestamp().isAfter(end))
            .map(WebVitalEvent::getSessionId)
            .distinct()
            .count();
        stats.put("uniqueSessions", uniqueSessions);
        
        // Count unique users
        Long uniqueUsers = pageViewRepository.countUniqueUsersByTimeRange(start, end);
        stats.put("uniqueUsers", uniqueUsers != null ? uniqueUsers : 0L);
        
        // Total page views
        long totalPageViews = pageViewRepository.findByTimeRange(start, end).size();
        stats.put("totalPageViews", totalPageViews);
        
        // Total errors
        long totalErrors = errorEventRepository.findByTimeRange(start, end).size();
        stats.put("totalErrors", totalErrors);
        
        // Average page load time (ensure non-negative)
        Double avgLoadTime = pageSpeedRepository.findAverageLoadTime(start, end);
        stats.put("avgPageLoadTime", avgLoadTime != null && avgLoadTime >= 0 ? avgLoadTime : 0.0);
        
        return stats;
    }

    /**
     * Helper to convert millisecond timestamp to LocalDateTime
     */
    @Override
    public LocalDateTime convertTimestamp(Long timestamp) {
        return LocalDateTime.ofInstant(
                Instant.ofEpochMilli(timestamp),
                ZoneId.systemDefault()
        );
    }
}

