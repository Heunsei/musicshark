package org.example.back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SongLineResponseDto {

	private Long startNode;
	private Long endNode;
	private Long startTime;
	private Long endTime;
}