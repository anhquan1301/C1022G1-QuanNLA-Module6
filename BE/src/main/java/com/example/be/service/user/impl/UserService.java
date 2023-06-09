package com.example.be.service.user.impl;

import com.example.be.model.User;
import com.example.be.repository.user.IUserRepository;
import com.example.be.service.user.IUserService;
import org.hibernate.validator.internal.util.stereotypes.Lazy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements IUserService {
    @Autowired
    IUserRepository iUserRepository;
    @Autowired
    @Lazy
    PasswordEncoder passwordEncoder;

    @Override
    public Optional<User> findByUsername(String name) {
        return iUserRepository.findByUserName(name);
    }


    @Override
    public Boolean existsByUsername(String username) {
        return iUserRepository.existsByUserName(username);
    }
    @Override
    public Boolean existsByEmail(String email) {
        return iUserRepository.existsByEmail(email);
    }

    @Override
    public Boolean checkIfValidOldPassword(User user, String oldPassword) {
        return passwordEncoder.matches(oldPassword, user.getPassword());
    }

    @Override
    public void changeUserPassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        iUserRepository.updatePassword(user.getPassword(), user.getId());
    }

    @Override
    public User findByEmailUser(String email) {
        return iUserRepository.findByEmail(email);
    }

    @Override
    public void updateOtp(User user) {
        iUserRepository.updateOtp(user.getExpiryTime(), user.getOtpSecret(), user.getEmail());
    }

    @Override
    public void save(User user) {
        iUserRepository.save(user);
    }

    @Override
    public Integer getTotalCodeAmount() {
        return iUserRepository.getTotalCodeAmount();
    }

    @Override
    public void updateUser(User user) {
        iUserRepository.UpdateCustomer(user.getName(),
                user.getGender(),
                user.getDateOfBirth(),
                user.getAddress(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getAvatar(),
                user.getId());
    }
}