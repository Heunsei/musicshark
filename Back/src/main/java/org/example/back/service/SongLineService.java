package org.example.back.service;

import java.util.List;

import org.example.back.dto.response.SongLineResponseDto;

public interface SongLineService {
	List<SongLineResponseDto> getAllSongLineById (int songIdx);
}
