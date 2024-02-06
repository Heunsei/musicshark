package org.example.back.Auth.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SignInRequestDto {

    @NotBlank
    @Column(name = "user_email")
    String userEmail;

    @NotBlank
    String password;
}