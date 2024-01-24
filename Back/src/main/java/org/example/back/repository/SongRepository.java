package org.example.back.repository;

import java.util.List;

import org.example.back.entity.SongEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface SongRepository extends JpaRepository<SongEntity, Integer> {

	//전체 음악 조회
	@Modifying
	@Query("select s FROM SongEntity s")
	List<SongEntity> findAllSong();

	//음악 선택 시 엠알 조회
}
