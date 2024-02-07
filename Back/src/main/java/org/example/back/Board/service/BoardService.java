package org.example.back.Board.service;

import java.util.List;

import org.example.back.Board.dto.request.PostBoardRequestDto;
import org.example.back.Board.entity.BoardEntity;
import org.springframework.security.core.userdetails.UserDetails;

public interface BoardService {
	List<BoardEntity> getAllBoard();

	BoardEntity getBoard(int boardIdx);

	void deleteBoard(int boardIdx, UserDetails userDetails) throws Exception;

	void postBoard(PostBoardRequestDto boardDto);

	void updateBoard(int boardIdx, PostBoardRequestDto boardDto);

	List<BoardEntity> getUserBoard(String nickname);
}
