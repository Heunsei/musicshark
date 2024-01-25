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
		System.out.println("@@@@clear:"+perfectplayEntity.isClear());
		if(!checkPerfectplayTable(userIdx,songIdx) && perfectplayEntity.isClear()) //이미 플레이한 곡인지 확인, clear상태인지
			tierRepository.updateClearCnt(userIdx);

		return true;
	}

	private boolean checkPerfectplayTable(int userIdx, int songIdx){
		List<PerfectplayEntity> allResult = perfectplayRepository.perfectplayResult(userIdx);
		int cnt = 0;

		for (PerfectplayEntity result : allResult) {
			int oldSongIdx = result.getSongIdx();
			if(songIdx == oldSongIdx) cnt++;
		}
		System.out.println("!!!!!!!!!!!!!!cnt : " + cnt);

		if(cnt > 1) return true;
		return false;
	}

	private PerfectplayEntity convertToEntity(int userIdx, PerfectplayRequestDto perfectplayRequestDto) {
		PerfectplayEntity entity = new PerfectplayEntity();
		boolean isClear = perfectplayRequestDto.getScore() >= 80; //score 80점 넘으면 clear=true
		entity.setUserIdx(userIdx);
		entity.setSongIdx(perfectplayRequestDto.getSongIdx());
		entity.setScore(perfectplayRequestDto.getScore());
		entity.setClear(isClear);
		return entity;
	}
}
