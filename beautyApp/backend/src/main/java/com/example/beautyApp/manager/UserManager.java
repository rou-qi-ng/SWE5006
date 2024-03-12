package com.example.beautyApp.manager;

import com.example.beautyApp.model.User;
import com.example.beautyApp.repository.UserRepository;
import com.example.beautyApp.request.LoginRequest;
import com.example.beautyApp.request.SignUpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class UserManager {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> login(LoginRequest loginRequest) {
        Optional<User> user= userRepository.findUser(loginRequest.getUsername(),loginRequest.getPassword());
        System.out.println(user);
        return user;

    }

    public Optional<User> register(SignUpRequest signUpRequest) {
        Optional<User> user= userRepository.findByUsername(signUpRequest.getUsername());
        if (user.isPresent()){
            System.out.println("Username already exist");
            return null;
        }
        Integer lastUserId= userRepository.findLastUser().getUserId();

        User preSaveUser = new User();
        preSaveUser.setName(signUpRequest.getUsername());
        preSaveUser.setPassword(signUpRequest.getPassword());
        preSaveUser.setUserType(signUpRequest.getUserType());
        preSaveUser.setUserId(lastUserId + 1);
        User saveUser = userRepository.save(preSaveUser);
        return Optional.of(saveUser);

    }
    public List<User> login2() {
        List<User> user = userRepository.findAll();
        System.out.println("test");
//        User test = new User();
//        test.setName("test");
//        test.setUserId(1);
//        User newU = userRepository.save(test);
        return user;

    }
}
