package org.example.back.service;

import org.example.back.dto.request.SignUpRequestDto;

public interface AuthService {

    void signUp(SignUpRequestDto dto);
}
