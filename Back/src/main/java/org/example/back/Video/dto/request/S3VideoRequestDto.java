package org.example.back.Video.dto.request;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class S3VideoRequestDto {
	@NotBlank
	@JsonProperty("video_title")
	public String videoTitle;

	@NotBlank
	@JsonProperty("video_file")
	public MultipartFile videoFile;
}
