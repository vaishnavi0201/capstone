package com.wecp.financial_seminar_and_workshop_management.controller;


import com.wecp.financial_seminar_and_workshop_management.dto.LoginRequest;
import com.wecp.financial_seminar_and_workshop_management.dto.LoginResponse;
import com.wecp.financial_seminar_and_workshop_management.entity.User;
import com.wecp.financial_seminar_and_workshop_management.jwt.JwtUtil;
import com.wecp.financial_seminar_and_workshop_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/api/user")
public class RegisterAndLoginController {
   
    @Autowired
    private UserService userService;
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;


    // DUmmy route for testing
    @GetMapping
    public ResponseEntity<?>test(){
        return ResponseEntity.ok("API working!");
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        System.out.println("-----------------user api---------------");
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {


        
        // return ResponseEntity.ok(userService.loginUser(loginRequest.getUsername(),loginRequest.getPassword()));

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        } catch(AuthenticationException e) {
             throw new ResponseStatusException(HttpStatus.UNAUTHORIZED , "Invalid username or password" ,e);
        }
        final UserDetails userDetails = userService.loadUserByUsername(loginRequest.getUsername());
        User user = userService.getUserByName(loginRequest.getUsername());
        System.out.println("=========="+user+"=========");
        // User user = userService.findb
        final String token = jwtUtil.generateToken(loginRequest.getUsername(),user.getId());
        String role = user.getRole();
        System.out.println("USER ROLE IS:"+ role);
        Long userId = user.getId();
        // System.out.println("User Roles: " + role);
        
        return ResponseEntity.ok(new LoginResponse(userId, token,user.getUsername(),user.getEmail(), role) );
        // return ResponseEntity.ok(userDetails);

    }
}

