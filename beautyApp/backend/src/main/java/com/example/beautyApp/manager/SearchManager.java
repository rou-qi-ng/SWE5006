package com.example.beautyApp.manager;

import com.example.beautyApp.model.ServiceProfile;
//import com.example.beautyApp.model.User;
import com.example.beautyApp.repository.SearchRepository;
//import com.example.beautyApp.request.SignUpRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SearchManager {
    @Autowired
    private SearchRepository searchRepository;

    // public List<Search> getAllSearchs() {
    //     return searchRepository.findAll();
    // }

    // public Optional<ServiceProfile> getSearchById(int serviceId) {
    //     return searchRepository.findByServiceId(serviceId);
    // }

    public List<ServiceProfile> searchByType(String type) {
        return searchRepository.findByServiceType(type);
    }
    
    // public Optional<Search> search(String serviceType, String serviceName) {
    //     System.out.println("serviceType: " + serviceType);
    //     System.out.println("serviceName: " + serviceName);
    //     return searchRepository.findServiceName(serviceType, serviceName);
    //     // if (serviceType.equals("Nails")){
    //     //     return searchRepository.findServiceName("Nails", serviceName);  
    //     // }
    //     // else if (serviceType.equals("Lash")){
    //     //     return searchRepository.findServiceName("Lash", serviceName);
    //     // }
        

    // }
}
