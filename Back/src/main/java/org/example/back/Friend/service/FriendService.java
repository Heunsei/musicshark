package org.example.back.Friend.service;

import java.util.List;

import org.example.back.Friend.dto.request.FriendRequestDto;
import org.example.back.Friend.dto.response.FriendDetailResponseDto;
import org.example.back.Friend.dto.response.FriendResponseDto;
import org.example.back.Friend.dto.response.UserSearchResponseDto;

public interface FriendService {
	List<FriendResponseDto> findAllFriend(int userIdx);
	FriendDetailResponseDto findFriendDetail(int userIdx);
	List<UserSearchResponseDto> userSearchByEmail(String userEmail);
	List<UserSearchResponseDto> userSearchByNickname(String userEmail);
	void sendFriendRequest(FriendRequestDto friendRequestDto);
	void acceptFriendRequest(FriendRequestDto friendRequestDto);
}
