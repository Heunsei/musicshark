package org.example.back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SongResponseDto {
	private int songIdx;
	private String title;
	private String singer;
}
