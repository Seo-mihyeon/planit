package com.plainit.backend.repository;

import com.plainit.backend.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<Plan, Long>{
    
}
