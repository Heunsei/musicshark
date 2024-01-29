package org.example.back.service;

import org.example.back.dto.request.JwtToken;
import org.example.back.dto.request.SignInRequestDto;
import org.example.back.dto.request.SignUpRequestDto;
import org.example.back.dto.response.SignInResponseDto;
import org.example.back.dto.response.SignUpResponseDto;

public interface AuthService {

    public String signUp(SignUpRequestDto dto);
    public JwtToken signIn(SignInRequestDto dto);
}
