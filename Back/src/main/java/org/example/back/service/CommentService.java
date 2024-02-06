package org.example.back.service;

import java.util.List;

import org.example.back.dto.request.comment.PostCommentRequestDto;
import org.example.back.dto.request.comment.PutCommentRequestDto;
import org.example.back.dto.response.comment.GetCommentsResponseDto;
import org.springframework.security.core.userdetails.UserDetails;

public interface CommentService {
	List<GetCommentsResponseDto> getComments(int boardIdx);

	void postComment(int boardIdx, PostCommentRequestDto comment);

	void updateComment(UserDetails userDetails, PutCommentRequestDto comment) throws Exception;

	void deleteComment(int commentIdx, UserDetails userDetails) throws Exception;
}
