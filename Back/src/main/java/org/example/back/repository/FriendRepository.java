package org.example.back.repository;

import java.util.List;

import org.example.back.dto.response.FriendDetailResponseDto;
import org.example.back.dto.response.FriendResponseDto;
import org.example.back.entity.FriendEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendRepository extends JpaRepository<FriendEntity, Integer> {
	@Query(
		value = "SELECT new org.example.back.dto.response.FriendResponseDto(u.userIdx, u.nickname, u.profileImage) "
			+ "FROM User u "
			+ "WHERE u.userIdx IN ("
			+ "    SELECT f.fromUserIdx "
			+ "    FROM FriendEntity f "
			+ "    WHERE f.fromUserIdx IN ("
			+ "        SELECT f.toUserIdx "
			+ "        FROM FriendEntity f "
			+ "        WHERE f.fromUserIdx = :userIdx AND f.areFriend = 1"
			+ "    ) AND f.toUserIdx = :userIdx AND f.areFriend = 1"
			+ ")"
	)
	List<FriendResponseDto> findAllFriend(@Param("userIdx") int userIdx);


	@Query(
		value = "SELECT new org.example.back.dto.response.FriendDetailResponseDto(u.userIdx, u.nickname, u.userEmail, u.profileImage, t.userTier, t.clearCnt) "
			+ "FROM org.example.back.entity.UserEntity u "
			+ "JOIN org.example.back.entity.TierEntity t "
			+ "ON u.userIdx = t.userIdx "
			+ "WHERE u.userIdx = :userIdx"
	)
	FriendDetailResponseDto findFriendDetail(int userIdx);
}
