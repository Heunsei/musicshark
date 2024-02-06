package org.example.back.Video.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class UserVideoRequestDto {
	private String nickname;
	private String video_title;
	private MultipartFile video_file;
}
