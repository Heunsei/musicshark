package controller;

import java.io.File;
import java.io.FileInputStream;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dto.request.UserVideoRequestDto;
import service.VideoService;

@RestController
@RequestMapping("/videos")
public class VideoController {
	@Autowired
	private VideoService videoService;

	@GetMapping("/{user_id}")
	public ResponseEntity<?> getUserVideo(@PathVariable("user_id") int userId) {
		try {
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch(Exception e) {
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/{user_id}")
	public ResponseEntity<?> postUserVideo(@PathVariable("user_id") int userId, @ModelAttribute UserVideoRequestDto videoFormData) {
		try{
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
			File newVideoFile = new File(filepath);

			return new ResponseEntity<Void>(HttpStatus.ACCEPTED);
		} catch(Exception e){
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}
}
