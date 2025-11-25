package com.example.Rum.repository;

import com.example.Rum.model.ResourcePerformanceEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourcePerformanceEventRepository extends JpaRepository<ResourcePerformanceEvent, Long> {
}

