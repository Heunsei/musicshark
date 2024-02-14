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
	String boardTitle;

	@NotBlank
	String boardContent;
}
