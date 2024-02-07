package org.example.back.Video.service.implementation;

import java.io.IOException;
import java.net.URL;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.example.back.User.entity.UserEntity;
import org.example.back.User.repository.UserRepository;
import org.example.back.Video.dto.request.S3VideoRequestDto;
import org.example.back.Video.entity.VideoEntity;
import org.example.back.Video.repository.VideoRepository;
import org.example.back.Video.service.S3Service;
import org.example.back.common.ErrorCode;
import org.example.back.common.NotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

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
public class S3ServiceImpl implements S3Service {

	private final AmazonS3 amazonS3;
	private final UserRepository userRepository;
	private final VideoRepository videoRepository;

	private final String personalVideoPath = "storage/video/personal/";
	private final String channelVideoPath = "storage/video/channel/";


	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	private final String tempString = "nickname";

	public String saveFile(MultipartFile multipartFile) throws IOException {
		String originalFilename = multipartFile.getOriginalFilename();

		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentLength(multipartFile.getSize());
		metadata.setContentType(multipartFile.getContentType());

		// S3에 파일 저장하는 경로
		String path = "storage/" + tempString + "/" + originalFilename;

		amazonS3.putObject(bucket, path, multipartFile.getInputStream(), metadata);
		return amazonS3.getUrl(bucket, path).toString();
	}

	@Override
	public void savePersonalVideo(S3VideoRequestDto dto, UserDetails userDetails) throws IOException {
		UserEntity user = userRepository.findByUserEmail(userDetails.getUsername()).orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentLength(dto.getVideoFile().getSize());
		metadata.setContentType(dto.getVideoFile().getContentType());

		// 현재 날짜를 String으로 변환함.
		LocalDate now = LocalDate.now(ZoneId.of("Asia/Seoul"));
		String dateString = now.toString().replaceAll("-", "");

		String extension = StringUtils.getFilenameExtension(dto.getVideoFile().getOriginalFilename());
		String key = personalVideoPath + user.getNickname() + "/" + dateString + "/" + dto.getVideoTitle() + "." + extension;


		amazonS3.putObject(bucket, key, dto.getVideoFile().getInputStream(), metadata);
		VideoEntity data = new VideoEntity();
		data.setVideoTitle(dto.getVideoTitle());
		data.setUserIdx(user.getUserIdx());
		data.setVideoPath(key);

		videoRepository.save(data);
	}

	@Override
	public void saveVideo(S3VideoRequestDto dto) {

	}

	@Override
	public String getPresignedURL(String keyname, long expTimeSecond, HttpMethod method) throws Exception {
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

	// @Override
	// public List<String> getPersonalPresignedURL(UserDetails userDetails) throws Exception {
	// 	UserEntity user = userRepository.findByUserEmail(userDetails.getUsername()).orElseThrow();
	// 	String basePath = personalVideoPath + user.getNickname() + "/";
	//
	// 	List<String> objectKeys = listObjectsInDirectory(basePath);
	// 	List<String> presignedUrls = new ArrayList<>();
	//
	// 	for(String objectKey : objectKeys){
	// 		System.out.println(objectKey);
	// 		String Url = getPresignedURL(objectKey, 30*60, HttpMethod.GET);
	// 		presignedUrls.add(Url);
	// 	}
	//
	// 	return presignedUrls;
	// }

	@Override
	public List<String> getPersonalPresignedURL(UserDetails userDetails) throws Exception {
		UserEntity user = userRepository.findByUserEmail(userDetails.getUsername()).orElseThrow();
		List<VideoEntity> list = videoRepository.findByUserIdx(user.getUserIdx());

		List<String> result = new ArrayList<>();
		for(VideoEntity entity : list) {
			String key = entity.getVideoPath();
			System.out.println(key);
			String url = getPresignedURL(key, 60*30, HttpMethod.GET);
			result.add(url);
		}
		return result;
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