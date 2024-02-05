package org.example.back.dto.response;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class GetCommentsResponseDto {
	String commentContent;
	Timestamp commentDate;
	String userNickname;
}
