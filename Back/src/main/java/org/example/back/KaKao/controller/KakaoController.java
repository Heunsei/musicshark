package org.example.back.KaKao.controller;

import java.util.Optional;

import lombok.RequiredArgsConstructor;

import org.example.back.KaKao.dto.response.KakaoLoginResponse;
import org.example.back.KaKao.service.KakaoService;
import org.example.back.User.entity.UserEntity;
import org.example.back.User.repository.UserRepository;
import org.example.back.config.JwtToken;
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

    private final UserRepository userRepository;

    @GetMapping()
    public ResponseEntity<?> KakaoAuthorize(@RequestParam("code") String code) {
        String accessToken = service.getKakaoAccessToken(code);
        String email = service.getUserInfo(accessToken).replaceAll("\"", "");

        KakaoLoginResponse dto = new KakaoLoginResponse();
        Optional<UserEntity> user = userRepository.findByUserEmail(email);
        System.out.println(email + " " + user.isPresent());
        if(user.isPresent() && user.get().getUserIsdelete() == 0){ // DB에 있는 유저이며, 탈퇴한 회원이 아닌 경우
            JwtToken result = service.signInWithKakao(user.get());
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else if(user.isEmpty()){ // DB에 없는 유저 -> 회원가입 한 적이 없는 유저
            dto.setKakao(true);
            dto.setEmail(email);
            return new ResponseEntity<KakaoLoginResponse>(dto, HttpStatus.NOT_FOUND);
        }

        // 회원가입을 하였으나 이미 탈퇴한 회원
        return new ResponseEntity<String>("탈퇴한 회원입니다.", HttpStatus.BAD_REQUEST);
    }
}