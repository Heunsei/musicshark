package org.example.back.repository;

import java.util.List;

import org.example.back.entity.PerfectplayEntity;
import org.example.back.entity.SongEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PerfectplayRepository extends JpaRepository<PerfectplayEntity, Integer> {
	// 퍼펙트플레이 기록 조회
	@Modifying
	@Query("select p FROM PerfectplayEntity p")
	List<PerfectplayEntity> perfectplayResult();

	// 퍼펙트플레이 기록 저장
}
