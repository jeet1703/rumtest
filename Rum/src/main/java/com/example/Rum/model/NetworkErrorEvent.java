package com.example.Rum.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "network_error_events",
        indexes = {
                @Index(name = "idx_ne_session", columnList = "sessionId"),
                @Index(name = "idx_ne_user", columnList = "userId"),
                @Index(name = "idx_ne_error_type", columnList = "errorType")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NetworkErrorEvent extends BaseEntity {

    @Column(nullable = false, length = 50)
    private String sessionId;

    @Column(nullable = false, length = 50)
    private String userId;

    @Column(nullable = false, length = 500)
    private String pageUrl;

    @Column(nullable = false, length = 1000)
    private String url;

    @Column(nullable = false, length = 10)
    private String method; // GET, POST, etc.

    @Column
    private Integer statusCode;

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private Double duration; // milliseconds

    @Column(nullable = false, length = 20)
    private String errorType; // timeout, failed, aborted

    @Column(length = 300)
    private String userAgent;

    @Column(nullable = false)
    private LocalDateTime eventTimestamp;
}

