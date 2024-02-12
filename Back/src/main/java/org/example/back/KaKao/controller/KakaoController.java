package org.example.back.KaKao.controller;

import lombok.RequiredArgsConstructor;
import org.example.back.KaKao.service.KakaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/*
 * 참고 사이트:
 * 1) https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api
 *
 * 2) https://jules-jc.tistory.com/239
 */
@RestController
@RequestMapping("/auth/kakao")
@RequiredArgsConstructor
public class KakaoController {



    @Autowired
    private final KakaoService service;

    @GetMapping()
    public ResponseEntity<?> KakaoAuthorize(@RequestParam("code") String code) {
        String[] access_token = service.getKakaoAccessToken(code);
        return new ResponseEntity<Void>(HttpStatus.METHOD_NOT_ALLOWED);
    }
}