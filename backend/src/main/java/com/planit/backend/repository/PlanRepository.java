package com.planit.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.planit.backend.entity.Plan;
import com.planit.backend.entity.User;

public interface PlanRepository extends JpaRepository<Plan, Long>{
    
    // 특정 사용자가 작성한 일정만 조회하는 메서드
    List<Plan> findByCreatedBy(User user);
}
