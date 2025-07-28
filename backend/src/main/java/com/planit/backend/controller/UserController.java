package com.planit.backend.controller;

import java.util.Collections;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.planit.backend.entity.User;
import com.planit.backend.repository.UserRepository;
import com.planit.backend.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public User register(@RequestBody User user) {

        String rawPassword = user.getPassword();

        String encryptedPassword = passwordEncoder.encode(rawPassword);

        User newUser = User.builder()
            .username(user.getUsername())
            .password(encryptedPassword)
            .build();

        return userRepository.save(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
    return userRepository.findByUsername(user.getUsername())
        .map(u -> {
                if (passwordEncoder.matches(user.getPassword(), u.getPassword())) {
                    String token = jwtUtil.generateToken(u.getUsername());
                    return ResponseEntity.ok(Collections.singletonMap("token", token));
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호가 일치하지 않습니다");
                }
            })
            .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("사용자를 찾을 수 없습니다"));
    }
    
    
}
