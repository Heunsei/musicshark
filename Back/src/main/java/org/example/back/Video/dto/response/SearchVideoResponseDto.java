package org.example.back.Video.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class SearchVideoResponseDto {
    private LocalDate videoDate;
    private String videoTitle;
    private String preSignedURL;
}
