package org.example.back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.back.entity.UserEntity;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetUserResponseDto {

    String nickname;

    String gender;

    Date birth;

    String userEmail;

    String profileImage;

    public GetUserResponseDto(UserEntity userEntity){

        this.nickname = userEntity.getNickname();
        this.gender = userEntity.getGender();
        this.birth = userEntity.getBirth();
        this.userEmail = userEntity.getUserEmail();
        this.profileImage = userEntity.getProfileImage();

    }
}
