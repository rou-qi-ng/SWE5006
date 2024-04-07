package com.example.beautyApp.repository;

import com.example.beautyApp.model.Portfolio;
import com.example.beautyApp.model.Pricing;
import com.example.beautyApp.model.Review;
import com.example.beautyApp.model.ServiceProfile;
// import com.example.beautyApp.model.User;
//import com.example.beautyApp.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
// import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceProfileRepository extends JpaRepository<ServiceProfile, Integer> {
    // List<ServiceProfile> findAll();

    Optional<ServiceProfile> findByServiceId(int serviceId);

    @Query("SELECT i FROM Portfolio i JOIN ServiceProfile sp ON i.portfolioServiceId = sp.serviceId WHERE i.portfolioServiceId = :serviceId")
    List<Portfolio> findImagesByServiceId(@Param("serviceId") int serviceId);

    @Query("SELECT p FROM Pricing p WHERE p.serviceProfile.serviceId = :serviceId")
    List<Pricing> findPricingsByServiceId(@Param("serviceId") int serviceId);

    @Query("SELECT r FROM Review r WHERE r.serviceProfile.serviceId = :serviceId")
    List<Review> findReviewsByServiceId(@Param("serviceId") int serviceId);


}
