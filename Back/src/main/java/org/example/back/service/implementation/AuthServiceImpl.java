package org.example.back.service.implementation;

import org.example.back.dto.request.SignInRequestDto;
import org.example.back.dto.request.SignUpRequestDto;
import org.example.back.entity.UserEntity;
import org.example.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.back.service.AuthService;
@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    UserRepository userRepository;

    @Override
    public String signUp(SignUpRequestDto dto) {
        String nickname = dto.getNickname();
        String userEmail = dto.getUserEmail();

        System.out.println(nickname);
        System.out.println(userEmail);

        try{

        if (userRepository.existsByNickname(nickname)) {
            return "이미 존재하는 닉네임";
        }

        if(userRepository.existsByUserEmail(userEmail)) {
            return "이미 존재하는 이메일";
         }
        }
        catch (Exception e){

            e.printStackTrace();
            return "에러@@";
        }

        UserEntity userEntity = new UserEntity(dto);
        userRepository.save(userEntity);

        return "회원가입 성공!!!";
    }

    @Override
    public String signIn(SignInRequestDto dto) {

        String userEmail = dto.getUserEmail();
        String password = dto.getPassword();

        UserEntity userEntity = null;
        UserEntity userEntityPassword = null;
        try{

            userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null){
                return "존재하지 않는 이메일입니다.";
            }

            userEntityPassword = userRepository.findByPassword(password);
            if(userEntityPassword == null){
                return "존재하지 않는 패스워드입니다.";
            }

        }catch (Exception e){
            e.printStackTrace();
            return "에러@@@";
        }
        return "로그인 성공!!!";
    }
}

