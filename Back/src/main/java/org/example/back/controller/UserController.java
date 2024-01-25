package org.example.back.controller;


import org.example.back.dto.response.GetUserResponseDto;
import org.example.back.entity.UserEntity;
import org.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/")
    public ResponseEntity<GetUserResponseDto> getUser(Integer userIndex){
        GetUserResponseDto result = userService.getUser(userIndex);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

//    @GetMapping("/")
//    public ResponseEntity<GetUserResponseDto> getUser(@AuthenticationPrincipal UserEntity user){
//        int userIndex = user.getUserIdx();
//        GetUserResponseDto result = userService.getUser(userIndex);
//        return new ResponseEntity<>(result, HttpStatus.OK);
//    }
}
