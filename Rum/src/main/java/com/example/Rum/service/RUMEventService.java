package com.example.Rum.service;

import com.example.Rum.dto.ErrorEventDTO;
import com.example.Rum.dto.WebVitalEventDTO;
import com.example.Rum.model.ErrorEvent;
import com.example.Rum.model.WebVitalEvent;

import java.time.LocalDateTime;
import java.util.List;

public interface RUMEventService {

    void processBatch(List<?> events);

    void processWebVital(WebVitalEventDTO dto);

    void processError(ErrorEventDTO dto);

    List<WebVitalEvent> getWebVitalsBySession(String sessionId);

    List<ErrorEvent> getErrorsBySession(String sessionId);

    List<WebVitalEvent> getWebVitalsByTimeRange(Long startMs, Long endMs);

    List<ErrorEvent> getErrorsByTimeRange(Long startMs, Long endMs);

    LocalDateTime convertTimestamp(Long timestamp);
}
