package com.example.beautyApp.controller;

import com.example.beautyApp.manager.UserManager;
import com.example.beautyApp.model.User;
import com.example.beautyApp.repository.UserRepository;
import com.example.beautyApp.request.LoginRequest;
import com.example.beautyApp.request.SignUpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserManager userManager;

    @PostMapping(path = "/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) throws Exception {
        Optional<User> user = userManager.login(loginRequest);
        System.out.println(user);

        if (user.isEmpty()){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of(
                    "statusCode", "200",
                    "message", "No existing functions"
            ));
        } else{
            return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                    "statusCode", "200",
                    "message", "Success"
            ));
        }

    }

    @PostMapping(path = "/register")
    public ResponseEntity<?> register(@RequestBody SignUpRequest loginRequest) throws Exception {
        Optional<User> user = userManager.register(loginRequest);
        System.out.println(user);

        if (user.isEmpty()){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of(
                    "statusCode", "200",
                    "message", "No existing functions"
            ));
        } else{
            return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                    "statusCode", "200",
                    "message", "Success"
            ));
        }

    }


    @GetMapping(path = "/login")
    public Collection<?> login2() throws Exception {
        Collection<User> user = userManager.login2();
        System.out.println(user);

        return user;
    }
}
