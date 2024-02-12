package org.example.back.Openvidu.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ConnectionResponseDto {
    private String token;
    private String connectionId;
}
