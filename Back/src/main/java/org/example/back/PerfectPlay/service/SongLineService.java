package org.example.back.PerfectPlay.service;

import java.util.List;

import org.example.back.PerfectPlay.dto.response.SongLineResponseDto;

public interface SongLineService {
	List<SongLineResponseDto> getAllSongLineById (int songIdx);
}
