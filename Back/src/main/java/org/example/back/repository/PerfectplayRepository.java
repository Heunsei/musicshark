package org.example.back.repository;

import java.util.List;

import org.example.back.entity.PerfectplayEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PerfectplayRepository extends JpaRepository<PerfectplayEntity, Integer> {
	// 퍼펙트플레이 기록 조회
	@Query("select p from PerfectplayEntity p where p.userIdx = :userIdx")
	List<PerfectplayEntity> perfectplayResult(@Param("userIdx") int userIdx);

	// 퍼펙트플레이 기록 저장(save 이용)

	// 퍼펙트플레이 최신 기록
	@Query("select p.songIdx from PerfectplayEntity p where p.userIdx = :userIdx order by p.date desc")
	Integer findLatestSongIdx(@Param("userIdx") int userIdx);

	// 퍼펙트플레이 점수 내림차순
	// @Query("select p.songIdx from PerfectplayEntity p where p.userIdx = :userIdx order by p.score desc")
	// Integer findHighScoreIdx(@Param("userIdx") int userIdx);
}
