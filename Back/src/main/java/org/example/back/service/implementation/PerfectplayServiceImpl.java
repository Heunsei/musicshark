package org.example.back.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.example.back.dto.response.PerfectplayResponseDto;
import org.example.back.entity.PerfectplayEntity;
import org.example.back.repository.PerfectplayRepository;
import org.example.back.service.PerfectplayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PerfectplayServiceImpl implements PerfectplayService {

	@Autowired
	PerfectplayRepository perfectplayRepository;

	// 퍼펙트플레이 기록 조회
	@Override
	public List<PerfectplayResponseDto> perfectplayResult() {
		List<PerfectplayEntity> allResult = perfectplayRepository.perfectplayResult();

		List<PerfectplayResponseDto> perfectplayResponseDtos = new ArrayList<>();
		for (PerfectplayEntity result : allResult) {
			PerfectplayResponseDto perfectplayResponseDto = new PerfectplayResponseDto(
				result.getPpIdx(),
				result.getUserIdx(),
				result.getSongIdx(),
				result.getScore(),
				result.isClear(),
				result.getDate()
			);
			perfectplayResponseDtos.add(perfectplayResponseDto);
		}
		return perfectplayResponseDtos;
	}
	// 퍼펙트플레이 기록 저장
}
