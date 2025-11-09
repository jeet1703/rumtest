package com.example.Rum.service.impl;


import com.example.Rum.dto.ErrorEventDTO;
import com.example.Rum.dto.WebVitalEventDTO;
import com.example.Rum.model.ErrorEvent;
import com.example.Rum.model.WebVitalEvent;
import com.example.Rum.repository.ErrorEventRepository;
import com.example.Rum.repository.WebVitalEventRepository;
import com.example.Rum.service.RUMEventService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class RUMEventServiceImpl implements RUMEventService {

    private final WebVitalEventRepository webVitalRepository;
    private final ErrorEventRepository errorEventRepository;

    /**
     * Process a batch of RUM events (web vitals and errors mixed)
     */
    @Override
    @Transactional
    public void processBatch(List<?> events) {
        for (Object event : events) {
            if (event instanceof WebVitalEventDTO) {
                processWebVital((WebVitalEventDTO) event);
            } else if (event instanceof ErrorEventDTO) {
                processError((ErrorEventDTO) event);
            }
        }
        log.info("Processed batch of {} events", events.size());
    }

    /**
     * Process and save a web vital event
     */
    @Override
    @Transactional
    public void processWebVital(WebVitalEventDTO dto) {
        try {
            WebVitalEvent entity = new WebVitalEvent();
            entity.setSessionId(dto.getSessionId());
            entity.setPageUrl(dto.getPageUrl());
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
            entity.setPageUrl(dto.getPageUrl());
            entity.setMessage(dto.getData().getMessage());
            entity.setSource(dto.getData().getSource());
            entity.setLineno(dto.getData().getLineno());
            entity.setColno(dto.getData().getColno());
            entity.setStack(dto.getData().getStack());
            entity.setErrorType(dto.getData().getErrorType());
            entity.setEventTimestamp(convertTimestamp(dto.getTimestamp()));

            errorEventRepository.save(entity);
            log.debug("Saved error event: {}", dto.getData().getMessage());
        } catch (Exception e) {
            log.error("Error processing error event", e);
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

