package com.example.beautyApp.controller;
import com.example.beautyApp.manager.*;
import com.example.beautyApp.model.Appointment;
import com.example.beautyApp.model.TB_Customer;
import com.example.beautyApp.model.TB_Service;
import com.example.beautyApp.model.TB_User;
import com.example.beautyApp.model.TB_UserSession;
import com.example.beautyApp.request.*;
import com.example.beautyApp.request.AppointmentDTO;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserControllerTest {
    
    @InjectMocks
    private UserController userController;

    @Mock
    private UserManager userManager;

    @Mock
    private ServiceManager serviceManager;

    @Mock
    private ReferralManager referralManager;

    @Mock
    private VoucherManager voucherManager;

    @Mock
    private AppointmentManager appointmentManager;

    @Mock
    private ServiceProfileManager serviceProfileManager;


    // Other mocked dependencies...

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLogin_ValidRequest() throws Exception {
        // Given
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("testuser");
        loginRequest.setPassword("testpassword");
        Optional<TB_User> user = Optional.of(new TB_User());
        when(userManager.login(loginRequest)).thenReturn(user);

        // When
        ResponseEntity<?> response = userController.login(loginRequest);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertTrue(responseBody.containsKey("token"));
    }

    @Test
    void testLogin_InvalidRequest() throws Exception {
        // Given
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("invalid");
        loginRequest.setPassword("wrongpassword");
        when(userManager.login(loginRequest)).thenReturn(Optional.empty());

        // When
        ResponseEntity<?> response = userController.login(loginRequest);

        // Then
        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());

        // Cast the response body to Map
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertTrue(responseBody.containsKey("message"));
    }

    @Test
    void testSaveSession_ValidRequest() throws Exception {
        // Given
        SessionRequest sessionRequest = new SessionRequest();
        // Initialize sessionRequest with valid data...
        Optional<TB_UserSession> userSession = Optional.of(new TB_UserSession());
        when(userManager.saveSession(sessionRequest)).thenReturn(userSession);

        // When
        ResponseEntity<?> response = userController.saveSession(sessionRequest);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertTrue(responseBody.containsKey("message"));
    }

    @Test
    void testSaveSession_InvalidRequest() throws Exception {
        // Given
        SessionRequest sessionRequest = new SessionRequest();
        // Initialize sessionRequest with invalid data...
        when(userManager.saveSession(sessionRequest)).thenReturn(Optional.empty());

        // When
        ResponseEntity<?> response = userController.saveSession(sessionRequest);

        // Then
        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertTrue(responseBody.containsKey("message"));
    }

    @Test
    void testRegister_Success() throws Exception {
        // Given
        SignUpRequest signUpRequest = new SignUpRequest();
        Optional<TB_User> user = Optional.of(new TB_User());
        when(userManager.register(signUpRequest)).thenReturn(user);

        // When
        ResponseEntity<?> response = userController.register(signUpRequest);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        Map<String, String> responseBody = (Map<String, String>) response.getBody();
        assertEquals("200", responseBody.get("statusCode"));
        assertEquals("Success", responseBody.get("message"));
    }

    @Test
    void testRegister_UserNotFound() throws Exception {
        // Given
        SignUpRequest signUpRequest = new SignUpRequest();
        when(userManager.register(signUpRequest)).thenReturn(Optional.empty());

        // When
        ResponseEntity<?> response = userController.register(signUpRequest);

        // Then
        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
        Map<String, String> responseBody = (Map<String, String>) response.getBody();
        assertEquals("200", responseBody.get("statusCode"));
        assertEquals("No existing functions", responseBody.get("message"));
    }

    // Test case for /updateCustomer endpoint
    @Test
    void testUpdateCustomer_Success() throws Exception {
        // Given
        CustomerRequest customerRequest = new CustomerRequest();
        Optional<TB_Customer> customer = Optional.of(new TB_Customer());
        when(userManager.updateCustomer(customerRequest)).thenReturn(customer);

        // When
        ResponseEntity<?> response = userController.updateCustomer(customerRequest);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        Map<String, String> responseBody = (Map<String, String>) response.getBody();
        assertEquals("200", responseBody.get("statusCode"));
        assertEquals("No existing functions", responseBody.get("message"));
    }

    @Test
    void testUpdateCustomer_UserNotFound() throws Exception {
        // Given
        CustomerRequest customerRequest = new CustomerRequest();
        when(userManager.updateCustomer(customerRequest)).thenReturn(Optional.empty());

        // When
        ResponseEntity<?> response = userController.updateCustomer(customerRequest);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        Map<String, String> responseBody = (Map<String, String>) response.getBody();
        assertEquals("200", responseBody.get("statusCode"));
        assertEquals("No existing functions", responseBody.get("message"));
    }

    @Test
    void testLogin2() throws Exception {
        // Given
        Collection<TB_User> userCollection = new ArrayList<>();
        TB_User user1 = new TB_User();
        TB_User user2 = new TB_User();
        userCollection.add(user1);
        userCollection.add(user2);
        when(userManager.login2()).thenReturn((List<TB_User>) userCollection);

        // When
        Collection<?> response = userController.login2();

        // Then
        assertEquals(2, response.size());
        assertEquals(user1, ((List<?>) response).get(0));
        assertEquals(user2, ((List<?>) response).get(1));
        verify(userManager, times(1)).login2();
    }

    // Test case for /findRole endpoint
    @Test
    void testFindRole() throws Exception {
        // Given
        RoleRequest roleRequest = new RoleRequest();
        roleRequest.setToken("testToken");
        String expectedRole = "admin";
        when(userManager.findRole(roleRequest.getToken())).thenReturn(expectedRole);

        // When
        String response = userController.findRole(roleRequest);

        // Then
        assertEquals(expectedRole, response);
        verify(userManager, times(1)).findRole(roleRequest.getToken());
    }

    // Test case for /getReferralCode endpoint
    @Test
    void testGetReferralCode() throws Exception {
        // Given
        String token = "testToken";
        String expectedCode = "refCode123";
        when(referralManager.getCode(token)).thenReturn(expectedCode);

        // When
        ResponseEntity<?> response = userController.getReferralCode(token);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        Map<String, String> responseBody = (Map<String, String>) response.getBody();
        assertEquals("200", responseBody.get("statusCode"));
        assertEquals("Success", responseBody.get("message"));
        assertEquals(expectedCode, responseBody.get("data"));
        verify(referralManager, times(1)).getCode(token);
    }

    // Test case for /getVoucher endpoint
    @Test
    void testGetVoucher() throws Exception {
        // Given
        String token = "testToken";
        List<VoucherDTO> expectedVouchers = new ArrayList<>();
        VoucherDTO voucher1 = new VoucherDTO();
        VoucherDTO voucher2 = new VoucherDTO();
        expectedVouchers.add(voucher1);
        expectedVouchers.add(voucher2);
        when(voucherManager.getVoucher(token)).thenReturn(expectedVouchers);

        // When
        ResponseEntity<?> response = userController.getVoucher(token);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertEquals("200", responseBody.get("statusCode"));
        assertEquals("Success", responseBody.get("message"));
        assertEquals(expectedVouchers, responseBody.get("vouchers"));
        verify(voucherManager, times(1)).getVoucher(token);
    }

    @Test
    void testLoadSettings() throws Exception {
        // Given
        String token = "testToken";
        List<VoucherDTO> expectedVouchers = List.of(); // Explicitly defined as List<VoucherDTO>
        String expectedReferral = "referralCode";
        List<?> expectedBusiness = new ArrayList<>();


        // Define expectedAppointments as List of the specific type expected by appointmentManager.getAppt
        List<AppointmentDTO> expectedAppointments = List.of(); // Define explicitly as List<AppointmentDTO>
        
        // Mock the behavior of the managers
        when(voucherManager.getVoucher(token)).thenReturn(expectedVouchers);
        when(referralManager.getCode(token)).thenReturn(expectedReferral);
        when(serviceProfileManager.findMyService(token)).thenReturn(new ArrayList<>());

        // Use doReturn().when() for appointmentManager.getAppt(token)
        Mockito.doReturn(expectedAppointments).when(appointmentManager).getAppt(token);
        
        // When
        ResponseEntity<?> response = userController.loadSettings(token);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertEquals("200", responseBody.get("statusCode"));
        assertEquals("Success", responseBody.get("message"));
        assertEquals(expectedVouchers, responseBody.get("vouchers"));
        assertEquals(expectedReferral, responseBody.get("referral"));
        assertEquals(expectedAppointments, responseBody.get("appointment"));
        
        // Verify the methods were called once each
        verify(voucherManager, times(1)).getVoucher(token);
        verify(referralManager, times(1)).getCode(token);
        verify(appointmentManager, times(1)).getAppt(token);
    }

    // Test case for /getSetting endpoint
    @Test
    void testGetSetting() throws Exception {
        // Given
        String token = "testToken";
        TB_Customer expectedCustomer = new TB_Customer();
        when(userManager.getSetting(token)).thenReturn(Optional.of(expectedCustomer));

        // When
        ResponseEntity<?> response = userController.getSetting(token);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertEquals("200", responseBody.get("statusCode"));
        assertEquals("Success", responseBody.get("message"));
        assertEquals(Optional.of(expectedCustomer), responseBody.get("data"));
        verify(userManager, times(1)).getSetting(token);
    }

    // Test case for /registerService endpoint
    @Test
    void testRegisterService() throws Exception {
        // Given
        TB_Service expectedService = new TB_Service();
        when(serviceManager.store(null)).thenReturn(expectedService);

        // When
        ResponseEntity<?> response = userController.registerService();

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        Map<String, String> responseBody = (Map<String, String>) response.getBody();
        assertEquals("200", responseBody.get("statusCode"));
        assertEquals("Success", responseBody.get("message"));
        verify(serviceManager, times(1)).store(null);
    }

    // Test case for /getUserId endpoint
    @Test
    void testGetUserSessionByToken() {
        // Given
        String token = "testToken";
        int expectedUserId = 123;
        when(userManager.getUserSessionByToken(token)).thenReturn(Optional.of(expectedUserId));

        // When
        ResponseEntity<Optional<Integer>> response = userController.getUserSessionByToken(token);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().isPresent());
        assertEquals(expectedUserId, response.getBody().get());
        verify(userManager, times(1)).getUserSessionByToken(token);
    }

    // Test case for /getUsername endpoint
    @Test
    void testGetUsernameById() {
        // Given
        int userId = 1;
        String expectedUsername = "testUsername";
        when(userManager.getUsernameById(userId)).thenReturn(Optional.of(expectedUsername));

        // When
        ResponseEntity<Optional<String>> response = userController.getUsernameById(userId);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().isPresent());
        assertEquals(expectedUsername, response.getBody().get());
        verify(userManager, times(1)).getUsernameById(userId);
    }

}
