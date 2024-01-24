package org.example.back.controller;

import java.io.File;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import org.example.back.service.VideoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.example.back.request.UserVideoRequestDto;

@RestController
@RequestMapping("/videos")
public class VideoController {
	private static final Logger logger = LoggerFactory.getLogger(VideoController.class);

	@GetMapping()
	public String getTest() {
		return "Test";
	}

	@GetMapping("/{user_id}")
	public ResponseEntity<?> getUserVideo(@PathVariable("user_id") int userId) {
		try {
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch(Exception e) {
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("")
	public ResponseEntity<?> postUserVideo(@RequestBody UserVideoRequestDto videoFormData) {
		logger.info("postUserVideo! : " + videoFormData.getNickname());
		// System.out.println("postUserVideo! : " + videoFormData.getNickname());
		try{
			if(videoFormData.getVideo_file().isEmpty()){
				return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
			}
			// 현재 날짜를 String으로 변환함.
			LocalDate now = LocalDate.now(ZoneId.of("Asia/Seoul"));
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
			String dateString = formatter.toString().replaceAll("/", "");

			String uploadFolderPath = File.separator + videoFormData.getNickname() + File.separator + dateString;
			File uploadFolder = new File(uploadFolderPath);
			if(!uploadFolder.exists()){
				boolean mkdirs = uploadFolder.mkdirs();
			}

			String filepath = uploadFolderPath + File.separator + videoFormData.getVideo_title();
			videoFormData.getVideo_file().transferTo(new File(filepath));

			return new ResponseEntity<Void>(HttpStatus.ACCEPTED);
		} catch(Exception e){
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}
}
