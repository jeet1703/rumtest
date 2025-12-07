package com.example.Rum.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "web_vital_events",
        indexes = {
                @Index(name = "idx_wv_session", columnList = "sessionId"),
                @Index(name = "idx_wv_user", columnList = "userId"),
                @Index(name = "idx_wv_metric", columnList = "metricName"),
                @Index(name = "idx_wv_timestamp", columnList = "eventTimestamp")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WebVitalEvent extends BaseEntity {

    @Column(nullable = false, length = 50)
    private String sessionId;

    @Column(nullable = false, length = 50)
    private String userId;

    @Column(nullable = false, length = 500)
    private String pageUrl;

    @Column(nullable = false, length = 20)
    private String metricName; // LCP, FCP, CLS, INP, TTFB

    @Column(name = "\"value\"", nullable = false)
    private Double value;

    @Column(length = 20)
    private String rating; // good, needs-improvement, poor

    @Column(length = 50)
    private String navigationType;

    @Column(length = 300)
    private String userAgent;

    @Column(nullable = false)
    private LocalDateTime eventTimestamp;
}
