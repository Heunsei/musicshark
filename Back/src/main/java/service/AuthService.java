package service;

import dto.request.SignUpRequestDto;

public interface AuthService {

    void signUp(SignUpRequestDto dto);
}
