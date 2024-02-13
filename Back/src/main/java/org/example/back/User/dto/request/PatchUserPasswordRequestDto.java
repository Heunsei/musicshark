package org.example.back.User.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatchUserPasswordRequestDto {

    String existPassword;
    String newPassword;

}
