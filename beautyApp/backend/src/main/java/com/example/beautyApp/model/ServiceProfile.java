package com.example.beautyApp.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Setter
@Getter
@Table(name = "Service") 
public class ServiceProfile implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @NonNull                         // not needed as int in java will not hold null values
    @Column(name = "service_id")
    private int serviceId;

    @NonNull
    @Column(name = "service_name")
    private String serviceName;

    @NonNull
    @Column(name = "service_location")
    private String location;

    @NonNull
    @Column(name = "service_type")
    private String type;

    @NonNull
    @Column(name = "service_description")
    private String description;

    


    // Getters and setters

    public int getServiceId() {
        return serviceId;
    }

    public void setServiceId(int serviceId) {
        this.serviceId = serviceId;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    

}




