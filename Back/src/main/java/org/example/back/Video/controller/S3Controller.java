package org.example.back.Video.controller;

import java.util.Date;
import java.util.List;

import org.example.back.Video.dto.request.PersonalVideoRequestDto;
import org.example.back.Video.dto.response.PersonalVideoResponseDto;
import org.example.back.Video.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/videos")
@RequiredArgsConstructor
public class S3Controller {

	@Autowired
	private final S3Service s3Service;

	@PostMapping( "/personal")
	public ResponseEntity<Void> savePersonalVideo(
			@ModelAttribute PersonalVideoRequestDto dto,
			@AuthenticationPrincipal UserDetails userDetails){
		try{
			s3Service.savePersonalVideo(dto, userDetails);
			return new ResponseEntity<Void>(HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/personal")
	public ResponseEntity<?> getPersonalPresignedURL(@AuthenticationPrincipal UserDetails userDetails){
		try {
			List<PersonalVideoResponseDto> urls = s3Service.getPersonalPresignedURL(userDetails);
			return new ResponseEntity<List<PersonalVideoResponseDto>>(urls, HttpStatus.OK);
		} catch(Exception e){
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping("/personal")
	public ResponseEntity<?> deletePersonalVideo(@AuthenticationPrincipal UserDetails userDetails, @RequestParam int boardIdx){
		try {
			s3Service.deletePersonalVideo(userDetails, boardIdx);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch(Exception e){
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// 당일 저장한 개인 영상 중 입력된 영상 제목과 일치하는 파일이 있는 지 확인
	@GetMapping("/find/personal")
	public ResponseEntity<?> findPersonalVideo(@AuthenticationPrincipal UserDetails userDetails, @RequestParam String videoTitle){
		boolean existed = s3Service.findPersonalVideoWithTitle(userDetails, videoTitle);
		if(!existed) return new ResponseEntity<Void>(HttpStatus.OK);
		else return new ResponseEntity<String>("이미 존재하는 파일", HttpStatus.BAD_REQUEST);
	}
}
