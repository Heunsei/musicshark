package org.example.back.Video.dto.request;

import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonalVideoRequestDto {
	private String videoTitle;
	private MultipartFile videoFile;
}
