package com.example.beautyApp.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BusinessDTO {
    public interface BusinessGroup{}

    private Integer serviceId;
    private String serviceName;
}
