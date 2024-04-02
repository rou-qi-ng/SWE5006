package com.example.beautyApp.repository;

import com.example.beautyApp.model.Availability;
import com.example.beautyApp.model.Pricing;
// import com.example.beautyApp.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
// import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
// import java.util.Optional;

@Repository
public interface PricingRepository extends JpaRepository<Pricing, Integer> {
    // List<Pricing> findAll();

    List<Pricing> findByPricingServiceId(int serviceId);

}
