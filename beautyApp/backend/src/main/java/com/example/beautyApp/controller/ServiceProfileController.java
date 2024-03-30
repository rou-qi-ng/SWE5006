package com.example.beautyApp.controller;

import com.example.beautyApp.manager.ServiceProfileManager;
import com.example.beautyApp.model.ServiceProfile;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
// import java.util.List;

@RestController
@RequestMapping("/api/serviceProfile")
@CrossOrigin(origins = "*")
public class ServiceProfileController {

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

}