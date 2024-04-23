package com.example.beautyApp.controller;
import com.example.beautyApp.facade.ServiceFacade;
import com.example.beautyApp.manager.ReviewManager;
import com.example.beautyApp.model.Review;
import com.example.beautyApp.model.ServiceProfile;
import com.example.beautyApp.repository.ServiceProfileRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.Optional;

public class ReviewControllerTest {
    
    // Mocked dependencies
    @Mock
    private ReviewManager reviewManager;

    @Mock
    private ServiceProfileRepository serviceProfileRepository;

    // Creating instance of the controller
    @InjectMocks
    private ReviewController reviewController;

    @Mock
    private ServiceFacade serviceFacade;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testAddReview_Success() {
        // Mock data
        int serviceId = 123;
        Review reviewData = new Review(/* review details */);

        // Mock serviceFacade behavior
        ServiceProfile serviceProfile = new ServiceProfile(/* service profile details */);
        when(serviceFacade.getServiceProfileById(serviceId)).thenReturn(Optional.of(serviceProfile));

        // Call the controller method
        ResponseEntity<?> responseEntity = reviewController.addReview(serviceId, reviewData);

        // Verify behavior
        verify(serviceFacade).saveReview(reviewData); // Check if saveReview was called with the reviewData
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode()); // Check status code
    }

    @Test
    void testAddReview_ServiceProfileNotFound() {
        // Mock data
        int serviceId = 123;
        Review reviewData = new Review(/* review details */);

        // Mock serviceFacade behavior
        when(serviceFacade.getServiceProfileById(serviceId)).thenReturn(Optional.empty());

        // Call the controller method
        ResponseEntity<?> responseEntity = reviewController.addReview(serviceId, reviewData);

        // Verify behavior
        verify(serviceFacade, never()).saveReview(reviewData); // Ensure saveReview was not called
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode()); // Check status code
    }

    @Test
    void testAddReview_InternalServerError() {
        // Mock data
        int serviceId = 123;
        Review reviewData = new Review(/* review details */);

        // Mock serviceFacade behavior
        when(serviceFacade.getServiceProfileById(serviceId)).thenThrow(new RuntimeException("Internal Server Error"));

        // Call the controller method
        ResponseEntity<?> responseEntity = reviewController.addReview(serviceId, reviewData);

        // Verify behavior
        verify(serviceFacade, never()).saveReview(reviewData); // Ensure saveReview was not called
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode()); // Check status code
    }
    
}
