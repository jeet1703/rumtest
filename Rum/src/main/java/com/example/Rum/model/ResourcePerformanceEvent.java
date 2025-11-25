package com.example.Rum.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "resource_performance_events",
        indexes = {
                @Index(name = "idx_rp_session", columnList = "sessionId"),
                @Index(name = "idx_rp_user", columnList = "userId"),
                @Index(name = "idx_rp_type", columnList = "resourceType")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResourcePerformanceEvent extends BaseEntity {

    @Column(nullable = false, length = 50)
    private String sessionId;

    @Column(nullable = false, length = 50)
    private String userId;

    @Column(nullable = false, length = 500)
    private String pageUrl;

    @Column(nullable = false, length = 1000)
    private String url;

    @Column(nullable = false, length = 30)
    private String resourceType; // script, stylesheet, image, font, etc.

    @Column(nullable = false)
    private Double duration;

    @Column(nullable = false)
    private Long transferSize;

    @Column(nullable = false)
    private Long encodedBodySize;

    @Column(nullable = false)
    private Long decodedBodySize;

    @Column(nullable = false)
    private Boolean cacheHit;

    @Column(nullable = false)
    private LocalDateTime eventTimestamp;
}

