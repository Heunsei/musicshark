package org.example.back.Board.dto.response;

import java.sql.Timestamp;

import org.example.back.Board.entity.BoardEntity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class GetAllBoardResponseDto {
	private int boardIdx;
	private int userIdx;
	private String boardTitle;
	private String boardContent;
	private int boardCount;
	private Timestamp boardDate;

	public GetAllBoardResponseDto(BoardEntity boardEntity){
		this.boardIdx = boardEntity.getBoardIdx();
		this.userIdx = boardEntity.getUserIdx();
		this.boardTitle = boardEntity.getBoardTitle();
		this.boardContent = boardEntity.getBoardContent();
		this.boardCount = boardEntity.getBoardCount();
		this.boardDate = boardEntity.getBoardDate();
	}
}
