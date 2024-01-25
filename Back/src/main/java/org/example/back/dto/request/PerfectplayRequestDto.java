package org.example.back.dto.request;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PerfectplayRequestDto {
	private int userIdx;
	private int songIdx;
	private int score;
	private boolean clear;
}
