package com.example.Rum.repository;

import com.example.Rum.model.PageViewEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PageViewEventRepository extends JpaRepository<PageViewEvent, Long> {
    
    List<PageViewEvent> findBySessionId(String sessionId);
    
    @Query("SELECT pv.pagePath, COUNT(pv) as count FROM PageViewEvent pv " +
           "WHERE pv.eventTimestamp BETWEEN :start AND :end " +
           "GROUP BY pv.pagePath ORDER BY count DESC")
    List<Object[]> findTopPagesByTimeRange(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
    
    @Query("SELECT COUNT(DISTINCT pv.userId) FROM PageViewEvent pv " +
           "WHERE pv.eventTimestamp BETWEEN :start AND :end")
    Long countUniqueUsersByTimeRange(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
    
    @Query("SELECT pv FROM PageViewEvent pv " +
           "WHERE pv.eventTimestamp BETWEEN :start AND :end " +
           "ORDER BY pv.eventTimestamp DESC")
    List<PageViewEvent> findByTimeRange(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
}

