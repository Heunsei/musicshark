package org.example.back.controller;

import static org.springframework.http.HttpStatus.*;

import java.util.List;

import org.example.back.common.ApiResponse;
import org.example.back.dto.response.PerfectplayResponseDto;
import org.example.back.dto.response.SongResponseDto;
import org.example.back.service.implementation.PerfectplayServiceImpl;
import org.example.back.service.implementation.SongServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/perfectplay")
@RequiredArgsConstructor
public class PerfectController {

	private final SongServiceImpl songServiceImpl;
	private final PerfectplayServiceImpl perfectplayServiceImpl;

	// 전체 음악 조회
	@GetMapping("/list")
	public ResponseEntity<ApiResponse> findAllSong() {

		List<SongResponseDto> songList = songServiceImpl.findAllSong();

		ApiResponse apiResponse = ApiResponse.builder()
			.message("조회 결과")
			.status(OK.value())
			.data(songList)
			.build();
		return ResponseEntity.ok(apiResponse);
	}

	// 퍼펙트플레이 기록 조회
	@GetMapping("/{user_id}")
	public ResponseEntity<ApiResponse> perfectplayResultByUserId() {
		List<PerfectplayResponseDto> perfectplayResultList = perfectplayServiceImpl.perfectplayResult();

		ApiResponse apiResponse = ApiResponse.builder()
			.message("조회 결과")
			.status(OK.value())
			.data(perfectplayResultList)
			.build();
		return ResponseEntity.ok(apiResponse);
	}

	// 퍼펙트플레이 기록 저장
}