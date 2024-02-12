package org.example.back.Auth.service;

import org.example.back.Auth.dto.request.SignInRequestDto;
import org.example.back.Auth.dto.request.SignUpRequestDto;
import org.example.back.common.ApiResponse;
import org.example.back.config.JwtToken;
import org.example.back.Auth.dto.response.SignUpResponseDto;

public interface AuthService {

    public ApiResponse<SignUpResponseDto> signUp(SignUpRequestDto dto);
    public JwtToken signIn(SignInRequestDto dto);
}
