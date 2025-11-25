package com.example.Rum.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "page_speed_events",
        indexes = {
                @Index(name = "idx_ps_session", columnList = "sessionId"),
                @Index(name = "idx_ps_user", columnList = "userId"),
                @Index(name = "idx_ps_timestamp", columnList = "eventTimestamp")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageSpeedEvent extends BaseEntity {

    @Column(nullable = false, length = 50)
    private String sessionId;

    @Column(nullable = false, length = 50)
    private String userId;

    @Column(nullable = false, length = 500)
    private String pageUrl;

    @Column(nullable = false)
    private Double loadTime;

    @Column(nullable = false)
    private Double domContentLoaded;

    @Column(nullable = false)
    private Double domInteractive;

    @Column(nullable = false)
    private Double resourceLoadTime;

    @Column
    private Double firstPaint;

    @Column(nullable = false)
    private LocalDateTime eventTimestamp;
}

