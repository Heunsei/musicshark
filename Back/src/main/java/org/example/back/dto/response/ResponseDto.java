package org.example.back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.coyote.Response;

@Data
@NoArgsConstructor
@AllArgsConstructor(staticName = "set")
public class ResponseDto<D> {

    private String message;

    private D data;

    public static <D> ResponseDto<D> success(String message, D data){
        return ResponseDto.set(message, data);
    }

    public static <D> ResponseDto<D> fail(String message){
        return ResponseDto.set(message, null);
    }
}
