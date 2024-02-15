package org.example.back.PerfectPlay.service.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.example.back.PerfectPlay.dto.request.PerfectplayRequestDto;
import org.example.back.PerfectPlay.dto.response.PerfectplayResponseDto;
import org.example.back.PerfectPlay.entity.PerfectplayEntity;
import org.example.back.PerfectPlay.entity.SongEntity;
import org.example.back.PerfectPlay.repository.SongRepository;
import org.example.back.User.entity.TierEntity;
import org.example.back.PerfectPlay.repository.PerfectplayRepository;
import org.example.back.User.entity.UserEntity;
import org.example.back.User.repository.TierRepository;
import org.example.back.PerfectPlay.service.PerfectplayService;
import org.example.back.User.repository.UserRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PerfectplayServiceImpl implements PerfectplayService {

	private final UserRepository userRepository;
	private final PerfectplayRepository perfectplayRepository;
	private final TierRepository tierRepository;
	private final SongServiceImpl songServiceImpl;

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
				result.getDate(),
				getTotalClear(allResult) //총 클리어한 곡 수
			);
			perfectplayResponseDtos.add(perfectplayResponseDto);
		}
		return perfectplayResponseDtos;
	}

	// 퍼펙트플레이 기록 저장
	@Override
	public PerfectplayEntity createPerfectplayResult(int userIdx, PerfectplayRequestDto perfectplayRequestDto) {
		SongEntity song = songServiceImpl.getSongById(perfectplayRequestDto.getSongIdx());
		PerfectplayEntity perfectplayEntity = convertToEntity(userIdx, song, perfectplayRequestDto);

		perfectplayRepository.save(perfectplayEntity);

		//클리어한 곡 수 증가
		int songIdx = perfectplayEntity.getSongIdx();
		if(!checkPerfectplayTable(userIdx,songIdx) && perfectplayEntity.isClear()) {
				tierRepository.updateClearCnt(userIdx);
		}

		//티어 업데이트
		Optional<TierEntity> tierEntity = tierRepository.findById(userIdx);
		if(tierEntity.isPresent()){
			double getAverageScore = perfectplayRepository.findByUserIdxToAvgScore(userIdx);
			int playCount = perfectplayRepository.getCountToUserIdx(userIdx);
			String nextTier = changeTier(getAverageScore, playCount);
			tierRepository.updateTier(userIdx, nextTier);
			// int clearCnt = tierEntity.get().getClearCnt();
			// if(clearCnt == 6 || clearCnt == 11 || clearCnt == 16 || clearCnt == 21 ) {
			// 	String curTier = tierEntity.get().getUserTier();
			// 	String nextTier = fineNextTier(curTier);
			// 	tierRepository.updateTier(userIdx, nextTier);
			// }
		}

		return perfectplayEntity;
	}

	@Override
	public int getPlayCount(int userIdx) {
		return perfectplayRepository.getCountToUserIdx(userIdx);
	}

	@Override
	public double getAvgScore(int userIdx) {
		return perfectplayRepository.findByUserIdxToAvgScore(userIdx);
	}

	@Override
	public int getClearSongCount(int userIdx) throws Exception {
		UserEntity user = userRepository.findByUserIdx(userIdx);
		return perfectplayRepository.getClearSongCount(user.getUserIdx());
	}


	private String fineNextTier(String curTier) {
		//bronze면 silver 반환
		//silver면 gold 반환
		if(curTier.equals("bronze")) return "silver";
		else if(curTier.equals("silver")) return "gold";
		else if(curTier.equals("gold")) return "platinum";
		else
			return "diamond";
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

	private PerfectplayEntity convertToEntity(int userIdx, SongEntity song, PerfectplayRequestDto perfectplayRequestDto) {
		PerfectplayEntity entity = new PerfectplayEntity();

		boolean isClear = perfectplayRequestDto.getScore() >= 60; //score 60점 넘으면 clear=true
		entity.setUserIdx(userIdx);
		entity.setSongIdx(song.getSongIdx());
		entity.setScore(perfectplayRequestDto.getScore());
		entity.setClear(isClear);
		return entity;
	}
	private int getTotalClear(List<PerfectplayEntity> allResult) {
		int cnt = 0;
		for (PerfectplayEntity result : allResult) {
			if(result.isClear()) cnt++;
		}
		return cnt;
	}

	// 평균 점수를 이용하여 score 계산
	private String changeTier(double score, int playCount) {
		if (playCount < 5 || score < 15)
			return "bronze"; // 0~14.99..
		else if (score < 35)
			return "silver"; // 15~34.99..
		else if (score < 65)
			return "gold"; // 35~64.99
		else if (score < 75)
			return "platinum";
		else
			return "diamond";
	}
}