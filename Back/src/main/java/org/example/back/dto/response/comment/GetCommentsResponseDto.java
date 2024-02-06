package org.example.back.dto.response.comment;

import java.sql.Timestamp;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.example.back.entity.CommentEntity;

@Data
@Getter
@Setter
public class GetCommentsResponseDto {
	int commentIdx;
	String commentContent;
	Timestamp commentDate;
	String userNickname;

	public GetCommentsResponseDto(CommentEntity entity){
		this.commentIdx = entity.getCommentIdx();
		this.commentContent = entity.getCommentContent();
		this.commentDate = entity.getCommentDate();
	}
}
