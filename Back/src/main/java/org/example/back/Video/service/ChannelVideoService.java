package org.example.back.Video.service;

import org.example.back.Video.dto.request.ChannelVideoRequestDto;
import org.example.back.Video.dto.response.ChannelVideoResponseDto;
import org.example.back.Video.dto.response.SearchVideoResponseDto;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.IOException;
import java.util.List;

public interface ChannelVideoService {
    List<ChannelVideoResponseDto> getVideos(UserDetails userDetails, int channelIdx) throws Exception;

    void saveVideo(int channelIdx, UserDetails userDetails, ChannelVideoRequestDto video) throws Exception;

    void deleteVideo(int channelIdx, UserDetails userDetails, int videoIdx) throws Exception;

    List<SearchVideoResponseDto> searchVideo(UserDetails userDetails, int channelIdx, String videoTitle) throws Exception;
}
