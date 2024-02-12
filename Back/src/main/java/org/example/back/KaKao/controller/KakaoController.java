package org.example.back.KaKao.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 * 참고 사이트:
 * 1) https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api
 *
 * 2) https://jules-jc.tistory.com/239
 */
@RestController
@RequestMapping("/auth/kakao")
public class KakaoController {

    private final String KAKAO_REST_API_KEY = "a1d71ef7ee8a62c397eea8c14103b31d";
    private final String REDIRECT_URI = "https://i10e205.p.ssafy.io/auth/kakao";

    @GetMapping()
    public ResponseEntity<?> KakaoAuthorize() {
        return new ResponseEntity<Void>(HttpStatus.METHOD_NOT_ALLOWED);
    }
}
