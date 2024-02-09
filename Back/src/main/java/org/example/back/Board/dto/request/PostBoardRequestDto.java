package org.example.back.Board.dto.request;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostBoardRequestDto {
	@NotBlank
	@JsonProperty("board_title")
	String boardTitle;

	@NotBlank
	@JsonProperty("board_content")
	String boardContent;
}
