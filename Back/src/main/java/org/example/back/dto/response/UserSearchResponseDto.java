package org.example.back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserSearchResponseDto {
	private int userIdx;
	private String emailOrNickname;
	private String profileImage;
}
