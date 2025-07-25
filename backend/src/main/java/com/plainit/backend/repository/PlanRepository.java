package com.plainit.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plainit.backend.entity.Plan;
import com.plainit.backend.entity.User;

public interface PlanRepository extends JpaRepository<Plan, Long>{
    
    // 특정 사용자가 작성한 일정만 조회하는 메서드
    List<Plan> findByCreatedBy(User user);
}
