package org.example.back.dto.request.comment;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PutCommentRequestDto {
	@JsonProperty("comment_idx")
	int commentIdx;

	@JsonProperty("comment_content")
	String commentContent;

	@JsonProperty("user_nickname")
	String userNickname;
}
