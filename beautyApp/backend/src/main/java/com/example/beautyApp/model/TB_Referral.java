package com.example.beautyApp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Setter
@Getter
@Table(name="referral")
public class TB_Referral {
    @Id
    @NonNull
    @Column(name = "user_id")
    private Integer userId;

    @NonNull
    @Column(name = "referral_code")
    private String referralCode;

}
