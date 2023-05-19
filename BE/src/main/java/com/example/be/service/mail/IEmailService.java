package com.example.be.service.mail;

import com.example.be.model.User;
public interface IEmailService {
    void sendResetPasswordEmail(String email, String otp);
    boolean validateOtp(String otpCode, String email);
    String generateOtp(User user);

}