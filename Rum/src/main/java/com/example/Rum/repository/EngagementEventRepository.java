package com.example.Rum.repository;

import com.example.Rum.model.EngagementEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface EngagementEventRepository extends JpaRepository<EngagementEvent, Long> {
    
    @Query("SELECT AVG(e.timeOnPage) FROM EngagementEvent e " +
           "WHERE e.eventTimestamp BETWEEN :start AND :end")
    Double findAverageTimeOnPage(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
    
    @Query("SELECT AVG(e.scrollDepth) FROM EngagementEvent e " +
           "WHERE e.eventTimestamp BETWEEN :start AND :end")
    Double findAverageScrollDepth(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
}

