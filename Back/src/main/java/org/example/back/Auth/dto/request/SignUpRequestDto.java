package org.example.back.Auth.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.URL;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignUpRequestDto {


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

    List<String> roles = new ArrayList<>();

}