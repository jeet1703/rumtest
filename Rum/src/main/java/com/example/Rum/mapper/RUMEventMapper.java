package com.example.Rum.mapper;

import com.example.Rum.dto.response.*;
import com.example.Rum.model.ErrorEvent;
import com.example.Rum.model.WebVitalEvent;
import com.example.Rum.model.PageViewEvent;
import com.example.Rum.model.PageSpeedEvent;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Mapper service for converting entities to response DTOs
 * Follows Spring Boot best practices with @Component annotation
 */
@Component
public class RUMEventMapper {

    /**
     * Convert ErrorEvent entity to ErrorEventResponseDTO
     */
    public ErrorEventResponseDTO toErrorEventResponseDTO(ErrorEvent entity) {
        if (entity == null) {
            return null;
        }

        ErrorEventResponseDTO dto = new ErrorEventResponseDTO();
        dto.setId(entity.getId());
        dto.setSessionId(entity.getSessionId());
        dto.setUserId(entity.getUserId());
        dto.setPageUrl(entity.getPageUrl());
        dto.setMessage(entity.getMessage());
        dto.setSource(entity.getSource());
        dto.setLineno(entity.getLineno());
        dto.setColno(entity.getColno());
        dto.setStack(entity.getStack());
        dto.setErrorType(entity.getErrorType());
        dto.setSeverity(entity.getSeverity());
        dto.setUserAgent(entity.getUserAgent());
        dto.setBreadcrumbs(entity.getBreadcrumbs());
        dto.setComponentStack(entity.getComponentStack());
        dto.setEventTimestamp(entity.getEventTimestamp());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }

    /**
     * Convert WebVitalEvent entity to WebVitalEventResponseDTO
     */
    public WebVitalEventResponseDTO toWebVitalEventResponseDTO(WebVitalEvent entity) {
        if (entity == null) {
            return null;
        }

        WebVitalEventResponseDTO dto = new WebVitalEventResponseDTO();
        dto.setId(entity.getId());
        dto.setSessionId(entity.getSessionId());
        dto.setUserId(entity.getUserId());
        dto.setPageUrl(entity.getPageUrl());
        dto.setUserAgent(entity.getUserAgent());
        dto.setMetricName(entity.getMetricName());
        dto.setValue(entity.getValue());
        dto.setRating(entity.getRating());
        dto.setNavigationType(entity.getNavigationType());
        dto.setEventTimestamp(entity.getEventTimestamp());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }

    /**
     * Convert PageViewEvent entity to PageViewEventResponseDTO
     */
    public PageViewEventResponseDTO toPageViewEventResponseDTO(PageViewEvent entity) {
        if (entity == null) {
            return null;
        }

        PageViewEventResponseDTO dto = new PageViewEventResponseDTO();
        dto.setId(entity.getId());
        dto.setSessionId(entity.getSessionId());
        dto.setUserId(entity.getUserId());
        dto.setPageUrl(entity.getPageUrl());
        dto.setUserAgent(entity.getUserAgent());
        dto.setPagePath(entity.getPagePath());
        dto.setPageTitle(entity.getPageTitle());
        dto.setReferrer(entity.getReferrer());
        dto.setPreviousPage(entity.getPreviousPage());
        dto.setEventTimestamp(entity.getEventTimestamp());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }

    /**
     * Convert PageSpeedEvent entity to PageSpeedEventResponseDTO
     */
    public PageSpeedEventResponseDTO toPageSpeedEventResponseDTO(PageSpeedEvent entity) {
        if (entity == null) {
            return null;
        }

        PageSpeedEventResponseDTO dto = new PageSpeedEventResponseDTO();
        dto.setId(entity.getId());
        dto.setSessionId(entity.getSessionId());
        dto.setUserId(entity.getUserId());
        dto.setPageUrl(entity.getPageUrl());
        dto.setLoadTime(entity.getLoadTime());
        dto.setDomContentLoaded(entity.getDomContentLoaded());
        dto.setDomInteractive(entity.getDomInteractive());
        dto.setResourceLoadTime(entity.getResourceLoadTime());
        dto.setFirstPaint(entity.getFirstPaint());
        dto.setEventTimestamp(entity.getEventTimestamp());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }

    /**
     * Convert list of ErrorEvent entities to list of ErrorEventResponseDTO
     */
    public List<ErrorEventResponseDTO> toErrorEventResponseDTOList(List<ErrorEvent> entities) {
        if (entities == null) {
            return List.of();
        }
        return entities.stream()
                .map(this::toErrorEventResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert list of WebVitalEvent entities to list of WebVitalEventResponseDTO
     */
    public List<WebVitalEventResponseDTO> toWebVitalEventResponseDTOList(List<WebVitalEvent> entities) {
        if (entities == null) {
            return List.of();
        }
        return entities.stream()
                .map(this::toWebVitalEventResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert list of PageViewEvent entities to list of PageViewEventResponseDTO
     */
    public List<PageViewEventResponseDTO> toPageViewEventResponseDTOList(List<PageViewEvent> entities) {
        if (entities == null) {
            return List.of();
        }
        return entities.stream()
                .map(this::toPageViewEventResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert list of PageSpeedEvent entities to list of PageSpeedEventResponseDTO
     */
    public List<PageSpeedEventResponseDTO> toPageSpeedEventResponseDTOList(List<PageSpeedEvent> entities) {
        if (entities == null) {
            return List.of();
        }
        return entities.stream()
                .map(this::toPageSpeedEventResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert Map of statistics to DashboardStatsResponseDTO
     */
    public DashboardStatsResponseDTO toDashboardStatsResponseDTO(Map<String, Object> stats) {
        if (stats == null) {
            return new DashboardStatsResponseDTO();
        }

        DashboardStatsResponseDTO dto = new DashboardStatsResponseDTO();
        dto.setUniqueSessions(((Number) stats.getOrDefault("uniqueSessions", 0L)).longValue());
        dto.setUniqueUsers(((Number) stats.getOrDefault("uniqueUsers", 0L)).longValue());
        dto.setTotalPageViews(((Number) stats.getOrDefault("totalPageViews", 0L)).longValue());
        dto.setTotalErrors(((Number) stats.getOrDefault("totalErrors", 0L)).longValue());
        dto.setAvgPageLoadTime(((Number) stats.getOrDefault("avgPageLoadTime", 0.0)).doubleValue());
        return dto;
    }

    /**
     * Convert Map of page speed statistics to PageSpeedStatsResponseDTO
     */
    public PageSpeedStatsResponseDTO toPageSpeedStatsResponseDTO(Map<String, Object> stat) {
        if (stat == null) {
            return null;
        }

        PageSpeedStatsResponseDTO dto = new PageSpeedStatsResponseDTO();
        dto.setPageUrl((String) stat.get("pageUrl"));
        dto.setViewCount(((Number) stat.getOrDefault("viewCount", 0L)).longValue());
        dto.setAvgLoadTime(((Number) stat.getOrDefault("avgLoadTime", 0.0)).doubleValue());
        dto.setMinLoadTime(((Number) stat.getOrDefault("minLoadTime", 0.0)).doubleValue());
        dto.setMaxLoadTime(((Number) stat.getOrDefault("maxLoadTime", 0.0)).doubleValue());
        return dto;
    }

    /**
     * Convert list of Maps to list of PageSpeedStatsResponseDTO
     */
    public List<PageSpeedStatsResponseDTO> toPageSpeedStatsResponseDTOList(List<Map<String, Object>> stats) {
        if (stats == null) {
            return List.of();
        }
        return stats.stream()
                .map(this::toPageSpeedStatsResponseDTO)
                .collect(Collectors.toList());
    }
}

