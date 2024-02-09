package org.example.back.User.controller;


import lombok.RequiredArgsConstructor;
import org.example.back.common.ApiResponse;
import org.example.back.User.dto.request.PatchUserRequestDto;
import org.example.back.User.dto.response.DeleteUserResponseDto;
import org.example.back.User.dto.response.GetUserResponseDto;
import org.example.back.User.dto.response.PatchUserResponseDto;
import org.example.back.User.repository.TierRepository;
import org.example.back.User.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final TierRepository tierRepository;

    @GetMapping("/")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal UserDetails userDetails){

        GetUserResponseDto result = userService.getUser(userDetails.getUsername());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PatchMapping("/patch")
    public ResponseEntity<ApiResponse> patchUser(@AuthenticationPrincipal UserDetails userDetails,
                                                 @RequestBody PatchUserRequestDto requestDto){

        ApiResponse<PatchUserResponseDto> result = userService.patchUser(userDetails.getUsername(), requestDto);

        String message = result.getMessage();
        int status = result.getStatus();

        ApiResponse apiResponse = new ApiResponse(message, status, result.getData());
        return ResponseEntity.ok(apiResponse);
    }

    @PatchMapping("/delete")
    public ResponseEntity<ApiResponse> deleteUser(@AuthenticationPrincipal UserDetails userDetails){

        ApiResponse<DeleteUserResponseDto> result = userService.deleteUser(userDetails.getUsername());

        String message = result.getMessage();
        int status = result.getStatus();

        ApiResponse apiResponse = new ApiResponse(message, status, result.getData());

        return  ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/tier")
    public ResponseEntity<?> getUserTier(@AuthenticationPrincipal UserDetails userDetails){
        int userIdx = userService.getUser(userDetails.getUsername()).getUserIdx();
        String tier = tierRepository.findUserTierById(userIdx);

        return new ResponseEntity<>(tier, HttpStatus.OK);
    }
}
