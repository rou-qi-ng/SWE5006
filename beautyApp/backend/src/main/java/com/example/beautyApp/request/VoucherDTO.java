package com.example.beautyApp.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VoucherDTO {
    public interface VoucherGroup{}
    private String voucherName;
    private String voucherCode;
}
