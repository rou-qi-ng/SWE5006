package com.example.beautyApp.repository;

import com.example.beautyApp.model.ServiceProfile;
// import com.example.beautyApp.model.User;
import com.example.beautyApp.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
// import org.springframework.web.bind.annotation.CrossOrigin;

// import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceProfileRepository extends JpaRepository<ServiceProfile, Integer> {
    // List<ServiceProfile> findAll();

    Optional<ServiceProfile> findByServiceId(int serviceId);

    Optional<ServiceProfile> findByServiceType(String serviceType);

    @Query("SELECT u FROM Service u WHERE (u.serviceName = :serviceName) AND (u.serviceType = :serviceType)")
    Optional<ServiceProfile> findServiceName( @Param("serviceType") String serviceType, @Param("serviceName") String serviceName);

}
