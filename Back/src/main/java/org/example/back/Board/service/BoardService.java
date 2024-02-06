package org.example.back.Board.service;

import java.util.List;

import org.example.back.Board.dto.request.PostBoardRequestDto;
import org.example.back.Board.entity.BoardEntity;

public interface BoardService {
	List<BoardEntity> getAllBoard();

	BoardEntity getBoard(int boardIdx);

	void deleteBoard(int boardIdx, String nickname) throws Exception;

	void postBoard(PostBoardRequestDto boardDto);

	void updateBoard(int boardIdx, PostBoardRequestDto boardDto);
}
