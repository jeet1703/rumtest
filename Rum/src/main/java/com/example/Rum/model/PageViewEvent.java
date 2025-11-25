package com.example.Rum.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "page_view_events",
        indexes = {
                @Index(name = "idx_pv_session", columnList = "sessionId"),
                @Index(name = "idx_pv_user", columnList = "userId"),
                @Index(name = "idx_pv_path", columnList = "pagePath"),
                @Index(name = "idx_pv_timestamp", columnList = "eventTimestamp")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageViewEvent extends BaseEntity {

    @Column(nullable = false, length = 50)
    private String sessionId;

    @Column(nullable = false, length = 50)
    private String userId;

    @Column(nullable = false, length = 500)
    private String pageUrl;

    @Column(nullable = false, length = 500)
    private String pagePath;

    @Column(length = 200)
    private String pageTitle;

    @Column(length = 500)
    private String referrer;

    @Column(length = 500)
    private String previousPage;

    @Column(length = 300)
    private String userAgent;

    @Column(nullable = false)
    private LocalDateTime eventTimestamp;
}

