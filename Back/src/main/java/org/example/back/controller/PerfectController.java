package org.example.back.controller;

import static org.springframework.http.HttpStatus.*;

import java.util.List;

import org.example.back.common.ApiResponse;
import org.example.back.dto.request.SongDto;
import org.example.back.service.implementation.SongService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/perfectplay")
@RequiredArgsConstructor
public class PerfectController {

	private final SongService songService;

	// 전체 음악 조회
	@GetMapping("/list")
	public ResponseEntity<ApiResponse> findAllSong() {

		List<SongDto> songList = songService.findAllSong();

		ApiResponse apiResponse = ApiResponse.builder()
			.message("검색 결과")
			.status(OK.value())
			.data(songList)
			.build();
		return ResponseEntity.ok(apiResponse);
	}

	// 퍼펙트플레이 기록 조회

	// 퍼펙트플레이 기록 저장
}