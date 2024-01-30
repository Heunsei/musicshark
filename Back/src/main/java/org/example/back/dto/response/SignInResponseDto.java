package org.example.back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.back.entity.UserEntity;

import javax.persistence.Column;
import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignInResponseDto {

    private int userIdx;

    private String nickname;

    private String gender;

    private String userEmail;

    private Date birth;

    private String token;

    private int expiredTime;

    public SignInResponseDto (UserEntity entity, String token){

        this.userIdx = entity.getUserIdx();
        this.nickname = entity.getNickname();
        this.gender = entity.getGender();
        this.userEmail = entity.getUserEmail();
        this.birth = entity.getBirth();
        this.token = token;
        this.expiredTime = 1440000;

    }

}
