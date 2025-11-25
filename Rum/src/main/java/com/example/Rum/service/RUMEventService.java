package com.example.Rum.service;

import com.example.Rum.dto.*;
import com.example.Rum.model.*;
import java.time.LocalDateTime;
import java.util.List;

public interface RUMEventService {

    void processWebVital(WebVitalEventDTO dto);
    void processError(ErrorEventDTO dto);
    void processPageView(PageViewEventDTO dto);
    void processPageSpeed(PageSpeedEventDTO dto);
    void processEngagement(EngagementEventDTO dto);
    void processNetworkError(NetworkErrorEventDTO dto);
    void processResourcePerformance(ResourcePerformanceEventDTO dto);
    void processUserAction(UserActionEventDTO dto);

    List<WebVitalEvent> getWebVitalsBySession(String sessionId);
    List<ErrorEvent> getErrorsBySession(String sessionId);
    List<WebVitalEvent> getWebVitalsByTimeRange(Long startMs, Long endMs);
    List<ErrorEvent> getErrorsByTimeRange(Long startMs, Long endMs);

    LocalDateTime convertTimestamp(Long timestamp);
}
