package org.example.back.Video.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class ChannelVideoRequestDto {
    private String videoTitle;
    private MultipartFile videoFile;
}
