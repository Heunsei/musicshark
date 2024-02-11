package org.example.back.Video.service.implementation;

import java.io.IOException;
import java.net.URL;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.example.back.User.entity.UserEntity;
import org.example.back.User.repository.UserRepository;
import org.example.back.Video.dto.request.PersonalVideoRequestDto;
import org.example.back.Video.dto.response.PersonalVideoResponseDto;
import org.example.back.Video.dto.response.SearchVideoResponseDto;
import org.example.back.Video.entity.VideoEntity;
import org.example.back.Video.repository.VideoRepository;
import org.example.back.Video.service.PersonalVideoService;
import org.example.back.common.ErrorCode;
import org.example.back.common.NotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.ListObjectsV2Request;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3ObjectSummary;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PersonalVideoServiceImpl implements PersonalVideoService {

	private final AmazonS3 amazonS3;
	private final UserRepository userRepository;
	private final VideoRepository videoRepository;

	private final String personalVideoPath = "storage/video/personal/";
	private final long accessExpiredTime = 30 * 60; // 접근 제한 시간 30분


	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	@Override
	public void saveVideo(PersonalVideoRequestDto dto, UserDetails userDetails) throws IOException {
		UserEntity user = userRepository.findByUserEmail(userDetails.getUsername()).orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentLength(dto.getVideoFile().getSize());
		metadata.setContentType(dto.getVideoFile().getContentType());

		// 현재 날짜를 String으로 변환함.
		LocalDate now = LocalDate.now(ZoneId.of("Asia/Seoul"));
		String dateString = now.toString().replaceAll("-", "");

		String key = personalVideoPath + user.getNickname() + "/" + dateString + "/" + dto.getVideoTitle() + ".webm";


		amazonS3.putObject(bucket, key, dto.getVideoFile().getInputStream(), metadata);
		VideoEntity data = new VideoEntity();
		data.setVideoTitle(dto.getVideoTitle());
		data.setUserIdx(user.getUserIdx());
		data.setVideoPath(key);

		videoRepository.save(data);
	}

	@Override
	public List<PersonalVideoResponseDto> getPresignedURL(UserDetails userDetails) throws Exception {
		UserEntity user = userRepository.findByUserEmail(userDetails.getUsername()).orElseThrow();
		List<VideoEntity> list = videoRepository.findByUserIdx(user.getUserIdx());

		List<PersonalVideoResponseDto> result = new ArrayList<>();
		for(VideoEntity entity : list) {
			PersonalVideoResponseDto dto = new PersonalVideoResponseDto();
			dto.setVideoIdx(entity.getVideoIdx());
			dto.setVideoTitle(entity.getVideoTitle());

			String key = entity.getVideoPath();
			String url = makePresignedURL(key, accessExpiredTime, HttpMethod.GET);
			dto.setPresignedURL(url);
			result.add(dto);
		}
		return result;
	}

	@Override
	@Transactional
	public void deleteVideo(UserDetails userDetails, int boardIdx) throws Exception {
		UserEntity user = userRepository.findByUserEmail(userDetails.getUsername())
			.orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

		VideoEntity video = videoRepository.findByVideoIdx(boardIdx).orElseThrow(() -> new NullPointerException("해당 파일을 찾을 수 없습니다."));
		if(user.getUserIdx() == video.getUserIdx()){
			String key = video.getVideoPath();
			videoRepository.deleteByVideoIdx(video.getVideoIdx());
			amazonS3.deleteObject(bucket, key);
		}
	}

	@Override
	public boolean findVideoWithTitle(UserDetails userDetails, String videoTitle) {
		UserEntity user = userRepository.findByUserEmail(userDetails.getUsername())
			.orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

		Optional<VideoEntity> video = videoRepository.findByUserIdxAndVideoTitleAndVideoDate(user.getUserIdx(), videoTitle, LocalDate.now(ZoneId.of("Asia/Seoul")));

		if(video.isPresent()) return true;
		else return false;
	}

	@Override
	public List<SearchVideoResponseDto> searchVideo(UserDetails userDetails, String videoTitle) throws Exception {
		UserEntity user = userRepository.findByUserEmail(userDetails.getUsername())
				.orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

		List<VideoEntity> videoList = videoRepository.findByUserIdx(user.getUserIdx());
		List<SearchVideoResponseDto> list = new ArrayList<>();

		for(VideoEntity video : videoList){
			SearchVideoResponseDto dto = new SearchVideoResponseDto();

			if(!video.getVideoTitle().contains(videoTitle)) continue;

			dto.setVideoIdx(video.getUserIdx());
			dto.setVideoDate(video.getVideoDate());
			dto.setVideoTitle(video.getVideoTitle());
			dto.setPresignedURL(makePresignedURL(video.getVideoPath(), accessExpiredTime, HttpMethod.GET));

			list.add(dto);
		}

		return list;
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

	private List<String> listObjectsInDirectory(String dirPath){
		ListObjectsV2Request listObjectsRequest = new ListObjectsV2Request()
			.withBucketName(bucket)
			.withPrefix(dirPath);

		ListObjectsV2Result listObjectsResult = amazonS3.listObjectsV2(listObjectsRequest);
		List<S3ObjectSummary> objectSummaries = listObjectsResult.getObjectSummaries();

		return objectSummaries.stream()
			.filter(this::isObject)
			.map(S3ObjectSummary::getKey)
			.toList();
	}

	private boolean isObject(S3ObjectSummary objectSummary){
		return objectSummary.getKey().contains(".");
	}
}