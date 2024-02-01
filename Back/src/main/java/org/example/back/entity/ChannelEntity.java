package org.example.back.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.back.dto.request.PostChannelRequestDto;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlType;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Channel")
public class ChannelEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "channel_idx")
    private int channelIdx;

    @Column(name = "channel_name")
    private String channelName;

    @Column(name = "channel_intro")
    private String channelIntro;

    @Column(name = "channel_date")
    private Date channelDate = new Date(System.currentTimeMillis());

    @Column(name = "channel_max")
    private int channelMax;

    @Column(name = "channel_cur")
    private int channelCur;

    @Column(name = "channel_isdelete")
    private int channelIsDelete;

    public ChannelEntity(PostChannelRequestDto dto){

        this.channelName = dto.getChannelName();
        this.channelIntro = dto.getChannelIntro();
        this.channelMax = dto.getChannelMax();
        this.channelCur = 1;
    }



}
