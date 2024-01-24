package org.example.back.controller;

import org.example.back.dto.request.SignUpRequestDto;
import org.example.back.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDto requestDto){
        String result = authService.signUp(requestDto);
        return new ResponseEntity<>(result ,HttpStatus.OK);
    }

    @GetMapping("/sign-in")
    public String hello(){
        return "HELLO";
    }
}
