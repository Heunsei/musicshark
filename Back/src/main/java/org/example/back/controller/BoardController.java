package org.example.back.controller;

import java.util.ArrayList;
import java.util.List;

import org.example.back.dto.response.GetAllBoardResponseDto;
import org.example.back.entity.BoardEntity;
import org.example.back.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
}
