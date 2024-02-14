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
<<<<<<< HEAD
	//@JsonProperty("board_title")
	String boardTitle;

	@NotBlank
	//@JsonProperty("board_content")
=======
//	@JsonProperty("board_title")
	String boardTitle;

	@NotBlank
//	@JsonProperty("board_content")
>>>>>>> 1d38ea5ad40255382dc40126a13a0fbdc1f51073
	String boardContent;
}
