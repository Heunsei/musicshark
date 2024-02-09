package org.example.back.Channel.repository;

import org.example.back.Channel.entity.BelongChannelEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface BelongChannelRepository extends JpaRepository<BelongChannelEntity, Integer> {
    public List<BelongChannelEntity> findByChannelIdx(int channelIdx);
    public BelongChannelEntity findTopByChannelIdx(int channelIdx);
    public List<BelongChannelEntity> findByUserIdx(int userIdx);
    @Query("SELECT b FROM BelongChannelEntity b WHERE b.userIdx = :userIdx")
    BelongChannelEntity findByUserIdx2(@Param("userIdx") int userIdx);
    public boolean existsByUserIdx(int userIdx);
    @Transactional
    void deleteByUserIdx(int userIdx);
}
