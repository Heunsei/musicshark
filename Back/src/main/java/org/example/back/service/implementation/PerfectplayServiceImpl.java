package org.example.back.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.example.back.dto.request.PerfectplayRequestDto;
import org.example.back.dto.response.PerfectplayResponseDto;
import org.example.back.entity.PerfectplayEntity;
import org.example.back.entity.TierEntity;
import org.example.back.repository.PerfectplayRepository;
import org.example.back.repository.TierRepository;
import org.example.back.service.PerfectplayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PerfectplayServiceImpl implements PerfectplayService {

	@Autowired
	PerfectplayRepository perfectplayRepository;

	@Autowired
	TierRepository tierRepository;

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

		perfectplayRepository.save(perfectplayEntity);

		int songIdx = perfectplayEntity.getSongIdx();
		if(!checkPerfectplayTable(userIdx,songIdx)) //이미 플레이한 곡인지 확인
			updateTierClearCount(userIdx); //tier테이블의 clearCnt+1

		return true;
	}

	private boolean checkPerfectplayTable(int userIdx, int songIdx){
		List<PerfectplayEntity> allResult = perfectplayRepository.perfectplayResult(userIdx);
		int cnt = 0;

		for (PerfectplayEntity result : allResult) {
			int oldSongIdx = result.getSongIdx();
			if(songIdx == oldSongIdx) cnt++;
		}

		if(cnt > 1) return true;
		return false;
	}
	private void updateTierClearCount(int userIdx) {
		TierEntity tierEntity = tierRepository.findByUserIdx(userIdx);

		if (tierEntity != null) {
			tierEntity.setClearCnt(tierEntity.getClearCnt() + 1);
			tierRepository.save(tierEntity);
		}
		// songIdx에 해당하는 Tier 엔터티가 없는 경우 예외 처리
	}

	private PerfectplayEntity convertToEntity(int userIdx, PerfectplayRequestDto perfectplayRequestDto) {
		boolean isClear = perfectplayRequestDto.getScore() >= 80; //score 80점 넘으면 clear=true

		PerfectplayEntity entity = new PerfectplayEntity();
		entity.setUserIdx(userIdx);
		entity.setSongIdx(perfectplayRequestDto.getSongIdx());
		entity.setScore(perfectplayRequestDto.getScore());
		entity.setClear(isClear);
		return entity;
	}
}
