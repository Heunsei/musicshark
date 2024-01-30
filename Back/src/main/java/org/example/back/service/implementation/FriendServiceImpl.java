package org.example.back.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.example.back.dto.response.FriendDetailResponseDto;
import org.example.back.dto.response.FriendResponseDto;
import org.example.back.dto.response.UserSearchResponseDto;
import org.example.back.entity.UserEntity;
import org.example.back.repository.FriendRepository;
import org.example.back.service.FriendService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService {

	private final FriendRepository friendRepository;
	@Override
	public List<FriendResponseDto> findAllFriend(int userIdx) {
		List<FriendResponseDto> friendResponseDtoList = friendRepository.findAllFriend(userIdx);
		return friendResponseDtoList;
	}

	@Override
	public FriendDetailResponseDto findFriendDetail(int userIdx) {
		FriendDetailResponseDto friendDetailResponseDto = friendRepository.findFriendDetail(userIdx);
		return friendDetailResponseDto;
	}

	@Override
	public List<UserSearchResponseDto> userSearchByEmail(String userEmail) {
		List<UserEntity> userEntity = friendRepository.findAllByUserEmail(userEmail);
		List<UserSearchResponseDto> userSearchList = new ArrayList<>();
		for (UserEntity result : userEntity) {
			UserSearchResponseDto userSearchResponseDto = new UserSearchResponseDto(
				result.getUserIdx(),
				result.getUserEmail(),
				result.getProfileImage()
			);
			userSearchList.add(userSearchResponseDto);
		}
		return userSearchList;
	}

	@Override
	public List<UserSearchResponseDto> userSearchByNickname(String userNickname) {
		List<UserEntity> userEntity = friendRepository.findAllByUserNickname(userNickname);
		List<UserSearchResponseDto> userSearchList = new ArrayList<>();

		for (UserEntity result : userEntity) {
			UserSearchResponseDto userSearchResponseDto = new UserSearchResponseDto(
				result.getUserIdx(),
				result.getNickname(),
				result.getProfileImage()
			);

			userSearchList.add(userSearchResponseDto);
		}
		return userSearchList;
	}
}
