package org.example.back.dto.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.URL;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatchUserRequestDto {

    @Length(max=16)
    String nickname;

    String password;

    @URL
    @Column(name = "profile_image")
    String profileImage;

}
