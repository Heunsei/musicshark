package org.example.back.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.example.back.dto.response.FriendResponseDto;
import org.example.back.dto.response.PerfectplayResponseDto;
import org.example.back.entity.PerfectplayEntity;
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
}
