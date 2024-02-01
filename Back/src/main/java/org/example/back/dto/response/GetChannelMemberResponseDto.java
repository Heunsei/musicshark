package org.example.back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.back.entity.UserEntity;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetChannelMemberResponseDto {

    String nickname;
    String gender;
    Date birth;
    String userEmail;
    String profileImage;

    public GetChannelMemberResponseDto(UserEntity userEntity){

        this.nickname = userEntity.getNickname();
        this.gender = userEntity.getGender();
        this.birth = userEntity.getBirth();
        this.userEmail = userEntity.getUserEmail();
        this.profileImage = userEntity.getProfileImage();

    }

    public static List<GetChannelMemberResponseDto> addList(List<UserEntity> userList){

        List<GetChannelMemberResponseDto> list = new ArrayList<>();

        for(UserEntity memberList : userList){

            GetChannelMemberResponseDto dto = new GetChannelMemberResponseDto(memberList);
            list.add(dto);
        }

        return list;
    }
}
