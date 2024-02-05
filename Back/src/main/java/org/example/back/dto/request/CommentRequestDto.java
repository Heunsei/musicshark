package org.example.back.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentRequestDto {
    @JsonProperty("board_idx")
    int boardIdx;

    @JsonProperty("comment_content")
    String commentContent;

    @JsonProperty("user_nickname")
    String userNickname;
}
