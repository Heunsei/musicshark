package org.example.back.Video.repository;

import org.example.back.Video.entity.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.YearMonth;
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

    Optional<List<VideoEntity>> findByUserIdxAndVideoDateOrderByVideoIdxDesc(int userIdx, LocalDate date);

    // 년도와 월을 입력
    @Query("select v from VideoEntity v where v.userIdx = :userIdx AND v.videoDate between :startDate and :endDate")
    Optional<List<VideoEntity>> findByUserIdxAndDateRange(@Param("userIdx") int userIdx,
                                                          @Param("startDate") LocalDate startDate,
                                                          @Param("endDate") LocalDate endDate);

    default Optional<List<VideoEntity>> findByUserIdxAndDateRange(int userIdx, int year, int month){
        LocalDate startDate = YearMonth.of(year, month).atDay(1);
        LocalDate endDate = YearMonth.of(year, month).atEndOfMonth();

        return findByUserIdxAndDateRange(userIdx, startDate, endDate);
    }

}