package com.example.beautyApp.controller;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.beautyApp.manager.SearchManager;
import com.example.beautyApp.model.ServiceProfile;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class SearchControllerTest {
    @Mock
    private SearchManager searchManager;

    @InjectMocks
    private SearchController searchController;

    @BeforeEach
    void setUp() {
        // Initialize mocks
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSearch_Success() throws Exception {
        // Given
        String serviceType = "Nails";
        String serviceName = "4 Nails";
        ServiceProfile profile1 = new ServiceProfile();
        profile1.setServiceType(serviceType);
        profile1.setServiceName(serviceName);
        ServiceProfile profile2 = new ServiceProfile();
        profile2.setServiceType(serviceType);
        profile2.setServiceName(serviceName);

        List<ServiceProfile> expectedSearchResults = Arrays.asList(profile1, profile2);

        // When
        when(searchManager.searchByServiceTypeAndServiceName(serviceType, serviceName))
            .thenReturn(expectedSearchResults);

        // Then
        ResponseEntity<List<ServiceProfile>> response = searchController.search(serviceType, serviceName);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(expectedSearchResults, response.getBody());
    }

    @Test
    void testSearch_NotFound() throws Exception {
        // Given
        String serviceType = "Nails";
        String serviceName = "nonexistent";

        // When
        when(searchManager.searchByServiceTypeAndServiceName(serviceType, serviceName))
            .thenReturn(Collections.emptyList());

        // Then
        ResponseEntity<List<ServiceProfile>> response = searchController.search(serviceType, serviceName);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    void testSearchByType_Success() throws Exception {
        // Given
        String serviceType = "Nails";
        ServiceProfile profile1 = new ServiceProfile();
        profile1.setServiceType(serviceType);
        ServiceProfile profile2 = new ServiceProfile();
        profile2.setServiceType(serviceType);

        List<ServiceProfile> expectedSearchResults = Arrays.asList(profile1, profile2);

        // When
        when(searchManager.searchByType(serviceType))
            .thenReturn(expectedSearchResults);

        // Then
        ResponseEntity<List<ServiceProfile>> response = searchController.getSearchByType(serviceType);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }

    @Test
    void testSearchByType_NotFound() throws Exception {
        // Given
        String serviceType = "Nails";

        // When
        when(searchManager.searchByType(serviceType))
            .thenReturn(Collections.emptyList());

        // Then
        ResponseEntity<List<ServiceProfile>> response = searchController.getSearchByType(serviceType);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }
}
