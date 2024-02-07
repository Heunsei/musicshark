package org.example.back.Video.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PersonalVideoResponseDto {
	private int videoIdx;
	private String videoTitle;
	private String PersignedURL;
}
