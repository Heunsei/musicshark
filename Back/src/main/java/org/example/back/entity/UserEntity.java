package org.example.back.entity;

import org.example.back.dto.request.SignUpRequestDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "User")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_idx")
    private int userIdx;
    private String nickname;
    private String password;
    private String gender;
    private Date birth;

    @Column(name = "user_isdelete")
    private int userIsdelete;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "profile_image")
    private String profileImage;

    public UserEntity (SignUpRequestDto dto){
        this.nickname = dto.getNickname();
        this.password = dto.getPassword();
        this.gender = dto.getGender();
        this.birth =  Date.valueOf(dto.getBirth());
        this.userEmail = dto.getUserEmail();
        this.profileImage = dto.getProfileImage();
    }


}
