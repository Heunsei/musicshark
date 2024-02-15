package org.example.back.Board.service.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.example.back.Board.dto.request.PostBoardRequestDto;
import org.example.back.Board.dto.response.GetAllBoardResponseDto;
import org.example.back.Board.entity.BoardEntity;
import org.example.back.User.entity.UserEntity;
import org.example.back.Board.repository.BoardRepository;
import org.example.back.User.repository.UserRepository;
import org.example.back.Board.service.BoardService;
import org.example.back.common.ErrorCode;
import org.example.back.common.NotFoundException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

	private final BoardRepository boardRepository;
	private final UserRepository userRepository;

	@Override
	public List<GetAllBoardResponseDto> getAllBoard() {
		List<BoardEntity> list = boardRepository.findAllByBoardDeleted(false);
		List<GetAllBoardResponseDto> result = new ArrayList<>();

		for(BoardEntity board : list){
			UserEntity user = userRepository.findByUserIdx(board.getUserIdx());
			GetAllBoardResponseDto dto = new GetAllBoardResponseDto(board, user);
			System.out.println(dto.getBoardDate());

			result.add(dto);
		}
		return result;
	}

	@Override
	public BoardEntity getBoard(int boardIdx) {
        return boardRepository.findByBoardIdxAndBoardDeleted(boardIdx, false)
				.orElseThrow(() -> new NotFoundException(ErrorCode.BOARD_NOT_FOUND));
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
	public void postBoard(PostBoardRequestDto boardDto, UserDetails userDetails) {
		UserEntity writer = userRepository.findByUserEmail(userDetails.getUsername()).orElseThrow(() -> new NotFoundException(
			ErrorCode.USER_NOT_FOUND));
		BoardEntity data = new BoardEntity();

		data.setBoardTitle(boardDto.getBoardTitle());
		data.setBoardContent(boardDto.getBoardContent());
		data.setUserIdx(writer.getUserIdx());

		boardRepository.save(data);
	}

	@Override
	public void updateBoard(int boardIdx, PostBoardRequestDto boardDto, UserDetails userDetails) {
		BoardEntity board =
			boardRepository.findByBoardIdx(boardIdx)
			.orElseThrow(() -> new NullPointerException("잘못된 접근입니다."));

		UserEntity writer = userRepository.findByUserEmail(userDetails.getUsername()).orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

		if(writer.getUserIdx() == board.getUserIdx()) {
			board.setBoardTitle(boardDto.getBoardTitle());
			board.setBoardContent(boardDto.getBoardContent());

			boardRepository.save(board);
		}
	}

	@Override
	public void countUp(int boardIdx) {
		BoardEntity board = boardRepository.findByBoardIdxAndBoardDeleted(boardIdx, false)
				.orElseThrow(() -> new NotFoundException(ErrorCode.BOARD_NOT_FOUND));

		board.setBoardCount(board.getBoardCount() + 1);
		boardRepository.save(board);
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