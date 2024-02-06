package org.example.back.Channel.service;

import org.example.back.Channel.dto.response.*;
import org.example.back.common.ApiResponse;
import org.example.back.Channel.dto.request.PatchChannelRequestDto;
import org.example.back.Channel.dto.request.PostChannelRequestDto;

public interface ChannelService {

    ApiResponse<PostChannelResponseDto> postChannel(String userEmail, PostChannelRequestDto dto);
    ApiResponse<GetChannelListResponseDto> getChannelList();
    ApiResponse<GetChannelResponseDto> getChannel(int channelIdx);
    ApiResponse<PatchChannelResponseDto> patchChannel(int channelIdx, PatchChannelRequestDto dto);
    ApiResponse<?> deleteChannel(int channelIdx);
    ApiResponse<GetChannelMemberResponseDto> getChannelMember(int channelIdx);
    ApiResponse<?> inviteMember(int channel, int userIdx, String userEmail);
    ApiResponse<GetDetailChannelMemberResponseDto> getDetailChannelMember(int channelIdx, int userIdx);
    ApiResponse<?> deleteChannelMember(int channelIdx, String userEmail);

}
