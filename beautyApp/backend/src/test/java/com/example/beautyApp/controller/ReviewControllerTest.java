package com.example.beautyApp.controller;
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

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testAddReview_ServiceProfileNotFound() {
        // Given
        int serviceId = 1;
        Review reviewData = new Review();
        reviewData.setReviewId(1);
        when(serviceProfileRepository.findById(serviceId)).thenReturn(Optional.empty()); // ServiceProfile not found

        // When
        ResponseEntity<?> response = reviewController.addReview(serviceId, reviewData);

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testAddReview_Success() {
        // Given
        int serviceId = 1;
        Review reviewData = new Review();
        ServiceProfile serviceProfile = new ServiceProfile();
        when(serviceProfileRepository.findById(serviceId)).thenReturn(Optional.of(serviceProfile)); // ServiceProfile found

        // When
        ResponseEntity<?> response = reviewController.addReview(serviceId, reviewData);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(reviewManager, times(1)).save(reviewData);
    }

    @Test
    void testAddReview_InternalServerError() {
        // Given
        int serviceId = 1;
        Review reviewData = new Review();
        ServiceProfile serviceProfile = new ServiceProfile();
        when(serviceProfileRepository.findById(serviceId)).thenReturn(Optional.of(serviceProfile));
        doThrow(new RuntimeException()).when(reviewManager).save(reviewData); // Simulate an exception during save

        // When
        ResponseEntity<?> response = reviewController.addReview(serviceId, reviewData);

        // Then
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }
    
}
