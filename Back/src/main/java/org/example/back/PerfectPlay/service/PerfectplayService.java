package org.example.back.PerfectPlay.service;

import java.util.List;

import org.example.back.PerfectPlay.dto.request.PerfectplayRequestDto;
import org.example.back.PerfectPlay.dto.response.PerfectplayResponseDto;
import org.example.back.PerfectPlay.entity.PerfectplayEntity;

public interface PerfectplayService {
	List<PerfectplayResponseDto> perfectplayResult(int userIdx);
	PerfectplayEntity createPerfectplayResult(int userIdx, PerfectplayRequestDto perfectplayRequestDto);
}
