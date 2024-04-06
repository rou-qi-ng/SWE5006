package com.example.beautyApp.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Setter
@Getter
@Table(name = "service")
public class ServiceProfile implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_id")
    private int serviceId;

    @NonNull
    @Column(name = "service_location")
    private String serviceLocation;

    @NonNull
    @Column(name = "service_type")
    private String serviceType;

    @NonNull
    @Column(name = "service_description")
    private String serviceDescription;

//    @Column(name = "service_images")
//    private String images;

    @Column(name = "service_name")
    private String name;
    
    @OneToMany(mappedBy = "serviceProfile")
    private List<Pricing> pricings;


    @OneToMany(mappedBy = "serviceProfile")
    private List<Pricing> reviews;

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

    public String getServiceLocation() {
        return serviceLocation;

    }

    public void setServiceLocation(String serviceLocation) {
        this.serviceLocation = serviceLocation;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public String getServiceDescription() {
        return serviceDescription;
    }

    public void setServiceDescription(String serviceDescription) {
        this.serviceDescription = serviceDescription;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}

