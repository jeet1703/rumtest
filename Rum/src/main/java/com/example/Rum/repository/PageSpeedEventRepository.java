package com.example.Rum.repository;

import com.example.Rum.model.PageSpeedEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PageSpeedEventRepository extends JpaRepository<PageSpeedEvent, Long> {
    
    @Query("SELECT AVG(ps.loadTime) FROM PageSpeedEvent ps " +
           "WHERE ps.eventTimestamp BETWEEN :start AND :end")
    Double findAverageLoadTime(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
    
    @Query("SELECT ps FROM PageSpeedEvent ps " +
           "WHERE ps.eventTimestamp BETWEEN :start AND :end " +
           "ORDER BY ps.eventTimestamp DESC")
    List<PageSpeedEvent> findByTimeRange(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
    
    @Query("SELECT ps.pageUrl as pageUrl, " +
           "COUNT(ps) as viewCount, " +
           "AVG(ps.loadTime) as avgLoadTime, " +
           "MIN(ps.loadTime) as minLoadTime, " +
           "MAX(ps.loadTime) as maxLoadTime " +
           "FROM PageSpeedEvent ps " +
           "WHERE ps.eventTimestamp BETWEEN :start AND :end " +
           "GROUP BY ps.pageUrl " +
           "ORDER BY viewCount DESC")
    List<Object[]> findPageSpeedStatsByPage(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
}

