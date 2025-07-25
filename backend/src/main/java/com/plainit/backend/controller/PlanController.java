package com.plainit.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plainit.backend.entity.Plan;
import com.plainit.backend.repository.PlanRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/plans")
@RequiredArgsConstructor
public class PlanController {

    private final PlanRepository planRepository;

    @GetMapping
    public List<Plan> getAllPlans(){
        return planRepository.findAll();
    }

    @PostMapping
    public Plan createPlan(@RequestBody Plan plan){
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
