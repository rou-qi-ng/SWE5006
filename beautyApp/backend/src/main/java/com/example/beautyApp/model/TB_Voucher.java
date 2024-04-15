package com.example.beautyApp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Setter
@Getter
@Table(name="voucher")
public class TB_Voucher {
    @Id
    @NonNull
    @Column(name = "voucher_id")
    private Integer voucherId;

    @NonNull
    @Column(name = "voucher_code")
    private String voucherCode;

    @NonNull
    @Column(name = "user_id")
    private Integer userId;

    @NonNull
    @Column(name = "voucher_name")
    private String voucherName;
}
