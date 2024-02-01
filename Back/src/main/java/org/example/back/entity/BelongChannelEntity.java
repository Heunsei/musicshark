package org.example.back.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "belong_channel")
public class BelongChannelEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "belong_channel_idx")
    int belongChannelIdx;

    @Column(name = "channel_idx")
    int channelIdx;

    @Column(name = "user_idx")
    int userIdx;

    @Column(name = "is_admin")
    int isAdmin;

    public BelongChannelEntity(BelongChannelEntity entity){
        this.belongChannelIdx = entity.getBelongChannelIdx();
        this.channelIdx = entity.getChannelIdx();
        this.userIdx = entity.getUserIdx();
        this.isAdmin = entity.isAdmin;
    }

    public static List<BelongChannelEntity> addList(List<BelongChannelEntity> bchList){

        List<BelongChannelEntity> list = new ArrayList<>();

        for(BelongChannelEntity entity : bchList){

            BelongChannelEntity bch = new BelongChannelEntity(entity);

            list.add(bch);
        }

        return list;
    }

    @Override
    public String toString() {
        return "BelongChannelEntity{" +
                "belongChannelIdx=" + belongChannelIdx +
                ", channelIdx=" + channelIdx +
                ", userIdx=" + userIdx +
                ", isAdmin=" + isAdmin +
                '}';
    }
}
