package org.example.back.service;

import java.util.List;

import org.example.back.dto.request.CommentRequestDto;
import org.example.back.dto.response.GetCommentsResponseDto;

public interface CommentService {
	List<GetCommentsResponseDto> getComments(int boardIdx);

	void postComment(CommentRequestDto comment);
}
