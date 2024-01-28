package org.example.back.dto.response;

import lombok.*;
import org.example.back.entity.UserEntity;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.URL;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import java.sql.Date;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUpResponseDto {

    @NotBlank
    @Length(max=16)
    String nickname;

    @NotBlank
    String password;

    @NotBlank
    @Length(max=8)
    String gender;

    @NotBlank
    String birth;

    @NotBlank
    @Column(name = "user_email")
    String userEmail;

    @URL
    @Column(name = "profile_image")
    String profileImage;

}
