package org.example.back.PerfectPlay.controller;

import static org.springframework.http.HttpStatus.*;

import java.net.URL;
import java.util.Date;
import java.util.List;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import org.example.back.PerfectPlay.repository.SongRepository;
import org.example.back.common.ApiResponse;
import org.example.back.PerfectPlay.dto.request.PerfectplayRequestDto;
import org.example.back.PerfectPlay.dto.response.PerfectplayResponseDto;
import org.example.back.PerfectPlay.dto.response.SongInfoResponseDto;
import org.example.back.PerfectPlay.dto.response.SongLineResponseDto;
import org.example.back.PerfectPlay.dto.response.SongResponseDto;
import org.example.back.PerfectPlay.entity.PerfectplayEntity;
import org.example.back.PerfectPlay.entity.SongEntity;
import org.example.back.PerfectPlay.service.implementation.PerfectplayServiceImpl;
import org.example.back.PerfectPlay.service.implementation.SongLineServiceImpl;
import org.example.back.PerfectPlay.service.implementation.SongServiceImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/perfectplay")
@RequiredArgsConstructor
public class PerfectController {

	private final AmazonS3 amazonS3;
	private final SongServiceImpl songServiceImpl;
	private final PerfectplayServiceImpl perfectplayServiceImpl;
	private final SongLineServiceImpl songLineServiceImpl;
	private final SongRepository songRepository;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	// 전체 음악 조회
	@GetMapping("/list")
	public ResponseEntity<ApiResponse> findAllSong() {

		List<SongResponseDto> songList = songServiceImpl.findAllSong();

		ApiResponse apiResponse = ApiResponse.builder()
			.message("전체 음악 조회")
			.status(OK.value())
			.data(songList)
			.build();
		return ResponseEntity.ok(apiResponse);
	}

	// 퍼펙트플레이 기록 조회
	@GetMapping("/{userIdx}")
	public ResponseEntity<ApiResponse> perfectplayResultByUserIdx(@PathVariable int userIdx) {
		List<PerfectplayResponseDto> perfectplayResultList = perfectplayServiceImpl.perfectplayResult(userIdx);
		ApiResponse apiResponse = ApiResponse.builder()
			.message("조회 결과")
			.status(OK.value())
			.data(perfectplayResultList)
			.build();
		return ResponseEntity.ok(apiResponse);
	}

	// 퍼펙트플레이 기록 저장
	@PostMapping("/{userIdx}")
	public ResponseEntity<ApiResponse> perfectplayResultSave(@PathVariable int userIdx
		,@RequestBody PerfectplayRequestDto perfectplayRequestDto) {

		PerfectplayEntity perfectplayEntity = perfectplayServiceImpl.createPerfectplayResult(userIdx, perfectplayRequestDto);
		ApiResponse apiResponse = ApiResponse.builder()
			.message("생성 결과")
			.status(OK.value())
			.data(perfectplayEntity)
			.build();
		return ResponseEntity.ok(apiResponse);
	}

	@GetMapping("/{songIdx}/info")
	public ResponseEntity<ApiResponse> getSongInfo(@PathVariable int songIdx) throws Exception {
		SongEntity song = songServiceImpl.getSongById(songIdx);
		List<SongLineResponseDto> songLineList = songLineServiceImpl.getAllSongLineById(songIdx);
		SongInfoResponseDto songInfoResponseDto = SongInfoResponseDto.builder()
			.songEntity(song)
			.songLineResponseDtoList(songLineList)
			.build();
		ApiResponse apiResponse = ApiResponse.builder()
			.message("곡 정보")
			.status(OK.value())
			.data(songInfoResponseDto)
			.build();

		makeURL(songIdx);
		return ResponseEntity.ok(apiResponse);
	}

	@GetMapping("/{userIdx}/count")
	public ResponseEntity<ApiResponse> getPlayCount(@PathVariable int userIdx) {
		int playCount = perfectplayServiceImpl.getPlayCount(userIdx);

		ApiResponse apiResponse = ApiResponse.builder()
				.message("플레이 횟수")
				.status(OK.value())
				.data(playCount)
				.build();

		return ResponseEntity.ok(apiResponse);
	}
	public String makeURL(int songIdx) throws Exception {
		String preSignedURL;
		Date expiration = new Date();
		Long expTimeMillis = expiration.getTime();
		expTimeMillis += 1000 * 144400;
		expiration.setTime(expTimeMillis);

		GeneratePresignedUrlRequest PresignedUrlRequest =
				new GeneratePresignedUrlRequest(bucket, "storage/song_img/images.jfif")
						.withMethod(HttpMethod.GET)
						.withExpiration(expiration);
		URL url = amazonS3.generatePresignedUrl(PresignedUrlRequest);
		preSignedURL = url.toString();


		SongEntity songEntity = songRepository.findBySongIdx(songIdx);
		songEntity.setSongImg(preSignedURL);
		songRepository.save(songEntity);

		return preSignedURL;
	}
}