package org.example.back.service.implementation;

import java.util.List;

import org.example.back.dto.response.GetAllBoardResponseDto;
import org.example.back.entity.BoardEntity;
import org.example.back.repository.BoardRepository;
import org.example.back.service.BoardService;
import org.springframework.stereotype.Service;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

	private final BoardRepository boardRepository;
	@Override
	public List<BoardEntity> getAllBoard() {
		return boardRepository.findAllByBoardDeleted(false);
	}
}