package com.example.beautyApp.manager;

import com.example.beautyApp.model.TB_Customer;
import com.example.beautyApp.model.TB_User;
import com.example.beautyApp.model.TB_UserSession;
import com.example.beautyApp.repository.CustomerRepository;
import com.example.beautyApp.repository.UserRepository;
import com.example.beautyApp.repository.UserSessionRepository;
import com.example.beautyApp.request.CustomerRequest;
import com.example.beautyApp.request.LoginRequest;
import com.example.beautyApp.request.SessionRequest;
import com.example.beautyApp.request.SignUpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserManager {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserSessionRepository userSessionRepository;

    public Optional<TB_User> login(LoginRequest loginRequest) {
        Optional<TB_User> user= userRepository.findUser(loginRequest.getUsername(),loginRequest.getPassword());
        System.out.println(user);
        return user;

    }

    public String findRole(String token) {
        Optional<TB_UserSession> user= userSessionRepository.findByToken(token);
        if (user.isPresent()){
            Optional<TB_User> userRole= userRepository.findById(user.get().getUserId());
            if (userRole.isPresent()){
                return userRole.get().getUserType();
            }
        }
        return "not found";

    }

    public Optional<TB_UserSession> saveSession(SessionRequest sessionRequest) {
        Optional<TB_User> user= userRepository.findByUsername(sessionRequest.getUsername());
        System.out.println("rch here");
        if (user.isPresent()){
            TB_UserSession preSaveUserSession = new TB_UserSession();
            preSaveUserSession.setToken(sessionRequest.getToken());
            preSaveUserSession.setUserId(user.get().getUserId());
            TB_UserSession saveUser = userSessionRepository.save(preSaveUserSession);
            System.out.println(saveUser);
            return Optional.of(preSaveUserSession);
        }

        return null;
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
    @Transactional
    public Optional<TB_Customer> updateCustomer(CustomerRequest customerRequest) {


//        SessionId newSe?ssion = new SessionId(customerRequest.getSessionId(),customerRequest.getUserId());
        Optional<TB_UserSession> userSession= userSessionRepository.findByToken(customerRequest.getSessionId());
        System.out.println((userSessionRepository.findAll()));
        System.out.println(userSession);
        if (userSession.isPresent()){
          System.out.println("User is" + userSession.get().getUserId());
            Optional<TB_Customer> customer = customerRepository.findById(userSession.get().getUserId());
            if (customer.isPresent()){
                Integer updateCustomer = customerRepository.updateCustomer(userSession.get().getUserId(),
                                                                            customerRequest.getSkinType(),
                                                                            customerRequest.getDob(),
                                                                            customerRequest.getGender(),
                                                                            customerRequest.getAddress()
                                                                            );
                return null;
            }else{
                System.out.println("rch here");

                TB_Customer newCustomer = new TB_Customer();
                newCustomer.setUserId(userSession.get().getUserId());
                newCustomer.setDob(customerRequest.getDob());
                newCustomer.setAddress(customerRequest.getAddress());
                newCustomer.setGender(customerRequest.getGender());
                newCustomer.setSkinType(customerRequest.getSkinType());
                TB_Customer saveCustomer = customerRepository.save(newCustomer);
                System.out.println(saveCustomer);
                return Optional.of(saveCustomer);
            }



        }
        return null;
//        Integer lastUserId= userRepository.findLastUser().getUserId();
//
//        TB_User preSaveUser = new TB_User();
//        preSaveUser.setName(signUpRequest.getUsername());
//        preSaveUser.setPassword(signUpRequest.getPassword());
//        preSaveUser.setUserType(signUpRequest.getUserType());
//        preSaveUser.setUserId(lastUserId + 1);
//        TB_User saveUser = userRepository.save(preSaveUser);
//        return Optional.of(saveUser);
    }

    public Optional<TB_Customer> getSetting(String token) {
        System.out.println(token);
        Optional<TB_UserSession> userSession= userSessionRepository.findByToken(token);
        if (userSession.isPresent()){
            return customerRepository.findById(userSession.get().getUserId());
        }


        return Optional.empty();
    }
}
