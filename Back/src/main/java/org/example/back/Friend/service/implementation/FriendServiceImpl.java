package org.example.back.Friend.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.example.back.Friend.dto.request.FriendRequestDto;
import org.example.back.Friend.dto.response.FriendDetailResponseDto;
import org.example.back.Friend.dto.response.FriendResponseDto;
import org.example.back.Friend.dto.response.UserSearchResponseDto;
import org.example.back.Friend.entity.FriendEntity;
import org.example.back.User.entity.UserEntity;
import org.example.back.Friend.repository.FriendRepository;
import org.example.back.Friend.service.FriendService;
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
		List<UserEntity> userEntity = friendRepository.findByUserEmail(userEmail);
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

		List<UserEntity> userEntity = friendRepository.findByUserNickname(userNickname);
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

	public void sendFriendRequest(FriendRequestDto friendRequestDto) {
		FriendEntity fromFriendEntity = new FriendEntity();
		fromFriendEntity.setFromUserIdx(friendRequestDto.getRequestUserIdx());
		fromFriendEntity.setToUserIdx(friendRequestDto.getResponseUserIdx());
		fromFriendEntity.setAreFriend(1);

		//요청 보낸 적 없는 경우에만 요청 등록
		if(!isExistRequest(fromFriendEntity))
			friendRepository.save(fromFriendEntity);

		FriendEntity toFriendEntity = new FriendEntity();
		toFriendEntity.setFromUserIdx(friendRequestDto.getResponseUserIdx());
		toFriendEntity.setToUserIdx(friendRequestDto.getRequestUserIdx());
		toFriendEntity.setAreFriend(0);

		if(!isExistRequest(toFriendEntity))
			friendRepository.save(toFriendEntity);
	}

	private boolean isExistRequest(FriendEntity entity) {
		List<FriendEntity> friendEntity = friendRepository.findAll();
		for(FriendEntity f : friendEntity) {
			if(f.getFromUserIdx() == entity.getFromUserIdx() && f.getToUserIdx() == entity.getToUserIdx()
				&& f.getAreFriend() == 1) {
					return true;
			}
		}
		return false;
	}

	public void acceptFriendRequest(FriendRequestDto friendRequestDto) {
		friendRepository.acceptRequest(friendRequestDto.getRequestUserIdx(), friendRequestDto.getResponseUserIdx());
	}
}
