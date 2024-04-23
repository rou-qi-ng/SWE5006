package com.example.beautyApp.controller;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.beautyApp.manager.AvailabilityManager;
import com.example.beautyApp.model.Appointment;
import com.example.beautyApp.model.Availability;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;


public class AvailabilityControllerTest {
    
    @Mock
    private AvailabilityManager availabilityManager;

    @InjectMocks
    private AvailabilityController availabilityController;

    @BeforeEach
    void setUp() {
        // Initialize mocks
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAvailabilitiesById_Success() {
        // Given
        int serviceId = 1;
        List<Availability> expectedAvailabilities = Arrays.asList(
            new Availability(/* provide necessary properties */),
            new Availability(/* provide necessary properties */)
        );
        when(availabilityManager.getAvailabilitiesById(serviceId))
            .thenReturn(expectedAvailabilities);

        // When
        ResponseEntity<List<Availability>> response = availabilityController.getAvailabilitiesById(serviceId);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(expectedAvailabilities, response.getBody());
    }

    @Test
    void testGetAvailabilitiesById_NotFound() {
        // Given
        int serviceId = 999; // Non-existing service ID
        when(availabilityManager.getAvailabilitiesById(serviceId))
            .thenReturn(Collections.emptyList());

        // When
        ResponseEntity<List<Availability>> response = availabilityController.getAvailabilitiesById(serviceId);

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    void testGetAppointmentsById_Success() {
        // Given
        int serviceId = 1;
        List<Appointment> expectedAppointments = Arrays.asList(
            new Appointment(/* provide necessary properties */),
            new Appointment(/* provide necessary properties */)
        );
        when(availabilityManager.getAppointmentsById(serviceId))
            .thenReturn(expectedAppointments);

        // When
        ResponseEntity<List<Appointment>> response = availabilityController.getAppointmentsById(serviceId);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(expectedAppointments, response.getBody());
    }

    @Test
    void testGetAppointmentsById_NotFound() {
        // Given
        int serviceId = 999; // Non-existing service ID
        when(availabilityManager.getAppointmentsById(serviceId))
            .thenReturn(Collections.emptyList());

        // When
        ResponseEntity<List<Appointment>> response = availabilityController.getAppointmentsById(serviceId);

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    void testBookAppointment_Success() {
        // Given
        Appointment appointmentData = new Appointment();
        // No need to mock a return value since save() returns void

        // When
        ResponseEntity<?> response = availabilityController.bookAppointment(appointmentData);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void testBookAppointment_InternalServerError() {
        // Given
        Appointment appointmentData = new Appointment();

        // Simulate an error during save
        doThrow(new RuntimeException()).when(availabilityManager).save(appointmentData);

        // When
        ResponseEntity<?> response = availabilityController.bookAppointment(appointmentData);

        // Then
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }
    
}
