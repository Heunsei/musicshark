package org.example.back.KaKao.service;

import org.example.back.User.entity.UserEntity;
import org.example.back.User.repository.UserRepository;
import org.example.back.config.JwtToken;
import org.example.back.config.JwtTokenProvider;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.security.core.Authentication;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import lombok.RequiredArgsConstructor;

/*
 * 참고)
 * https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api
 *
 * https://velog.io/@akskflwn/Rest-API-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%B9%B4%EC%B9%B4%EC%98%A4-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84ReactSpring-boot
 *
 */

@Service
@RequiredArgsConstructor
public class KakaoServiceImpl implements KakaoService {
    private final String KAKAO_REST_API_KEY = "a1d71ef7ee8a62c397eea8c14103b31d";
    private final String REDIRECT_URI = "${kakaoservice.redirecturi}";

    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Override
    public String getKakaoAccessToken(String code) {
        System.out.println("code : " + code);
        String access_token = "";
        String refresh_token = "";
        String requestURL = "https://kauth.kakao.com/oauth/token";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", KAKAO_REST_API_KEY);
        body.add("redirect_uri", REDIRECT_URI);
        body.add("code", code);

        ResponseEntity<String> response = restTemplate.postForEntity(requestURL, new HttpEntity<>(body, headers), String.class);
        String responseData = response.getBody();

        System.out.println("responseData : " + responseData);
        JsonParser parser = new JsonParser();
        JsonObject object = (JsonObject) parser.parse(responseData);
        access_token = object.get("access_token").toString();
        refresh_token = object.get("refresh_token").toString();

        System.out.println(access_token);
        return access_token;
    }

    @Override
    public String getUserInfo(String accessToken) {
        String requestURL = "https://kapi.kakao.com/v2/user/me";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization", "Bearer " + accessToken);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("property_keys", "[\"kakao_account.email\", \"kakao_account.profile\"]");

        ResponseEntity<String> response = restTemplate.postForEntity(requestURL, new HttpEntity<>(body, headers), String.class);
        String responseData = response.getBody();

        System.out.println("responseData : " + responseData);
        JsonParser parser = new JsonParser();
        JsonObject object = (JsonObject) parser.parse(responseData);
        JsonObject kakaoAccount = (JsonObject) parser.parse(object.get("kakao_account").toString());

        String email = kakaoAccount.get("email").toString();

        return email;
    }

    @Override
    public JwtToken signInWithKakao(UserEntity user) {
        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(user.getUserEmail(), user.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        JwtToken jwtToken = jwtTokenProvider.generateToken(authentication);

        return jwtToken;
    }
}
