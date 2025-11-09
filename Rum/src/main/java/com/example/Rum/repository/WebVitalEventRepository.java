package com.example.Rum.repository;


import com.example.Rum.model.WebVitalEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WebVitalEventRepository extends JpaRepository<WebVitalEvent, Long> {

    List<WebVitalEvent> findBySessionId(String sessionId);

    List<WebVitalEvent> findByPageUrl(String pageUrl);

    List<WebVitalEvent> findByMetricName(String metricName);

    @Query("SELECT w FROM WebVitalEvent w WHERE w.eventTimestamp BETWEEN :startTime AND :endTime")
    List<WebVitalEvent> findByTimeRange(
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );

    @Query("SELECT w FROM WebVitalEvent w WHERE w.metricName = :metric AND w.eventTimestamp BETWEEN :startTime AND :endTime")
    List<WebVitalEvent> findByMetricAndTimeRange(
            @Param("metric") String metric,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );
}

