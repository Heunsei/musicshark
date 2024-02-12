package org.example.back.Video.repository;

import org.example.back.Video.entity.ChannelVideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChannelVideoRepository extends JpaRepository<ChannelVideoEntity, Integer> {
    List<ChannelVideoEntity> findByChannelIdxOrderByVideoIdxDesc(int channelIdx);

    void deleteByChannelIdxAndVideoIdx(int channelIdx, int videoIdx);
}
