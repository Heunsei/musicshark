package org.example.back.service;

import org.example.back.request.SignUpRequestDto;

public interface AuthService {

    void signUp(SignUpRequestDto dto);
}
