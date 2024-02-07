package org.example.back.Video.service;

import java.io.IOException;
import java.util.List;

import org.example.back.Video.dto.request.S3VideoRequestDto;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.HttpMethod;

public interface S3Service {
    void savePersonalVideo(S3VideoRequestDto dto, UserDetails userDetails) throws IOException;

	String getPresignedURL(String keyname, long expTime, HttpMethod method) throws Exception;

	List<String> getPersonalPresignedURL(UserDetails userDetails) throws Exception;
}
