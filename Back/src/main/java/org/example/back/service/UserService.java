package org.example.back.service;


import org.example.back.common.ApiResponse;
import org.example.back.dto.request.PatchUserRequestDto;
import org.example.back.dto.response.DeleteUserResponseDto;
import org.example.back.dto.response.GetUserResponseDto;
import org.example.back.dto.response.PatchUserResponseDto;

public interface UserService {
    GetUserResponseDto getUser(String userEmail);
    ApiResponse<PatchUserResponseDto> patchUser(String userEmail, PatchUserRequestDto dto);
    ApiResponse<DeleteUserResponseDto> deleteUser(String userEmail);
}
