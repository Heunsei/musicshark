package org.example.back.service;

import java.util.List;

import org.example.back.dto.request.PerfectplayRequestDto;
import org.example.back.dto.response.PerfectplayResponseDto;
import org.example.back.entity.PerfectplayEntity;

public interface PerfectplayService {
	List<PerfectplayResponseDto> perfectplayResult(int userIdx);
	PerfectplayEntity createPerfectplayResult(int userIdx, PerfectplayRequestDto perfectplayRequestDto);
}
