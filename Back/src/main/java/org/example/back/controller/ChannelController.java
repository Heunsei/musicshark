package org.example.back.controller;

import lombok.RequiredArgsConstructor;
import org.example.back.common.ApiResponse;
import org.example.back.dto.request.PatchChannelRequestDto;
import org.example.back.dto.request.PostChannelRequestDto;
import org.example.back.dto.response.*;
import org.example.back.service.ChannelService;
import org.example.back.service.FriendService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/channels")
public class ChannelController {

             private final ChannelService channelService;
             private final FriendService friendService;

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

             @PostMapping("/{channelIdx}/members/{userNickname}")
             public ResponseEntity<?> inviteMember(@PathVariable int channelIdx,
                                                             @PathVariable String userNickname){

//                 List<UserSearchResponseDto> userSearchList = friendServiceImpl.userSearchByNickname(userNickname);
//                 ApiResponse apiResponse = ApiResponse.builder()
//                         .message("사용자 조회")
//                         .status(OK.value())
//                         .data(userSearchList)
//                         .build();
//                 return ResponseEntity.ok(apiResponse);

                 List<UserSearchResponseDto> userSearchList = friendService.userSearchByNickname(userNickname);

                 System.out.println(userSearchList.get(0).getEmailOrNickname());

                 // 검색 결과를 가져왔으니까 거기서 유저 인덱스만 가져와서 초대 보내기

                 channelService.inviteMember(channelIdx, userNickname);

//                 ApiResponse apiResponse = ApiResponse.builder()
//                         .message("사용자 조회")
//                         .status(OK.value())
//                         .data(userSearchList)
//                         .build();
//                 return ResponseEntity.ok(apiResponse);

                 ApiResponse apiResponse = new ApiResponse("채널에 친구 초대", OK.value(), "멤버 초대");

                 return ResponseEntity.ok(apiResponse);
             }

             @GetMapping("/{channelIdx}/members/{userIdx}")
             public ResponseEntity<ApiResponse> getDetailMember(@PathVariable int channelIdx,
                                                                @PathVariable int userIdx){

                 ApiResponse<GetDetailChannelMemberResponseDto> result = channelService.getDetailChannelMember(channelIdx, userIdx);

                 String msg = result.getMessage();
                 int status = result.getStatus();

                 ApiResponse apiResponse = new ApiResponse(msg, status, result.getData());

                 return ResponseEntity.ok(apiResponse);

             }

             @DeleteMapping("/{channelIdx}/members/{userIdx}")
             public ResponseEntity<?> deleteChannelMember(@PathVariable int channelIdx,
                                                          @PathVariable int userIdx){

                 ApiResponse<?> result = channelService.deleteChannelMember(channelIdx, userIdx);

                 String msg = result.getMessage();
                 int status = result.getStatus();

                 ApiResponse apiResponse = new ApiResponse(msg, status, result.getData());

                 return ResponseEntity.ok(apiResponse);
             }
}
