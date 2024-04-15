package com.example.beautyApp.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CustomerRequest {
    public interface CustomerGroup{}
    private String sessionId;
    private Integer userId;
    private String favourites;
    private String skinType;
    private String dob;
    private String gender;
    private String address;

    public String getAddress() {
        return address;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getDob() {
        return dob;
    }

    public String getFavourites() {
        return favourites;
    }

    public String getGender() {
        return gender;
    }

    public String getSessionId() {
        return sessionId;
    }

    public String getSkinType() {
        return skinType;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public void setFavourites(String favourites) {
        this.favourites = favourites;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public void setSkinType(String skinType) {
        this.skinType = skinType;
    }
}
