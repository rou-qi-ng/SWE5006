package com.example.beautyApp.repository;

import com.example.beautyApp.model.Availability;
import com.example.beautyApp.model.TB_Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<TB_Customer, Integer> {
    @Modifying
    @Query("update TB_Customer u set u.skinType = :skinType, u.dob = :dob, u.gender = :gender, u.address = :address where u.userId = :userId")
    Integer updateCustomer(@Param("userId") Integer userId,
                           @Param("skinType") String skinType,
                           @Param("dob") String dob,
                           @Param("gender") String gender,
                           @Param("address") String address);



}
