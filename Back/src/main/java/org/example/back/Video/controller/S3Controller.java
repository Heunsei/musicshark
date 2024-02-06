package org.example.back.Video.controller;

import org.example.back.Video.dto.request.S3VideoRequestDto;
import org.example.back.Video.dto.request.UserVideoRequestDto;
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
@RequestMapping("/S3")
@RequiredArgsConstructor
public class S3Controller {

	@Autowired
	private final S3Service s3Service;

	@PostMapping( "/personal/videos")
	public ResponseEntity<Void> savePersonalVideo(
			@ModelAttribute S3VideoRequestDto dto,
			@AuthenticationPrincipal UserDetails userDetails){
		try{
			System.out.println("title: " + dto.getVideoTitle());
			System.out.println("file: " + dto.getVideoFile().getOriginalFilename());
			s3Service.savePersonalVideo(dto, userDetails);
			return new ResponseEntity<Void>(HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping()
	public String getPersonalVideos(@AuthenticationPrincipal UserDetails userDetails){
		return null;
	}


	@PostMapping("/post")
	public String saveFile(@RequestParam("image") MultipartFile multipartFile){
		try {
			return s3Service.saveFile(multipartFile);
		} catch(Exception e){
			return e.getMessage();
		}
	}

	@PostMapping("/videos")
	public ResponseEntity<?> saveVideo(@RequestBody S3VideoRequestDto dto){
		try{
			s3Service.saveVideo(dto);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch(Exception e) {
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}


}
