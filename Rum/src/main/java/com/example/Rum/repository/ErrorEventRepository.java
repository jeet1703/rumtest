package com.example.Rum.repository;

import com.example.Rum.model.ErrorEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ErrorEventRepository extends JpaRepository<ErrorEvent, Long> {

    List<ErrorEvent> findBySessionId(String sessionId);

    List<ErrorEvent> findByErrorType(String errorType);

    @Query("SELECT e FROM ErrorEvent e WHERE e.eventTimestamp BETWEEN :startTime AND :endTime")
    List<ErrorEvent> findByTimeRange(
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );

    @Query("SELECT COUNT(e) FROM ErrorEvent e WHERE e.eventTimestamp BETWEEN :startTime AND :endTime")
    Long countByTimeRange(
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );
}

