package com.plainit.backend.controller;

import java.util.Collections;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plainit.backend.entity.User;
import com.plainit.backend.repository.UserRepository;
import com.plainit.backend.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
    return userRepository.findByUsername(user.getUsername())  // ✅ 이렇게 고쳐야 정상 작동
        .map(u -> {
                if (u.getPassword().equals(user.getPassword())) {
                    String token = jwtUtil.generateToken(u.getUsername());
                    return ResponseEntity.ok(Collections.singletonMap("token", token));
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호가 일치하지 않습니다");
                }
            })
            .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("사용자를 찾을 수 없습니다"));
    }
    
    
}
