package org.example.back.service;


import org.example.back.dto.response.GetUserResponseDto;
import org.springframework.http.ResponseEntity;

public interface UserService {

    GetUserResponseDto getUser(Integer userIdx);
}
