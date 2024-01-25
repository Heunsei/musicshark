package org.example.back.repository;

import org.example.back.entity.TierEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TierRepository extends JpaRepository<TierEntity, Integer> {
	@Modifying
	@Query("UPDATE TierEntity t SET t.clearCnt = t.clearCnt+1 WHERE t.userIdx = :userIdx")
	void updateClearCnt(@Param("userIdx") int userIdx);
}
