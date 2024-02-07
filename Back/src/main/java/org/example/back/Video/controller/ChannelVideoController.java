package org.example.back.Video.controller;

import lombok.RequiredArgsConstructor;
import org.example.back.Video.service.ChannelVideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/videos/channel")
@RequiredArgsConstructor
public class ChannelVideoController {

    @Autowired
    private final ChannelVideoService service;

    
}
