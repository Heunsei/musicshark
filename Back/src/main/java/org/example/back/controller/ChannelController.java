package org.example.back.controller;

import lombok.RequiredArgsConstructor;
import org.example.back.common.ApiResponse;
import org.example.back.dto.request.PatchChannelRequestDto;
import org.example.back.dto.request.PostChannelRequestDto;
import org.example.back.dto.response.*;
import org.example.back.service.ChannelService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/channels")
public class ChannelController {

             private final ChannelService channelService;

             @PostMapping()
             public ResponseEntity<ApiResponse> postChannel(
                     @AuthenticationPrincipal UserDetails userDetails,
                     @RequestBody PostChannelRequestDto requestDto){

                 String userEmail = userDetails.getUsername();

                 ApiResponse<PostChannelResponseDto> result = channelService.postChannel(userEmail, requestDto);

                 String message = result.getMessage();
                 int status = result.getStatus();

                 ApiResponse apiResponse = new ApiResponse(message, status, result.getData());

                 return ResponseEntity.ok(apiResponse);
             }

             @GetMapping("/{channelIdx}")
             public ResponseEntity<ApiResponse> getChannel(@PathVariable int channelIdx){

                 ApiResponse<GetChannelResponseDto> result = channelService.getChannel(channelIdx);

                 String message = result.getMessage();
                 int status = result.getStatus();

                 ApiResponse apiResponse = new ApiResponse(message, status, result.getData());

                 return ResponseEntity.ok(apiResponse);
             }

             @GetMapping()
             public ResponseEntity<ApiResponse> getChannelList(){

                 ApiResponse<GetChannelListResponseDto> result = channelService.getChannelList();

                 String message = result.getMessage();
                 int status = result.getStatus();

                 ApiResponse apiResponse = new ApiResponse(message, status, result.getData());

                 return ResponseEntity.ok(apiResponse);
             }

             @PatchMapping("/{channelIdx}")
             public ResponseEntity<ApiResponse> patchChannel(@PathVariable int channelIdx,
                                                             @RequestBody PatchChannelRequestDto dto){

                 ApiResponse<PatchChannelResponseDto> result = channelService.patchChannel(channelIdx, dto);

                 String message = result.getMessage();
                 int status = result.getStatus();

                 ApiResponse apiResponse = new ApiResponse(message, status, result.getData());

                 return ResponseEntity.ok(apiResponse);
             }

             @PatchMapping("/delete/{channelIdx}")
             public ResponseEntity<?> deleteChannel(@PathVariable int channelIdx){

                 ApiResponse<?> result = channelService.deleteChannel(channelIdx);

                 String msg = result.getMessage();
                 int status = result.getStatus();

                 ApiResponse apiResponse = new ApiResponse(msg, status, result.getData());

                 return ResponseEntity.ok(apiResponse);
             }

             @GetMapping("/{channelIdx}/members")
             public ResponseEntity<ApiResponse> getChannelMember(@PathVariable int channelIdx){

                 ApiResponse<GetChannelMemberResponseDto> result = channelService.getChannelMember(channelIdx);

                 String msg = result.getMessage();
                 int status = result.getStatus();

                 ApiResponse apiResponse = new ApiResponse(msg, status, result.getData());

                 return ResponseEntity.ok(apiResponse);
             }

             public ResponseEntity<ApiResponse> inviteMember(){

             }
}
