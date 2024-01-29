package org.example.back.service.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
	public PerfectplayEntity createPerfectplayResult(int userIdx, PerfectplayRequestDto perfectplayRequestDto) {
		PerfectplayEntity perfectplayEntity = convertToEntity(userIdx, perfectplayRequestDto);

		perfectplayRepository.save(perfectplayEntity);

		//최초 클리어면 티어 테이블 생성
		if(checkFirstClear(userIdx)&& perfectplayEntity.isClear()){
			TierEntity newTierEntity = new TierEntity();
			newTierEntity.setUserIdx(userIdx);
			newTierEntity.setClearCnt(1);
			newTierEntity.setUserTier("bronze");

			tierRepository.save(newTierEntity);
			return perfectplayEntity;
		}

		//클리어한 곡 수 증가
		int songIdx = perfectplayEntity.getSongIdx();
		if(!checkPerfectplayTable(userIdx,songIdx) && perfectplayEntity.isClear()) {
				tierRepository.updateClearCnt(userIdx);
		}

		//티어 업데이트
		Optional<TierEntity> tierEntity = tierRepository.findById(userIdx);
		if(tierEntity.isPresent()){
			int clearCnt = tierEntity.get().getClearCnt();
			if(clearCnt == 4 || clearCnt == 11) {
				String curTier = tierEntity.get().getUserTier();
				String nextTier = fineNextTier(curTier);
				tierRepository.updateTier(userIdx, nextTier);
			}
		}

		return perfectplayEntity;
	}
	private boolean checkFirstClear(int userIdx){
		Optional<TierEntity> tierEntity = tierRepository.findById(userIdx);

		if(tierEntity.isPresent()) return false;
		return true;
	}
	private String fineNextTier(String curTier) {
		//bronze면 silver 반환
		//silver면 gold 반환
		if(curTier.equals("bronze")) return "silver";
		return "gold";
	}
	private boolean checkClearCnt(int userIdx) {
		Optional<TierEntity> tierEntity = tierRepository.findById(userIdx);

		int clearCnt = tierEntity.get().getClearCnt();
		if(clearCnt == 4 || clearCnt == 11) return true;
		return false;
	}
	private boolean checkPerfectplayTable(int userIdx, int songIdx){//플레이한 적 있으면 true반환
		List<PerfectplayEntity> allResult = perfectplayRepository.perfectplayResult(userIdx);
		int cnt = 0;

		for (PerfectplayEntity result : allResult) {
			int oldSongIdx = result.getSongIdx();
			if(songIdx == oldSongIdx) cnt++;
		}
		return cnt > 1;
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