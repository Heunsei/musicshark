package org.example.back.service;

import org.example.back.dto.request.SignInRequestDto;
import org.example.back.dto.request.SignUpRequestDto;
import org.example.back.dto.response.SignInResponseDto;

public interface AuthService {

    public String signUp(SignUpRequestDto dto);
    public SignInResponseDto signIn(SignInRequestDto dto);
}
