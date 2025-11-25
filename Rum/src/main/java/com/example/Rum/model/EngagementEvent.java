package com.example.Rum.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "engagement_events",
        indexes = {
                @Index(name = "idx_eng_session", columnList = "sessionId"),
                @Index(name = "idx_eng_user", columnList = "userId"),
                @Index(name = "idx_eng_timestamp", columnList = "eventTimestamp")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EngagementEvent extends BaseEntity {

    @Column(nullable = false, length = 50)
    private String sessionId;

    @Column(nullable = false, length = 50)
    private String userId;

    @Column(nullable = false, length = 500)
    private String pageUrl;

    @Column(nullable = false)
    private Long timeOnPage; // milliseconds

    @Column(nullable = false)
    private Integer scrollDepth; // 0-100%

    @Column(nullable = false)
    private Integer interactionCount;

    @Column(length = 20)
    private String exitType; // navigation, close, refresh, timeout

    @Column(nullable = false)
    private LocalDateTime eventTimestamp;
}

