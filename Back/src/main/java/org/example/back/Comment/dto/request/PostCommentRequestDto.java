package org.example.back.Comment.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostCommentRequestDto {
    @JsonProperty("comment_content")
    String commentContent;

    @JsonProperty("user_nickname")
    String userNickname;
}
