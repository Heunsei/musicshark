package org.example.back.Board.service.implementation;

import java.util.List;

import org.example.back.Board.dto.request.PostBoardRequestDto;
import org.example.back.Board.entity.BoardEntity;
import org.example.back.User.entity.UserEntity;
import org.example.back.Board.repository.BoardRepository;
import org.example.back.User.repository.UserRepository;
import org.example.back.Board.service.BoardService;
import org.example.back.common.ErrorCode;
import org.example.back.common.NotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

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
	public void deleteBoard(int boardIdx, UserDetails userDetails) throws Exception {
		BoardEntity board = boardRepository.findByBoardIdx(boardIdx).orElseThrow(() -> new NullPointerException("잘못된 접근입니다."));
		UserEntity writer = userRepository.findByUserEmail(userDetails.getUsername()).orElseThrow(() -> new NotFoundException(
			ErrorCode.USER_NOT_FOUND));

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
	@Override
	public List<BoardEntity> getUserBoard(String nickname) {
		UserEntity user = userRepository.findByNickname(nickname);
		List<BoardEntity> result =
			boardRepository.findByUserIdxAndBoardDeleted(user.getUserIdx(), false)
				.orElseThrow(() -> new NullPointerException("찾을 수 없습니다."));


		return result;
	}
}