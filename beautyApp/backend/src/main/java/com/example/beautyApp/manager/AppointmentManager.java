package com.example.beautyApp.manager;

import com.example.beautyApp.model.Appointment;
import com.example.beautyApp.model.ServiceProfile;
import com.example.beautyApp.model.TB_UserSession;
import com.example.beautyApp.model.TB_Voucher;
import com.example.beautyApp.repository.*;
import com.example.beautyApp.request.AppointmentDTO;
import com.example.beautyApp.request.VoucherDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentManager {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserSessionRepository userSessionRepository;

    @Autowired
    private ServiceProfileRepository serviceProfileRepository;

    public List<?> getAppt(String token) {

        Optional<TB_UserSession> user= userSessionRepository.findByToken(token);
        System.out.println(user);

        if (user.isPresent()) {
            List<Appointment> appointments = appointmentRepository.findAppts(user.get().getUserId());
            List<AppointmentDTO> apptList = new ArrayList<>();
            for (Appointment appointment:appointments){
                AppointmentDTO newAppt = new AppointmentDTO();
//                newAppt.setVoucherCode(voucher.getVoucherCode());
//                newVoucher.setVoucherName(voucher.getVoucherName());
                newAppt.setAppointmentServiceId(String.valueOf(appointment.getAppointmentId()));
                String pattern = "dd MMMM yyyy";
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
                newAppt.setAppointmentDate(simpleDateFormat.format(appointment.getAppointmentDate()));
                newAppt.setAppointmentTime(String.valueOf(appointment.getAppointmentTime()));
                Optional<ServiceProfile> serviceProfile = serviceProfileRepository.findByServiceId(appointment.getAppointmentId());

                serviceProfile.ifPresent(profile -> newAppt.setAppointmentName(profile.getServiceName()));
                apptList.add(newAppt);
            }
            return apptList;
        }
        return new ArrayList<>();
    }
}
