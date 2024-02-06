package org.example.back.PerfectPlay.service;

import java.util.List;

import org.example.back.PerfectPlay.dto.response.SongResponseDto;
import org.example.back.PerfectPlay.entity.SongEntity;

public interface SongService {
	List<SongResponseDto> findAllSong();
	SongEntity getSongById(int songIdx);
}
