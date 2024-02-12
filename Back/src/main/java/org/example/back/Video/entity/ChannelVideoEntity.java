package org.example.back.Video.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Data
@Entity
@Table(name = "channel_video")
public class ChannelVideoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "channel_video_idx")
    private int channelVideoIdx;

    @JoinColumn(name = "channel_idx", referencedColumnName = "channel_idx")
    private int channelIdx;

    @JoinColumn(name = "video_idx", referencedColumnName = "video_idx")
    private int videoIdx;

    @JoinColumn(name = "user_idx", referencedColumnName = "user_idx")
    private int userIdx;
}
