package org.example.back.entity;

import org.example.back.dto.request.SignUpRequestDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "User")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_idx;
    private String nickname;
    private String password;
    private String gender;
    private Timestamp birth;
    private int user_isdelete;
    private String user_email;
    private String profile_image;

    public UserEntity (SignUpRequestDto dto){
        this.nickname = dto.getNickname();
        this.password = dto.getPassword();
        this.gender = dto.getGender();
        this.birth = Timestamp.valueOf(dto.getBirth());
        this.user_email = dto.getUser_email();
        this.profile_image = dto.getProfile_image();
    }
}
