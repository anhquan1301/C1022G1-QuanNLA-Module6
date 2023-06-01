package com.example.be.controller.cusotmer;

import com.example.be.dto.customer.CustomerDetailDTO;
import com.example.be.dto.customer.CustomerUpdateDTO;
import com.example.be.dto.response.ResponseMessage;
import com.example.be.dto.role.RoleDTO;
import com.example.be.model.Role;
import com.example.be.model.User;
import com.example.be.security.JwtAuthenticationFilter;
import com.example.be.security.JwtTokenProvider;
import com.example.be.service.user.IUserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/customer")
@CrossOrigin("*")
public class CustomerController {
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private IUserService iUserService;
    @GetMapping("/detail")
    public ResponseEntity<?> detail(HttpServletRequest request) {
        String token = jwtAuthenticationFilter.getJwt(request);
        if(token!=null &&jwtTokenProvider.validateToken(token)){
            String username = jwtTokenProvider.getUserNameFromToken(token);
            if(Boolean.FALSE.equals(iUserService.existsByUsername(username))){
                return new ResponseEntity<>(new ResponseMessage("Tên người dùng không tồn tại")
                        , HttpStatus.BAD_REQUEST);
            }
            CustomerDetailDTO customerDetailDTO = new CustomerDetailDTO();
            Optional<User> user = iUserService.findByUsername(username);
            BeanUtils.copyProperties(user.get(),customerDetailDTO);
            return new ResponseEntity<>(customerDetailDTO,HttpStatus.OK);
        }else {
            return new ResponseEntity<>(new ResponseMessage("JWT không tồn tại"),HttpStatus.BAD_REQUEST);
        }
    }
    @PatchMapping("")
    public ResponseEntity<?> updateUser(@RequestBody CustomerUpdateDTO customerUpdateDTO){
        User user =  new User();
        BeanUtils.copyProperties(customerUpdateDTO,user);
        iUserService.updateUser(user);
        return new ResponseEntity<>(new ResponseMessage("Chỉnh sửa thông tin khách hàng thành công"),HttpStatus.OK);
    }
}
