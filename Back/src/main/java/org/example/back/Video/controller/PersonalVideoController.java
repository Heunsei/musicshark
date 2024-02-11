package org.example.back.Video.controller;

import java.util.List;

import org.example.back.Video.dto.request.PersonalVideoRequestDto;
import org.example.back.Video.dto.response.PersonalVideoResponseDto;
import org.example.back.Video.service.PersonalVideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/videos/personal")
@RequiredArgsConstructor
public class PersonalVideoController {

	@Autowired
	private final PersonalVideoService s3Service;

	@GetMapping()
	public ResponseEntity<?> getPresignedURL(@AuthenticationPrincipal UserDetails userDetails){
		try {
			List<PersonalVideoResponseDto> urls = s3Service.getPresignedURL(userDetails);
			return new ResponseEntity<List<PersonalVideoResponseDto>>(urls, HttpStatus.OK);
		} catch(Exception e){
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{video_idx}")
	public ResponseEntity<?> getVideo(@PathVariable("video_idx") int videoIdx, @AuthenticationPrincipal UserDetails userDetails){
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@PostMapping()
	public ResponseEntity<?> saveVideo(
			@ModelAttribute PersonalVideoRequestDto dto,
			@AuthenticationPrincipal UserDetails userDetails){
		try{
			s3Service.saveVideo(dto, userDetails);
			return new ResponseEntity<Void>(HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}


	@DeleteMapping()
	public ResponseEntity<?> deleteVideo(@AuthenticationPrincipal UserDetails userDetails, @RequestParam int boardIdx){
		try {
			s3Service.deleteVideo(userDetails, boardIdx);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch(Exception e){
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// 당일 저장한 개인 영상 중 입력된 영상 제목과 일치하는 파일이 있는 지 확인
	@GetMapping("/find")
	public ResponseEntity<?> checkVideowithTitle(@AuthenticationPrincipal UserDetails userDetails, @RequestParam String videoTitle){
		boolean existed = s3Service.findVideoWithTitle(userDetails, videoTitle);
		if(!existed) return new ResponseEntity<Void>(HttpStatus.OK);
		else return new ResponseEntity<String>("이미 존재하는 파일", HttpStatus.BAD_REQUEST);
	}
}
