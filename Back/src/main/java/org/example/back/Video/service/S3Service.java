package org.example.back.Video.service;

import java.io.IOException;

import org.example.back.Video.dto.request.S3VideoRequestDto;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

public interface S3Service {
	String saveFile(MultipartFile multipartFile) throws IOException;

    void saveVideo(S3VideoRequestDto dto);

    void savePersonalVideo(S3VideoRequestDto dto, UserDetails userDetails) throws IOException;
}
