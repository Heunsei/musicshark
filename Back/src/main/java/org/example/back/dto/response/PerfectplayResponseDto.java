package org.example.back.dto.response;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PerfectplayResponseDto {
	private int ppIdx;
	private int userIdx;
	private int songIdx;
	private int score;
	private boolean clear;
	private Timestamp date;
}
