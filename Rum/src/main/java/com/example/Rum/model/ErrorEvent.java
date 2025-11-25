package com.example.Rum.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "error_events",
        indexes = {
                @Index(name = "idx_err_session", columnList = "sessionId"),
                @Index(name = "idx_err_user", columnList = "userId"),
                @Index(name = "idx_err_severity", columnList = "severity"),
                @Index(name = "idx_err_timestamp", columnList = "eventTimestamp")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorEvent extends BaseEntity {

    @Column(nullable = false, length = 50)
    private String sessionId;

    @Column(nullable = false, length = 50)
    private String userId;

    @Column(nullable = false, length = 500)
    private String pageUrl;

    @Column(nullable = false)
    private String message;

    @Column(length = 300)
    private String source; // File name

    @Column
    private Integer lineno;

    @Column
    private Integer colno;

    @Column(columnDefinition = "TEXT")
    private String stack; // Stack trace

    @Column(nullable = false, length = 30)
    private String errorType; // javascript, unhandledRejection, network

    @Column(length = 20)
    private String severity; // low, medium, high, critical

    @Column(length = 300)
    private String userAgent;

    @Column(nullable = false)
    private LocalDateTime eventTimestamp;
}
