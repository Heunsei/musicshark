package org.example.back.Video.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class SearchVideoResponseDto {
    @JsonProperty("video_idx")
    private int videoIdx;

    @JsonProperty("video_date")
    private LocalDate videoDate;

    @JsonProperty("video_title")
    private String videoTitle;

    @JsonProperty("presigned_url")
    private String PresignedURL;
}
