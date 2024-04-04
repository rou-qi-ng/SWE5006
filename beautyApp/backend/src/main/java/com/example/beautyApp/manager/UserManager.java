package com.example.beautyApp.manager;

import com.example.beautyApp.model.TB_User;
import com.example.beautyApp.repository.UserRepository;
import com.example.beautyApp.request.LoginRequest;
import com.example.beautyApp.request.SignUpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserManager {
    @Autowired
    private UserRepository userRepository;

    public Optional<TB_User> login(LoginRequest loginRequest) {
        Optional<TB_User> user= userRepository.findUser(loginRequest.getUsername(),loginRequest.getPassword());
        System.out.println(user);
        return user;

    }

    public Optional<TB_User> register(SignUpRequest signUpRequest) {
        Optional<TB_User> user= userRepository.findByUsername(signUpRequest.getUsername());
        if (user.isPresent()){
            System.out.println("Username already exist");
            return null;
        }
        Integer lastUserId= userRepository.findLastUser().getUserId();

        TB_User preSaveUser = new TB_User();
        preSaveUser.setName(signUpRequest.getUsername());
        preSaveUser.setPassword(signUpRequest.getPassword());
        preSaveUser.setUserType(signUpRequest.getUserType());
        preSaveUser.setUserId(lastUserId + 1);
        TB_User saveUser = userRepository.save(preSaveUser);
        return Optional.of(saveUser);

    }
    public List<TB_User> login2() {
        List<TB_User> user = userRepository.findAll();
        System.out.println("test");
//        User test = new User();
//        test.setName("test");
//        test.setUserId(1);
//        User newU = userRepository.save(test);
        return user;

    }
}
