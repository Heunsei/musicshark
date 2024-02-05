package org.example.back.service;

import java.util.List;

import org.example.back.dto.request.PostBoardRequestDto;
import org.example.back.dto.response.GetAllBoardResponseDto;
import org.example.back.entity.BoardEntity;

public interface BoardService {
	List<BoardEntity> getAllBoard();

	BoardEntity getBoard(int boardIdx);

	void deleteBoard(int boardIdx, String nickname) throws Exception;

	void postBoard(PostBoardRequestDto boardDto);

	void updateBoard(int boardIdx, PostBoardRequestDto boardDto);
}
