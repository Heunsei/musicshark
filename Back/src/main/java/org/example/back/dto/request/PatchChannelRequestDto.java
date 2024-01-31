package org.example.back.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatchChannelRequestDto {

    String channelName;
    String channelIntro;

    @Length(max = 8)
    int channelMax;
}
