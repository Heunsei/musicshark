package org.example.back.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SongDto {
	private int songIdx;
	private String title;
	private String singer;


	public SongDto(int songIdx, String title, String singer) {
		this.songIdx = songIdx;
		this.title = title;
		this.singer = singer;
	}
}
