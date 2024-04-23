package com.example.beautyApp.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Setter
@Getter
@IdClass(SessionId.class)
@Table(name="session")
public class TB_UserSession {
    @Id
    @NonNull
    @Column(name = "token")
    private String token;

    @Id
    @NonNull
    @Column(name = "user_id")
    private Integer userId;

    public Integer getUserId() {
        return userId;
    }

    public String getToken() {
        return token;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setToken(String token) {
        this.token = token;
    }
}


