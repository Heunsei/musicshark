package org.example.back.service;

import org.example.back.common.ApiResponse;
import org.example.back.dto.request.PatchChannelRequestDto;
import org.example.back.dto.request.PostChannelRequestDto;
import org.example.back.dto.response.*;

import java.util.List;

public interface ChannelService {

    ApiResponse<PostChannelResponseDto> postChannel(String userEmail, PostChannelRequestDto dto);
    ApiResponse<GetChannelListResponseDto> getChannelList();
    ApiResponse<GetChannelResponseDto> getChannel(int channelIdx);
    ApiResponse<PatchChannelResponseDto> patchChannel(int channelIdx, PatchChannelRequestDto dto);
    ApiResponse<?> deleteChannel(int channelIdx);
    ApiResponse<GetChannelMemberResponseDto> getChannelMember(int channelIdx);

}
