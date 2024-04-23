package com.example.beautyApp.repository;

import com.example.beautyApp.model.Appointment;
import com.example.beautyApp.model.Portfolio;
import com.example.beautyApp.model.TB_Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    void deleteByAppointmentServiceId(int appointmentServiceId);

    @Query("SELECT u FROM Appointment u WHERE (u.appointmentUserId = :userId) AND (u.appointmentDate >= CURRENT_DATE)")
    List<Appointment> findAppts(Integer userId);
}
