package org.example.back.PerfectPlay.dto.request;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PerfectplayRequestDto {
	private int songIdx;
	private float score;
}
