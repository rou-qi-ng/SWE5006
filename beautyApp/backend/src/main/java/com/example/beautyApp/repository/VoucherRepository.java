package com.example.beautyApp.repository;

import com.example.beautyApp.model.TB_User;
import com.example.beautyApp.model.TB_Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface VoucherRepository extends JpaRepository<TB_Voucher, Integer> {

//    List<TB_Voucher> findAllByUserId(List<Integer> ids);
    @Query("SELECT u FROM TB_Voucher u WHERE (u.userId = :userId)")
    List<TB_Voucher> findVouchers(Integer userId);
}