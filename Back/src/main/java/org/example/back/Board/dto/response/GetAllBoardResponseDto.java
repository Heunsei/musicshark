package org.example.back.Board.dto.response;

import java.sql.Timestamp;

import org.example.back.Board.entity.BoardEntity;
import org.example.back.User.entity.UserEntity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class GetAllBoardResponseDto {
	private int boardIdx;
	private String userNickname;
	private String boardTitle;
	private String boardContent;
	private int boardCount;
	private String boardDate;

	public GetAllBoardResponseDto(BoardEntity boardEntity, UserEntity userEntity){
		this.boardIdx = boardEntity.getBoardIdx();
		this.userNickname = userEntity.getNickname();
		this.boardTitle = boardEntity.getBoardTitle();
		this.boardContent = boardEntity.getBoardContent();
		this.boardCount = boardEntity.getBoardCount();
		this.boardDate = boardEntity.getBoardDate().toString();
	}
}
