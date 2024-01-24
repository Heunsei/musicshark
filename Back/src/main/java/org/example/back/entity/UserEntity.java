package org.example.back.entity;

import org.example.back.dto.request.SignUpRequestDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_idx;
    private String nickname;
    private String password;
    private String gender;
    private String birth;
    private int user_isDelete;
    private String user_email;
    private String profile_image;

    public UserEntity (SignUpRequestDto dto){
        this.nickname = dto.getNickname();
        this.password = dto.getPassword();
        this.gender = dto.getGender();
        this.birth = dto.getGender();
        this.user_email = dto.getUser_email();
        this.profile_image = dto.getProfile_image();
    }
}
