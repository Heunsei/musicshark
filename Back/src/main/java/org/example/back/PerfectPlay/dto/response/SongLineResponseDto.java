package org.example.back.PerfectPlay.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class SongLineResponseDto {

	private Long startNode;
	private Long endNode;
	private Long startTime;
	private Long endTime;

	@Builder
	public SongLineResponseDto(Long startNode, Long endNode, Long startTime, Long endTime) {
		this.startNode = startNode;
		this.endNode = endNode;
		this.startTime = startTime;
		this.endTime = endTime;
	}
}