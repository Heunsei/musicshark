package org.example.back.Comment.controller;

import lombok.RequiredArgsConstructor;
import org.example.back.Comment.dto.request.PostCommentRequestDto;
import org.example.back.Comment.dto.request.PutCommentRequestDto;
import org.example.back.Comment.dto.response.GetCommentsResponseDto;
import org.example.back.Comment.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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
	public ResponseEntity<?> postComment(@PathVariable("board_idx") int boardIdx, @RequestBody PostCommentRequestDto comment){
		try {
			commentService.postComment(boardIdx, comment);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch(Exception e){
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping()
	public ResponseEntity<?> updateComment(
		@PathVariable("board_idx") int boardIdx,
		@AuthenticationPrincipal UserDetails userDetails,
		@RequestBody PutCommentRequestDto comment){
		try{
			commentService.updateComment(userDetails, comment);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch(Exception e){
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}

	@PatchMapping("/{comment_idx}")
	public ResponseEntity<Void> deleteComment(
		@PathVariable("board_idx") int boardIdx, @PathVariable("comment_idx") int commentIdx,
		@AuthenticationPrincipal UserDetails userDetails){
		try{
			commentService.deleteComment(commentIdx, userDetails);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch(Exception e){
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}
}
