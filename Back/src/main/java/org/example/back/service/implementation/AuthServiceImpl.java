package org.example.back.service.implementation;

import org.example.back.request.SignUpRequestDto;
import org.example.back.entity.UserEntity;
import org.example.back.service.AuthService;
import org.springframework.stereotype.Service;
import org.example.back.repository.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {

    UserRepository userRepository;

    @Override
    public void signUp(SignUpRequestDto dto) {

        String nickname = dto.getNickname();
        String user_email = dto.getUser_email();

        if (userRepository.existsById(nickname)) {
            System.out.println("이미 존재하는 닉네임");
            return;
        }

        UserEntity userEntity = new UserEntity(dto);
        userRepository.save(userEntity);
    }
}