package org.example.back.controller;

import lombok.RequiredArgsConstructor;
import org.example.back.dto.request.CommentRequestDto;
import org.example.back.dto.response.GetCommentsResponseDto;
import org.example.back.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/board/{board_idx}/comments")
@RequiredArgsConstructor
public class CommentController {

	@Autowired
	private final CommentService commentService;

	@GetMapping
	public ResponseEntity<?> getComments(@PathVariable("board_idx") int boardIdx){
		try {
			List<GetCommentsResponseDto> results = new ArrayList<>();
			results = commentService.getComments(boardIdx);
			return new ResponseEntity<>(results, HttpStatus.OK);
		} catch(Exception e){
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping
	public ResponseEntity<?> postComment(@PathVariable("board_idx") int boardIdx, @RequestBody CommentRequestDto comment){
		try {
			commentService.postComment(comment);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch(Exception e){
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping
	public ResponseEntity<?> updateComment(@PathVariable("board_idx") int boardIdx, @RequestBody CommentRequestDto comment){
		try{
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch(Exception e){
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}
}
