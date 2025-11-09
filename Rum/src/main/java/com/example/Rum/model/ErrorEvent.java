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
                @Index(name = "idx_session_id_error", columnList = "session_id"),
                @Index(name = "idx_page_url_error", columnList = "page_url"),
                @Index(name = "idx_created_at_error", columnList = "created_at"),
                @Index(name = "idx_error_type", columnList = "error_type")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorEvent extends BaseEntity {

    @Column(name = "session_id", nullable = false, length = 50)
    private String sessionId;

    @Column(name = "page_url", nullable = false, length = 500)
    private String pageUrl;

    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "source", length = 300)
    private String source;

    @Column(name = "lineno")
    private Integer lineno;

    @Column(name = "colno")
    private Integer colno;

    @Column(name = "stack", columnDefinition = "TEXT")
    private String stack;

    @Column(name = "error_type", nullable = false, length = 30)
    private String errorType; // javascript, unhandledRejection

    @Column(name = "event_timestamp", nullable = false)
    private LocalDateTime eventTimestamp;
}
