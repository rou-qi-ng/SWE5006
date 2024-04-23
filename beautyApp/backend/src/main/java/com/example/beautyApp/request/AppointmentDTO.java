package com.example.beautyApp.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AppointmentDTO {
    public interface AppointmentGroup{}
    private String appointmentName;
    private String appointmentServiceId;
    private String appointmentDate;
    private String appointmentTime;
}
