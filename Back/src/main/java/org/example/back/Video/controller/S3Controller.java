package org.example.back.Video.controller;

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
			System.out.println("title: " + dto.getVideoTitle());
			System.out.println("file: " + dto.getVideoFile());
			s3Service.savePersonalVideo(dto, userDetails);
			return new ResponseEntity<Void>(HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/personal/test")
	public ResponseEntity<Void> savePersonalVideoTest(
		@ModelAttribute PersonalVideoRequestDto dto,
		@AuthenticationPrincipal UserDetails userDetails){
		try {
			s3Service.savePersonalVideoTest(dto, userDetails);
			return new ResponseEntity<Void>(HttpStatus.OK);
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
	public ResponseEntity<Void> deletePersonalVideo(@AuthenticationPrincipal UserDetails userDetails){

		return new ResponseEntity<Void>(HttpStatus.ACCEPTED);
	}
}
