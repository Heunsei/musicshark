package org.example.back.Board.controller;

import java.util.List;

import org.example.back.Board.dto.request.PostBoardRequestDto;
import org.example.back.Board.entity.BoardEntity;
import org.example.back.Board.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

	@Autowired
	private final BoardService boardService;

	@GetMapping
	public ResponseEntity<List<BoardEntity>> getAllBoard(){
		List<BoardEntity> results = boardService.getAllBoard();
		return new ResponseEntity<List<BoardEntity>>(results, HttpStatus.OK);
	}

	@GetMapping("/user/{user_nickname}")
	public ResponseEntity<?> getUserBoard(@PathVariable("user_nickname") String nickname) {
		try {
			List<BoardEntity> list = boardService.getUserBoard(nickname);
			return new ResponseEntity<List<BoardEntity>>(list, HttpStatus.OK);
		} catch(Exception e){
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{board_idx}")
	public ResponseEntity<?> getBoard(@PathVariable("board_idx") int board_idx){
		try {
			BoardEntity result = boardService.getBoard(board_idx);
			return new ResponseEntity<BoardEntity>(result, HttpStatus.OK);
		}
		catch(Exception e){
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping
	public ResponseEntity<Void> registBoard(@RequestBody PostBoardRequestDto boardDto){
		try {
			boardService.postBoard(boardDto);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (Exception e){
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/{board_idx}")
	public ResponseEntity<Void> updateBoard(@PathVariable("board_idx") int board_idx, @RequestBody PostBoardRequestDto boardDto){
		try{
			boardService.updateBoard(board_idx, boardDto);
			return new ResponseEntity<Void>(HttpStatus.ACCEPTED);
		} catch(Exception e){
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/{board_idx}/{nickname}")
	public ResponseEntity<Void> deleteBoard(@PathVariable("board_idx") int board_idx, @AuthenticationPrincipal
		UserDetails userDetails){
		try{
			boardService.deleteBoard(board_idx, userDetails);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (Exception e){
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}
}
