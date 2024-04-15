package com.example.beautyApp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.io.Serializable;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Setter
@Getter
@Table(name="customer")
public class TB_Customer implements Serializable {
    @Id
    @NonNull
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "favourites")
    private String favourites;

    @Column(name = "skin_type")
    private String skinType;

    @Column(name = "dob")
    private String dob;

    @Column(name = "gender")
    private String gender;

    @Column(name = "address")
    private String address;


}
