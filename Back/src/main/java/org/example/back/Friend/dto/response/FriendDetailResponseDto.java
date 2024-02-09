package org.example.back.Friend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FriendDetailResponseDto {
	private int userIdx;
	private String nickName;
	private String email;
	private String profileImage;
	private String userTier;
	private int clearCnt;
}
