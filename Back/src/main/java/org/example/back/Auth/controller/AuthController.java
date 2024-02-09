package org.example.back.Auth.controller;

import lombok.*;
import org.example.back.Auth.dto.request.SignInRequestDto;
import org.example.back.Auth.dto.request.SignUpRequestDto;
import org.example.back.common.ApiResponse;
import org.example.back.config.JwtToken;
import org.example.back.Auth.dto.response.SignUpResponseDto;
import org.example.back.Auth.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<ApiResponse> signUp(@RequestBody SignUpRequestDto requestDto){
        ApiResponse<SignUpResponseDto> result = authService.signUp(requestDto);

        String message = result.getMessage();
        int status = result.getStatus();

        ApiResponse apiResponse = new ApiResponse(message, status, result.getData());
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody SignInRequestDto requestDto){
        JwtToken result = authService.signIn(requestDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/test")
    public String test() {
        return "success";
    }

}
