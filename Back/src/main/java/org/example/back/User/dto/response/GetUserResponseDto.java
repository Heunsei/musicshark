package org.example.back.User.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.back.User.entity.UserEntity;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetUserResponseDto {

    int userIdx;
    String nickname;
    String gender;
    Date birth;
    String userEmail;
    String profileImage;
    String userTier;

    public GetUserResponseDto(UserEntity userEntity){
        this.userIdx = userEntity.getUserIdx();
        this.nickname = userEntity.getNickname();
        this.gender = userEntity.getGender();
        this.birth = userEntity.getBirth();
        this.userEmail = userEntity.getUserEmail();
        this.profileImage = userEntity.getProfileImage();

    }
}
