package org.example.back.Video.service.implementation;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.example.back.Channel.entity.BelongChannelEntity;
import org.example.back.Channel.repository.BelongChannelRepository;
import org.example.back.Channel.repository.ChannelRepository;
import org.example.back.User.entity.UserEntity;
import org.example.back.User.repository.UserRepository;
import org.example.back.Video.dto.request.ChannelVideoRequestDto;
import org.example.back.Video.dto.response.ChannelVideoResponseDto;
import org.example.back.Video.entity.ChannelVideoEntity;
import org.example.back.Video.entity.VideoEntity;
import org.example.back.Video.repository.ChannelVideoRepository;
import org.example.back.Video.repository.VideoRepository;
import org.example.back.Video.service.ChannelVideoService;
import org.example.back.common.ErrorCode;
import org.example.back.common.NotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.net.URL;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChannelVideoServiceImpl implements ChannelVideoService {

    private final AmazonS3 amazonS3;
    private final VideoRepository videoRepository;


    private final UserRepository userRepository;
    private final ChannelRepository channelRepository;
    private final BelongChannelRepository belongRepository;
    private final ChannelVideoRepository channelVideoRepository;
    private final String channelVideoPath = "storage/video/channel/";


    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Override
    public List<ChannelVideoResponseDto> getVideos(UserDetails userDetails, int channelIdx) throws Exception {
        UserEntity user = userRepository.findByUserEmail(userDetails.getUsername())
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        BelongChannelEntity isexist =
                belongRepository.findByChannelIdxAndUserIdx(channelIdx, user.getUserIdx())
                .orElseThrow(() -> new Exception("잘못된 접근입니다."));

        List<ChannelVideoEntity> list = channelVideoRepository.findByChannelIdxOrderByVideoIdxDesc(channelIdx);
        List<ChannelVideoResponseDto> result = new ArrayList<>();
        for(ChannelVideoEntity listItem: list){
            VideoEntity video = videoRepository.findByVideoIdx(listItem.getVideoIdx())
                    .orElseThrow(() -> new Exception("알 수 없는 에러가 발생하였습니다."));

            ChannelVideoResponseDto dto = new ChannelVideoResponseDto();
            dto.setVideoIdx(video.getVideoIdx());
            dto.setVideoTitle(video.getVideoTitle());

            String key = video.getVideoPath();
            String url = makePresignedURL(key, 60*30, HttpMethod.GET);
            dto.setPresignedURL(url);

            result.add(dto);
        }

        return result;
    }

    @Override
    public void saveVideo(int channelIdx, UserDetails userDetails, ChannelVideoRequestDto video) throws Exception {
        UserEntity user = userRepository.findByUserEmail(userDetails.getUsername())
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(video.getVideoFile().getSize());
        metadata.setContentType(video.getVideoFile().getContentType());

        LocalDate now = LocalDate.now(ZoneId.of("Asia/Seoul"));
        String dateString = now.toString().replaceAll("-", "");

        String key = channelVideoPath + channelIdx + "/" + dateString + "/" + video.getVideoTitle() + ".webm";

        VideoEntity data = new VideoEntity();
        data.setVideoTitle(video.getVideoTitle());
        data.setUserIdx(user.getUserIdx());
        data.setVideoPath(key);

        videoRepository.save(data); // 영상 저장
        amazonS3.putObject(bucket, key, video.getVideoFile().getInputStream(), metadata);

        VideoEntity savedvideo = videoRepository.
                findByUserIdxAndVideoTitleAndVideoDate(user.getUserIdx(), video.getVideoTitle(), now)
                .orElseThrow(() -> new Exception("비디오 저장에 문제가 발생하였습니다."));

        ChannelVideoEntity entity = new ChannelVideoEntity();
        entity.setChannelIdx(channelIdx);
        entity.setVideoIdx(savedvideo.getVideoIdx());
        entity.setUserIdx(user.getUserIdx());

        channelVideoRepository.save(entity);
    }

    @Override
    @Transactional
    public void deleteVideo(int channelIdx, UserDetails userDetails, int videoIdx) throws Exception {
        UserEntity user = userRepository.findByUserEmail(userDetails.getUsername()).orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        // 유저가 채널의 소속인지 파악
        BelongChannelEntity belong =
                belongRepository.findByChannelIdxAndUserIdx(channelIdx, user.getUserIdx())
                        .orElseThrow(() -> new Exception("잘못된 접근입니다."));


        VideoEntity target = videoRepository.findByVideoIdx(videoIdx)
                .orElseThrow(() -> new NotFoundException(ErrorCode.VIDEO_NOT_FOUND));

        String key = target.getVideoPath();

        channelVideoRepository.deleteByChannelIdxAndVideoIdx(channelIdx, videoIdx);
        videoRepository.deleteByVideoIdx(target.getVideoIdx());
        amazonS3.deleteObject(bucket, key);


    }

    private String makePresignedURL(String keyname, long expTimeSecond, HttpMethod method) throws Exception {
        String preSignedURL;
        Date expiration = new Date();
        Long expTimeMillis = expiration.getTime();
        expTimeMillis += 1000 * expTimeSecond;
        expiration.setTime(expTimeMillis);

        GeneratePresignedUrlRequest PresignedUrlRequest =
                new GeneratePresignedUrlRequest(bucket, keyname)
                        .withMethod(method)
                        .withExpiration(expiration);
        URL url = amazonS3.generatePresignedUrl(PresignedUrlRequest);
        preSignedURL = url.toString();

        return preSignedURL;
    }
}
