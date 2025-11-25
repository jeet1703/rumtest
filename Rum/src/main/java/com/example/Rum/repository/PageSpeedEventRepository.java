package com.example.Rum.repository;

import com.example.Rum.model.PageSpeedEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface PageSpeedEventRepository extends JpaRepository<PageSpeedEvent, Long> {
    
    @Query("SELECT AVG(ps.loadTime) FROM PageSpeedEvent ps " +
           "WHERE ps.eventTimestamp BETWEEN :start AND :end")
    Double findAverageLoadTime(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
}

