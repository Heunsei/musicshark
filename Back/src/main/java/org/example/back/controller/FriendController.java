package org.example.back.controller;

import static org.springframework.http.HttpStatus.*;

import java.util.List;

import org.example.back.common.ApiResponse;
import org.example.back.dto.response.FriendResponseDto;
import org.example.back.service.implementation.FriendServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/friend")
@RequiredArgsConstructor
public class FriendController {

	private final FriendServiceImpl friendServiceImpl;

	//내 친구 목록 조회
	@GetMapping("/{userIdx}")
	public ResponseEntity<ApiResponse> findAllFriend(@PathVariable int userIdx) {

		List<FriendResponseDto> friendList = friendServiceImpl.findAllFriend(userIdx);

		ApiResponse apiResponse = ApiResponse.builder()
			.message("친구 목록 조회")
			.status(OK.value())
			.data(friendList)
			.build();
		return ResponseEntity.ok(apiResponse);
	}
}
