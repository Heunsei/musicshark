package org.example.back.Video.service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.example.back.Video.dto.request.PersonalVideoRequestDto;
import org.example.back.Video.dto.response.PersonalVideoResponseDto;
import org.example.back.Video.dto.response.SearchVideoResponseDto;
import org.springframework.security.core.userdetails.UserDetails;

public interface PersonalVideoService {
    void saveVideo(PersonalVideoRequestDto dto, UserDetails userDetails) throws IOException;

	List<PersonalVideoResponseDto> getPresignedURL(UserDetails userDetails) throws Exception;

	void deleteVideo(UserDetails userDetails, int boardIdx) throws Exception;

	boolean findVideoWithTitle(UserDetails userDetails, String boardTitle);

	List<SearchVideoResponseDto> searchVideo(UserDetails userDetails, String videoTitle) throws Exception;

	List<PersonalVideoResponseDto> searchVideowithDate(UserDetails userDetails, LocalDate localDate) throws Exception;
}
