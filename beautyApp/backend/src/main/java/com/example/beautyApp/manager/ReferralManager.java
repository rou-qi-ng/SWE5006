package com.example.beautyApp.manager;

import com.example.beautyApp.model.TB_Customer;
import com.example.beautyApp.model.TB_Referral;
import com.example.beautyApp.model.TB_User;
import com.example.beautyApp.model.TB_UserSession;
import com.example.beautyApp.repository.CustomerRepository;
import com.example.beautyApp.repository.ReferralRepository;
import com.example.beautyApp.repository.UserRepository;
import com.example.beautyApp.repository.UserSessionRepository;
import com.example.beautyApp.request.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class ReferralManager {
    @Autowired
    private ReferralRepository referralRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserSessionRepository userSessionRepository;


    public String getCode(String token) {
        System.out.println(token);
//        Optional<TB_User> user= referralRepository.findById(loginRequest.getUsername(),loginRequest.getPassword());
//        System.out.println(user);
        Optional<TB_UserSession> user= userSessionRepository.findByToken(token);
        System.out.println(user);
        if (user.isPresent()){
            Optional<TB_Referral> referral= referralRepository.findById(user.get().getUserId());
            if (referral.isPresent()){
                return referral.get().getReferralCode();
            }else{
                Optional<TB_User> userDetails = userRepository.findById(user.get().getUserId());
                System.out.println(userDetails);
                if(userDetails.isPresent()){
                    String ref = userDetails.get().getUsername().toString().toUpperCase() + java.util.UUID.randomUUID().toString().substring(0,6);
                    TB_Referral newRef = new TB_Referral();
                    newRef.setReferralCode(ref);
                    newRef.setUserId(user.get().getUserId());
                    try {
                        TB_Referral savedRef = referralRepository.save(newRef);
                        return savedRef.getReferralCode();
                    }catch (Exception e){
                        TB_Customer newcustomer = new TB_Customer();
                        newcustomer.setUserId(user.get().getUserId());
                        TB_Customer savedCustomer = customerRepository.save(newcustomer);
                        TB_Referral savedRef = referralRepository.save(newRef);
                        return savedRef.getReferralCode();
                    }
                }
            }
        }
        return "Not available, please contact admin.";

    }
}
