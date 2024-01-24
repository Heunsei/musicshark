package org.example.back.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequestDto {

    String nickname;
    String password;
    String gender;
    String birth;
    String user_email;
    String profile_image;
}
