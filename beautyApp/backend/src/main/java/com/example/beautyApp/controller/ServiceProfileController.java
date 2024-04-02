package com.example.beautyApp.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.beautyApp.manager.ServiceProfileManager;
import com.example.beautyApp.model.ServiceProfile;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
// import java.util.List;

@RestController
@RequestMapping("/api/serviceProfile")
@CrossOrigin(origins = "http://localhost:4200")
public class ServiceProfileController {
    private static final Logger log = LoggerFactory.getLogger(ServiceProfileController.class);

    @Autowired
    private ServiceProfileManager serviceProfileManager;

    // @GetMapping // Handles GET requests to /api/serviceProfile
    // public ResponseEntity<List<ServiceProfile>> getAllServiceProfiles() {
    //     // Retrieves all service profiles from the manager
    //     List<ServiceProfile> serviceProfiles = serviceProfileManager.getAllServiceProfiles();
    //     // Returns the retrieved service profiles in the response with HTTP status 200 (OK)
    //     return ResponseEntity.ok(serviceProfiles);
    // }

    @GetMapping("/{serviceId}")
    public ResponseEntity<ServiceProfile> getServiceProfileById(@PathVariable("serviceId") int serviceId) {
        Optional<ServiceProfile> serviceProfile = serviceProfileManager.getServiceProfileById(serviceId);
        if (serviceProfile.isPresent()) {
            return ResponseEntity.ok(serviceProfile.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/find")
    public ResponseEntity<Optional<ServiceProfile>> findServiceId(@RequestBody ServiceProfile serviceProfile) {
        Optional<ServiceProfile> serviceProfile2 = serviceProfileManager.findServiceId(serviceProfile);
        if (serviceProfile2.isPresent()) {
            return new ResponseEntity<>(serviceProfile2, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to insert a new service profile
    @PostMapping("/add")
    public ResponseEntity<ServiceProfile> addServiceProfile(@RequestBody ServiceProfile serviceProfile) {
        log.info("Received new service profile: {}", serviceProfile);
        ServiceProfile savedServiceProfile = serviceProfileManager.saveServiceProfile(serviceProfile);
        return new ResponseEntity<>(savedServiceProfile, HttpStatus.CREATED);
    }


}