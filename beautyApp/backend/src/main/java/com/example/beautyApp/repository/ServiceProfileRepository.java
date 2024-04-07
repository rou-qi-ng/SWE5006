package com.example.beautyApp.repository;

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

    @Query("SELECT p FROM Pricing p WHERE p.serviceProfile.serviceId = :serviceId")
    List<Pricing> findPricingsByServiceId(@Param("serviceId") int serviceId);

    @Query("SELECT r FROM Review r WHERE r.serviceProfile.serviceId = :serviceId")
    List<Review> findReviewsByServiceId(@Param("serviceId") int serviceId);

    // @Query("SELECT sp FROM ServiceProfile sp WHERE sp.serviceName LIKE %:serviceName% AND sp.serviceType = :serviceType")
    // List<ServiceProfile> findByServiceNameAndServiceType(@Param("serviceType") String serviceType, @Param("serviceName") String serviceName);

    // Optional<ServiceProfile> findByType(String serviceType);

    // List<ServiceProfile> findByServiceNameAndServiceType(String serviceName, String serviceType);
}
