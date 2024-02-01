package org.example.back.service;

import org.example.back.common.ApiResponse;
import org.example.back.dto.request.JwtToken;
import org.example.back.dto.request.SignInRequestDto;
import org.example.back.dto.request.SignUpRequestDto;
import org.example.back.dto.response.SignInResponseDto;
import org.example.back.dto.response.SignUpResponseDto;

public interface AuthService {

    public ApiResponse<SignUpResponseDto> signUp(SignUpRequestDto dto);
    public JwtToken signIn(SignInRequestDto dto);
}
