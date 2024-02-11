package org.example.back.Video.controller;

import lombok.RequiredArgsConstructor;
import org.example.back.Video.dto.request.ChannelVideoRequestDto;
import org.example.back.Video.dto.response.ChannelVideoResponseDto;
import org.example.back.Video.dto.response.SearchVideoResponseDto;
import org.example.back.Video.service.ChannelVideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/videos/channels")
@RequiredArgsConstructor
public class ChannelVideoController {

    @Autowired
    private final ChannelVideoService service;

    @GetMapping("/{channelIdx}")
    public ResponseEntity<?> getVideos(@AuthenticationPrincipal UserDetails userDetails, @PathVariable("channelIdx") int channelIdx){
        try {
            List<ChannelVideoResponseDto> urls = service.getVideos(userDetails, channelIdx);
            return new ResponseEntity<List<ChannelVideoResponseDto>>(urls, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{channelIdx}")
    public ResponseEntity<?> saveVideo(@PathVariable("channelIdx") int channelIdx, @AuthenticationPrincipal UserDetails userDetails, @ModelAttribute ChannelVideoRequestDto video){
        try {
            service.saveVideo(channelIdx, userDetails, video);
            return new ResponseEntity<Void>(HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{channelIdx}/search")
    public ResponseEntity<?> searchVideo(@AuthenticationPrincipal UserDetails userDetails, @PathVariable("channelIdx") int channelIdx, @RequestParam("videoTitle") String videoTitle){
        try{
            List<SearchVideoResponseDto> list = service.searchVideo(userDetails, channelIdx, videoTitle);
            return new ResponseEntity<List<SearchVideoResponseDto>>(list, HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{channelIdx}")
    public ResponseEntity<?> deleteVideo(@PathVariable("channelIdx") int channelIdx, @AuthenticationPrincipal UserDetails userDetails, @RequestParam("video_idx") int videoIdx){
        try {
            service.deleteVideo(channelIdx, userDetails, videoIdx);
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
