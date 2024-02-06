package org.example.back.Video.controller;

import java.io.File;
import java.time.LocalDate;
import java.time.ZoneId;

import org.example.back.Video.dto.request.UserVideoRequestDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/videos")
public class VideoController {
	private static final Logger logger = LoggerFactory.getLogger(VideoController.class);

	private static final String personalSavePath = "D:" + File.separator + "ssatudio" + File.separator + "video" + File.separator + "personal" + File.separator;
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

	// 개인 영상 저장
	@PostMapping()
	public ResponseEntity<?> postUserVideo(UserVideoRequestDto videoFormData) {
		try{
			if(videoFormData.getVideo_file().isEmpty()){
				return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
			}
			// 현재 날짜를 String으로 변환함.
			LocalDate now = LocalDate.now(ZoneId.of("Asia/Seoul"));
			String dateString = now.toString().replaceAll("-", "");
			String uploadFolderPath = personalSavePath + videoFormData.getNickname() + File.separator + dateString;

			File uploadFolder = new File(uploadFolderPath);
			if(!uploadFolder.exists()){
				uploadFolder.mkdirs();
			}
			logger.info("uploadFolderPath : " + uploadFolderPath);

			// 원본 파일 확장자 확인
			String extension = StringUtils.getFilenameExtension(videoFormData.getVideo_file().getOriginalFilename());

			String uploadPaths = uploadFolderPath + File.separator + videoFormData.getVideo_title() + "." + extension + File.separator ;
			videoFormData.getVideo_file().transferTo(new File(uploadPaths));

			return new ResponseEntity<Void>(HttpStatus.ACCEPTED);
		} catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}
}
