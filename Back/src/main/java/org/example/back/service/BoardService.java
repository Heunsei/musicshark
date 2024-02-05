package org.example.back.service;

import java.util.List;

import org.example.back.dto.response.GetAllBoardResponseDto;
import org.example.back.entity.BoardEntity;

public interface BoardService {
	List<BoardEntity> getAllBoard();
}
