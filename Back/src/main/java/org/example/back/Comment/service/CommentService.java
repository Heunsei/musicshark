package org.example.back.Comment.service;

import java.util.List;

import org.example.back.Comment.dto.request.PostCommentRequestDto;
import org.example.back.Comment.dto.request.PutCommentRequestDto;
import org.example.back.Comment.dto.response.GetCommentsResponseDto;
import org.springframework.security.core.userdetails.UserDetails;

public interface CommentService {
	List<GetCommentsResponseDto> getComments(int boardIdx);

	void postComment(int boardIdx, PostCommentRequestDto comment);

	void updateComment(UserDetails userDetails, PutCommentRequestDto comment) throws Exception;

	void deleteComment(int commentIdx, UserDetails userDetails) throws Exception;
}
