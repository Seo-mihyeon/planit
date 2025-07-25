package com.planit.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.planit.backend.entity.Plan;
import com.planit.backend.repository.PlanRepository;
import com.planit.backend.repository.UserRepository;
import com.planit.backend.security.JwtUtil;
import com.planit.backend.entity.User;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/plans")
@RequiredArgsConstructor
public class PlanController {

    private final PlanRepository planRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @GetMapping
    public List<Plan> getAllPlans(@RequestHeader("Authorization") String token){
        String jwt = token.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("사용자 없음"));

        return planRepository.findByCreatedBy(user);
    }

    @PostMapping
    public Plan createPlan(@RequestBody Plan plan, @RequestHeader("Authorization") String token){
        String jwt = token.substring(7);
        String username = jwtUtil.extractUsername(jwt);

        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("사용자 없음"));
        
        plan.setCreatedBy(user);
        return planRepository.save(plan);
    }

    @PutMapping("/{id}")
    public Plan updatePlan(@PathVariable Long id, @RequestBody Plan updatedPlan){
        Plan plan = planRepository.findById(id).orElseThrow();
        plan.setTitle(updatedPlan.getTitle());
        plan.setDescription(updatedPlan.getDescription());
        plan.setDate(updatedPlan.getDate());
        return planRepository.save(plan);

    }

    @DeleteMapping("/{id}")
    public void deleteSchedule(@PathVariable Long id){
        planRepository.deleteById(id);
    }
}
