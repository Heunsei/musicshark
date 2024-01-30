package org.example.back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.back.entity.UserEntity;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.URL;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatchUserResponseDto {

    @NotBlank
    @Length(max=16)
    String nickname;

    @NotBlank
    String password;

    @NotBlank
    @Length(max=8)
    String gender;

    @NotBlank
    Date birth;

    @NotBlank
    @Column(name = "user_email")
    String userEmail;

    @URL
    @Column(name = "profile_image")
    String profileImage;

    public PatchUserResponseDto(UserEntity userEntity){
        this.nickname = userEntity.getNickname();
        this.gender = userEntity.getGender();
        this.birth = userEntity.getBirth();
        this.userEmail = userEntity.getUserEmail();
    }
}
