package org.example.back.Channel.controller;

import lombok.RequiredArgsConstructor;
import org.example.back.Channel.dto.response.*;
import org.example.back.common.ApiResponse;
import org.example.back.Channel.dto.request.PatchChannelRequestDto;
import org.example.back.Channel.dto.request.PostChannelRequestDto;
import org.example.back.Channel.service.ChannelService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

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
             public ResponseEntity<ApiResponse> getChannelList(@AuthenticationPrincipal UserDetails userDetails){

                 String userEmail = userDetails.getUsername();

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

             @PostMapping("/{channelIdx}/members/{userIdx}")
             public ResponseEntity<?> inviteMember(@PathVariable int channelIdx,
                                                   @PathVariable int userIdx,
                                                   @AuthenticationPrincipal UserDetails userDetails){

                 String userEmail = userDetails.getUsername();
                 ApiResponse<?> result = channelService.inviteMember(channelIdx, userIdx, userEmail);

                 String msg = result.getMessage();
                 int status = result.getStatus();

                 ApiResponse apiResponse = new ApiResponse(msg, status, result.getData());

                 return ResponseEntity.ok(apiResponse);
             }

             @GetMapping("/{channelIdx}/members/{userIdx}")
             public ResponseEntity<ApiResponse> getDetailMember(@PathVariable int channelIdx,
                                                                @PathVariable int userIdx){

                 ApiResponse<GetDetailChannelMemberResponseDto> result =
                         channelService.getDetailChannelMember(channelIdx, userIdx);

                 String msg = result.getMessage();
                 int status = result.getStatus();

                 ApiResponse apiResponse = new ApiResponse(msg, status, result.getData());

                 return ResponseEntity.ok(apiResponse);

             }

             @DeleteMapping("/{channelIdx}/members")
             public ResponseEntity<?> deleteChannelMember(@PathVariable int channelIdx,
                                                          @AuthenticationPrincipal UserDetails userDetails){

                 String userEmail = userDetails.getUsername();
                 ApiResponse<?> result = channelService.deleteChannelMember(channelIdx, userEmail);

                 String msg = result.getMessage();
                 int status = result.getStatus();

                 ApiResponse apiResponse = new ApiResponse(msg, status, result.getData());

                 return ResponseEntity.ok(apiResponse);
             }
}
