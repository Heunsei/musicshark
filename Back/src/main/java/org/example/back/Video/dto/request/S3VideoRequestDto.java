package org.example.back.Video.dto.request;

import javax.validation.constraints.NotBlank;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class S3VideoRequestDto {
	@NotBlank
	public String videoTitle;

	@NotBlank
	public MultipartFile videoFile;
}
