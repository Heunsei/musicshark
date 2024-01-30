package org.example.back.controller;

import lombok.RequiredArgsConstructor;
import org.example.back.common.ApiResponse;
import org.example.back.service.ChannelService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/channel")
public class ChannelController {

             private final ChannelService channelService;

             @PostMapping()
             public ApiResponse<PostChannelResponseDto> postChannel(@RequestBody PostChannelRequestDto requestDto){

                 PostChennelResponseDto result = channelService.postChannel(requestDto);
                 ApiResponse apiResponse = new
             }

}
