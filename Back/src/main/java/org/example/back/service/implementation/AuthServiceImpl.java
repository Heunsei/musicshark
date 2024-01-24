package org.example.back.service.implementation;

import org.example.back.dto.request.SignUpRequestDto;
import org.example.back.entity.UserEntity;
import org.example.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.back.service.AuthService;
import org.example.back.entity.UserEntity;
import org.example.back.service.AuthService;
import org.springframework.stereotype.Service;
import org.example.back.repository.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    UserRepository userRepository;
    @Override
    public void signUp(SignUpRequestDto dto) {


        String nickname = dto.getNickname();
        String user_email = dto.getUser_email();

        System.out.println(nickname);
        System.out.println(user_email);
//        if (userRepository.existsByNickname(nickname)) {
//            System.out.println("이미 존재하는 닉네임");
//            return;
//        }

        UserEntity userEntity = new UserEntity(dto);
        userRepository.save(userEntity);

    }

}
