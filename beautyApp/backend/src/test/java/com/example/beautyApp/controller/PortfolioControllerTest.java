package com.example.beautyApp.controller;
import com.example.beautyApp.manager.PortfolioManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class PortfolioControllerTest {

    @Mock
    private PortfolioManager portfolioManager;

    @InjectMocks
    private PortfolioController portfolioController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testUploadFile_Success() throws IOException {
        // Arrange
        int serviceId = 1;
        MultipartFile file = new MockMultipartFile("test-file.txt", "This is a test file".getBytes());
        int logo = 0; // Set logo parameter
        
        // Act
        ResponseEntity<String> response = portfolioController.uploadFile(serviceId, file, logo);
        
        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("File uploaded successfully", response.getBody());
        verify(portfolioManager, times(1)).saveFile(serviceId, file, logo);
    }
    
    @Test
    public void testUploadFile_Exception_InternalServerError() throws IOException {
        // Arrange
        int serviceId = 1;
        MultipartFile file = new MockMultipartFile("test-file.txt", "This is a test file".getBytes());
        int logo = 0; // Set logo parameter
        doThrow(new IOException()).when(portfolioManager).saveFile(serviceId, file, logo);
        
        // Act
        ResponseEntity<String> response = portfolioController.uploadFile(serviceId, file, logo);
        
        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Error uploading file", response.getBody());
        verify(portfolioManager, times(1)).saveFile(serviceId, file, logo);
    }
    
    @Test
    void testUploadFile_InvalidServiceId() throws IOException {
        // Given
        int serviceId = 0; // Invalid serviceId
        MultipartFile file = new MockMultipartFile("data", "test.txt", "text/plain", "test content".getBytes());
        int logo = 0; // Set logo parameter
        
        // Simulate an IllegalArgumentException being thrown when an invalid serviceId is used
        doThrow(new IllegalArgumentException("Service ID cannot be zero"))
            .when(portfolioManager).saveFile(serviceId, file, logo);
        
        // When
        ResponseEntity<String> response = portfolioController.uploadFile(serviceId, file, logo);
        
        // Then
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Invalid service ID", response.getBody());
    }
}
