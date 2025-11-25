package com.example.Rum.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "user_action_events",
        indexes = {
                @Index(name = "idx_ua_session", columnList = "sessionId"),
                @Index(name = "idx_ua_user", columnList = "userId"),
                @Index(name = "idx_ua_type", columnList = "actionType")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserActionEvent extends BaseEntity {

    @Column(nullable = false, length = 50)
    private String sessionId;

    @Column(nullable = false, length = 50)
    private String userId;

    @Column(nullable = false, length = 500)
    private String pageUrl;

    @Column(nullable = false, length = 20)
    private String actionType; // click, input, submit, rageClick, etc.

    @Column(nullable = false, length = 100)
    private String targetElement;

    @Column(length = 200)
    private String targetText;

    @Column(length = 100)
    private String targetId;

    @Column(length = 200)
    private String targetClass;

    @Column(columnDefinition = "TEXT")
    private String xPath;

    @Column(length = 500)
    private String value;

    @Column(nullable = false)
    private LocalDateTime eventTimestamp;
}

