package org.example.back.Video.controller;

import org.example.back.Video.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/S3")
@RequiredArgsConstructor
public class S3Controller {

	@Autowired
	private final S3Service s3Service;

	@PostMapping("/post")
	public String saveFile(@RequestParam("image") MultipartFile multipartFile){
		try {
			return s3Service.saveFile(multipartFile);
		} catch(Exception e){
			return e.getMessage();
		}
	}



}
