package org.example.back.Video.service.implementation;

import java.io.IOException;

import org.example.back.Video.service.S3Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class S3ServiceImpl implements S3Service {

	private final AmazonS3 amazonS3;

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
}