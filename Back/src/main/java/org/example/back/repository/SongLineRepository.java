package org.example.back.repository;

import java.util.List;

import org.example.back.entity.SongEntity;
import org.example.back.entity.SongLineEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SongLineRepository extends JpaRepository<SongLineEntity, Integer> {

	List<SongLineEntity> findAllBySongEntityOrderByStartTimeAsc(SongEntity song);
}
