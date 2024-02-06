package org.example.back.Video.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface S3Service {
	String saveFile(MultipartFile multipartFile) throws IOException;
}
