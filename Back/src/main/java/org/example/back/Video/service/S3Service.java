package org.example.back.Video.service;

import java.io.IOException;
import java.util.List;

import org.example.back.Video.dto.request.PersonalVideoRequestDto;
import org.example.back.Video.dto.response.PersonalVideoResponseDto;
import org.springframework.security.core.userdetails.UserDetails;

import com.amazonaws.HttpMethod;

public interface S3Service {
    void savePersonalVideo(PersonalVideoRequestDto dto, UserDetails userDetails) throws IOException;

	String getPresignedURL(String keyname, long expTime, HttpMethod method) throws Exception;

	List<PersonalVideoResponseDto> getPersonalPresignedURL(UserDetails userDetails) throws Exception;

	void savePersonalVideoTest(PersonalVideoRequestDto dto, UserDetails userDetails);

	void deletePersonalVideo(UserDetails userDetails, int boardIdx) throws Exception;

	boolean findPersonalVideoWithTitle(UserDetails userDetails, String boardTitle);
}
