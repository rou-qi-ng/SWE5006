package com.example.beautyApp.manager;

import com.example.beautyApp.model.*;
import com.example.beautyApp.repository.UserSessionRepository;
import com.example.beautyApp.repository.VoucherRepository;
import com.example.beautyApp.request.VoucherDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VoucherManager {

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private UserSessionRepository userSessionRepository;

    public List<VoucherDTO> getVoucher(String token) {


        Optional<TB_UserSession> user= userSessionRepository.findByToken(token);
        System.out.println(user);

        if (user.isPresent()) {
//            List<Integer> ids = new ArrayList<>();
//            ids.add(user.get().getUserId());
            List<TB_Voucher> vouchers = voucherRepository.findVouchers(user.get().getUserId());
            List<VoucherDTO> vouchersList = new ArrayList<>();
            for (TB_Voucher voucher:vouchers){
                VoucherDTO newVoucher = new VoucherDTO();
                newVoucher.setVoucherCode(voucher.getVoucherCode());
                newVoucher.setVoucherName(voucher.getVoucherName());

                vouchersList.add(newVoucher);
            }
            return vouchersList;
        }
        return new ArrayList<>();
    }

}
