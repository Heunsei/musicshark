package org.example.back.KaKao.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class KakaoLoginResponse {
	private boolean isKakao;
	private String email;
}
