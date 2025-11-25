package com.example.Rum.repository;

import com.example.Rum.model.UserActionEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserActionEventRepository extends JpaRepository<UserActionEvent, Long> {
}

