package org.example.back.Video.repository;

import org.example.back.Video.entity.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface VideoRepository extends JpaRepository<VideoEntity, Integer> {
    Optional<VideoEntity> findByVideoPath(String path);

    List<VideoEntity> findByUserIdx(int userIdx);

    Optional<VideoEntity> findByVideoIdx(int videoIdx);
    void deleteByVideoIdx(int videoIdx);

    Optional<VideoEntity> findByUserIdxAndVideoTitleAndVideoDate(int userIdx, String videoTitle, LocalDate date);

    List<VideoEntity> findByUserIdxAndVideoTitle(int userIdx, String videoTitle);
}