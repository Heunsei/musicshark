package org.example.back.Channel.repository;

import org.example.back.Channel.entity.ChannelEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChannelRepository extends JpaRepository<ChannelEntity, Integer> {

    Optional<ChannelEntity> findByChannelName(String channelName);
    public List<ChannelEntity> findByChannelIsDeleteOrderByChannelDateDesc(int channelIsDelete);
    public ChannelEntity findByChannelIdx(int channelIdx);
}
