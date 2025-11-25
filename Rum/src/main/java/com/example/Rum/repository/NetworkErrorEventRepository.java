package com.example.Rum.repository;

import com.example.Rum.model.NetworkErrorEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface NetworkErrorEventRepository extends JpaRepository<NetworkErrorEvent, Long> {
    
    @Query("SELECT COUNT(ne) FROM NetworkErrorEvent ne WHERE ne.errorType = :errorType AND ne.eventTimestamp BETWEEN :start AND :end")
    Long countByErrorTypeAndTimeRange(
            @Param("errorType") String errorType,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
}

