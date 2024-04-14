package com.example.beautyApp.repository;

import com.example.beautyApp.model.TB_User;
import com.example.beautyApp.model.TB_Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface VoucherRepository extends JpaRepository<TB_Voucher, Integer> {

}