package org.example.back.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.example.back.dto.request.PerfectplayRequestDto;
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
	public List<PerfectplayResponseDto> perfectplayResult(int userIdx) {

		List<PerfectplayEntity> allResult = perfectplayRepository.perfectplayResult(userIdx);

		List<PerfectplayResponseDto> perfectplayResponseDtos = new ArrayList<>();
		for (PerfectplayEntity result : allResult) {
			PerfectplayResponseDto perfectplayResponseDto = new PerfectplayResponseDto(
				result.getPpIdx(),
				result.getUserIdx(),
				result.getSong().getSongIdx(),
				result.getSong().getTitle(),
				result.getSong().getSinger(),
				result.getScore(),
				result.isClear(),
				result.getDate()
			);
			perfectplayResponseDtos.add(perfectplayResponseDto);
		}
		return perfectplayResponseDtos;
	}

	// 퍼펙트플레이 기록 저장
	@Override
	public boolean createPerfectplayResult(int userIdx, PerfectplayRequestDto perfectplayRequestDto) {
		PerfectplayEntity perfectplayEntity = convertToEntity(userIdx, perfectplayRequestDto);
		if(perfectplayEntity == null) return false;
		else{
			perfectplayRepository.save(perfectplayEntity);
			return true;
		}
	}

	private PerfectplayEntity convertToEntity(int userIdx, PerfectplayRequestDto perfectplayRequestDto) {
		PerfectplayEntity entity = new PerfectplayEntity();
		entity.setUserIdx(userIdx);
		entity.setSongIdx(perfectplayRequestDto.getSongIdx());
		entity.setScore(perfectplayRequestDto.getScore());
		entity.setClear(perfectplayRequestDto.isClear());
		return entity;
	}
}
