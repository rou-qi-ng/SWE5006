package com.example.beautyApp.repository;

import com.example.beautyApp.model.Availability;
import com.example.beautyApp.model.Pricing;
import com.example.beautyApp.model.Appointment;
// import com.example.beautyApp.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
// import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
// import java.util.Optional;

@Repository
public interface AvailabilityRepository extends JpaRepository<Availability, Integer> {
    // List<Availability> findAll();

   List<Availability> findByAvailabilityServiceId(int serviceId);

   @Query("SELECT a FROM Appointment a JOIN ServiceProfile sp ON a.appointmentServiceId = sp.serviceId WHERE a.appointmentServiceId = :serviceId")
    List<Appointment> findByAppointmentServiceId(@Param("serviceId") int serviceId);

   Appointment save(Appointment appointmentData);

}
