package org.example.back.service.implementation;

import java.util.List;
import java.util.Optional;

import org.apache.catalina.User;
import org.example.back.common.ApiResponse;
import org.example.back.dto.request.PostBoardRequestDto;
import org.example.back.dto.response.GetAllBoardResponseDto;
import org.example.back.entity.BoardEntity;
import org.example.back.entity.UserEntity;
import org.example.back.repository.BoardRepository;
import org.example.back.repository.UserRepository;
import org.example.back.service.BoardService;
import org.springframework.stereotype.Service;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

	private final BoardRepository boardRepository;
	private final UserRepository userRepository;

	@Override
	public List<BoardEntity> getAllBoard() {
		return boardRepository.findAllByBoardDeleted(false);
	}

	@Override
	public BoardEntity getBoard(int boardIdx) {
		return boardRepository.findByBoardIdxAndBoardDeleted(boardIdx, false);
	}

	@Override
	public void deleteBoard(int boardIdx, String nickname) throws Exception {
		BoardEntity board = boardRepository.findByBoardIdx(boardIdx).orElseThrow(() -> new NullPointerException("잘못된 접근입니다."));
		UserEntity writer = userRepository.findByNickname(nickname);

		if(board.getUserIdx() == writer.getUserIdx()) {
			board.setBoardDeleted(true);
			boardRepository.save(board);
		}
		else {
			throw new Exception("잘못된 접근입니다.");
		}
	}

	@Override
	public void postBoard(PostBoardRequestDto boardDto) {
		UserEntity writer = userRepository.findByNickname(boardDto.getUserNickname());
		BoardEntity data = new BoardEntity();

		data.setBoardTitle(boardDto.getBoardTitle());
		data.setBoardContent(boardDto.getBoardContent());
		data.setUserIdx(writer.getUserIdx());

		boardRepository.save(data);
	}

	@Override
	public void updateBoard(int boardIdx, PostBoardRequestDto boardDto) {
		BoardEntity board =
			boardRepository.findByBoardIdx(boardIdx)
			.orElseThrow(() -> new NullPointerException("잘못된 접근입니다."));

		UserEntity writer = userRepository.findByNickname(boardDto.getUserNickname());

		if(writer.getUserIdx() == board.getUserIdx()) {
			board.setBoardTitle(boardDto.getBoardTitle());
			board.setBoardContent(boardDto.getBoardContent());

			boardRepository.save(board);
		}
	}
}