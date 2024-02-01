package org.example.back.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.example.back.common.ErrorCode;
import org.example.back.common.NotFoundException;
import org.example.back.dto.response.SongLineResponseDto;
import org.example.back.entity.SongEntity;
import org.example.back.entity.SongLineEntity;
import org.example.back.repository.SongLineRepository;
import org.example.back.repository.SongRepository;
import org.example.back.service.SongLineService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SongLineServiceImpl implements SongLineService {

	private final SongLineRepository songLineRepository;
	private final SongRepository songRepository;

	public List<SongLineResponseDto> getAllSongLineById (int songIdx) {
		SongEntity song = songRepository.findById(songIdx).orElseThrow(() -> new NotFoundException(
			ErrorCode.SONG_NOT_FOUND));
		List<SongLineEntity> allBySongEntityOrderByStartTimeAsc = songLineRepository.findAllBySongEntityOrderByStartTimeAsc(song);

		List<SongLineResponseDto> songLineResponseDtoList = allBySongEntityOrderByStartTimeAsc.stream()
			.map(songLine -> SongLineResponseDto.builder().startNode(
					songLine.getStartNode()).endNode(songLine.getEndNode())
				.startTime(songLine.getStartTime()).endTime(songLine.getEndTime()).build()).collect(
				Collectors.toList());

		return songLineResponseDtoList;
	}
}
