package org.example.back.User.service;


import org.example.back.User.dto.request.PatchUserPasswordRequestDto;
import org.example.back.common.ApiResponse;
import org.example.back.User.dto.request.PatchUserRequestDto;
import org.example.back.User.dto.response.DeleteUserResponseDto;
import org.example.back.User.dto.response.GetUserResponseDto;
import org.example.back.User.dto.response.PatchUserResponseDto;

public interface UserService {
    GetUserResponseDto getUser(String userEmail);
    ApiResponse<PatchUserResponseDto> patchUser(String userEmail, PatchUserRequestDto dto);
    ApiResponse<DeleteUserResponseDto> deleteUser(String userEmail);
    ApiResponse<?> patchUserPassword(String userEmail, String userPassword, PatchUserPasswordRequestDto dto);
}
