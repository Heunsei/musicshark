package org.example.back.repository;

import org.example.back.entity.BelongChannelEntity;
import org.example.back.entity.ChannelEntity;
import org.example.back.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BelongChannelRepository extends JpaRepository<BelongChannelEntity, Integer> {
    public List<BelongChannelEntity> findByChannelIdx(int channelIdx);
    public List<BelongChannelEntity> findByUserIdx(int userIdx);
}
