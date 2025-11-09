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
                @Index(name = "idx_session_id", columnList = "session_id"),
                @Index(name = "idx_page_url", columnList = "page_url"),
                @Index(name = "idx_created_at", columnList = "created_at"),
                @Index(name = "idx_metric_name", columnList = "metric_name")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WebVitalEvent extends BaseEntity {

    @Column(name = "session_id", nullable = false, length = 50)
    private String sessionId;

    @Column(name = "page_url", nullable = false, length = 500)
    private String pageUrl;

    @Column(name = "metric_name", nullable = false, length = 20)
    private String metricName; // LCP, FCP, CLS, INP, TTFB

    @Column(name = "metric_value", nullable = false)
    private Double value;

    @Column(name = "rating", length = 20)
    private String rating; // good, needs-improvement, poor

    @Column(name = "navigation_type", length = 50)
    private String navigationType;

    @Column(name = "event_timestamp", nullable = false)
    private LocalDateTime eventTimestamp;
}
