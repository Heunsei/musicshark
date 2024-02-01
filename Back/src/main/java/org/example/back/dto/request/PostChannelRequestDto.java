package org.example.back.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import java.sql.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostChannelRequestDto {

    @NotBlank
    String channelName;
    String channelIntro;

    @NotBlank
    @Length(max = 8)
    int channelMax;

}
