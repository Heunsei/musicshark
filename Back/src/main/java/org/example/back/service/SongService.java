package org.example.back.service;

import java.util.List;

import org.example.back.dto.response.SongResponseDto;
import org.example.back.entity.SongEntity;
import org.springframework.transaction.annotation.Transactional;

public interface SongService {
	List<SongResponseDto> findAllSong();
	SongEntity getSongById(int songIdx);
}
