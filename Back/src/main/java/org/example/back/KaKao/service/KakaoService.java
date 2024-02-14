package org.example.back.KaKao.service;

import org.example.back.User.entity.UserEntity;
import org.example.back.config.JwtToken;

public interface KakaoService{
    String getKakaoAccessToken(String code);

    String getUserInfo(String accessToken);

    JwtToken signInWithKakao(UserEntity user);
}
