package org.example.back.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.example.back.dto.response.SongResponseDto;
import org.example.back.entity.SongEntity;
import org.example.back.repository.SongRepository;
import org.example.back.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SongServiceImpl implements SongService {

	@Autowired
	SongRepository songRepository;

	//전체 음악 조회
	@Override
	public List<SongResponseDto> findAllSong() {
		List<SongEntity> allSong = songRepository.findAllSong();

		List<SongResponseDto> songLineDtos = new ArrayList<>();
		for (SongEntity song : allSong) {
			SongResponseDto songResponseDto = new SongResponseDto(
				song.getSongIdx(),
				song.getTitle(),
				song.getSinger()
			);
			songLineDtos.add(songResponseDto);
		}
		return songLineDtos;
	}
	//음악 선택 시 엠알 조회
}