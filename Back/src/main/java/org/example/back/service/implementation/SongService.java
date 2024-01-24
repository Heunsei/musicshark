package org.example.back.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.example.back.dto.request.SongDto;
import org.example.back.entity.SongEntity;
import org.example.back.repository.SongRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SongService {
	private final SongRepository songRepository;

	public List<SongDto> findAllSong() {
		List<SongEntity> allSong = songRepository.findAllSong();

		List<SongDto> songLineDtos = new ArrayList<>();
		for (SongEntity song : allSong) {
			SongDto songDto = new SongDto(
				song.getSongIdx(),
				song.getTitle(),
				song.getSinger()
			);
			songLineDtos.add(songDto);
		}
		return songLineDtos;
	}
}