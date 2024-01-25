package org.example.back.service.implementation;

import org.example.back.config.TokenProvider;
import org.example.back.dto.request.SignInRequestDto;
import org.example.back.dto.request.SignUpRequestDto;
import org.example.back.dto.response.SignInResponseDto;
import org.example.back.entity.UserEntity;
import org.example.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.example.back.service.AuthService;
@Service
public class AuthServiceImpl implements AuthService {

    @Autowired UserRepository userRepository;
    @Autowired private TokenProvider tokenProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public String signUp(SignUpRequestDto dto) {
        String nickname = dto.getNickname();
        String userEmail = dto.getUserEmail();
        String password = dto.getPassword();

        try{

        if (userRepository.existsByNickname(nickname)) {
            return "이미 존재하는 닉네임";
        }

        if(userRepository.existsByUserEmail(userEmail)) {
            return "이미 존재하는 이메일";
         }

        String encodePassword = passwordEncoder.encode(password);
        dto.setPassword(encodePassword);

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
    public SignInResponseDto signIn(SignInRequestDto dto) {

        String userEmail = dto.getUserEmail();
        String password = dto.getPassword();

        SignInResponseDto data = null;
        try{

            UserEntity userEntity = null;
            userEntity = userRepository.findByUserEmail(userEmail);

            if(userEntity == null){
                return null;
//                return "존재하지 않는 이메일입니다.";
            }

            boolean passwordMatch = passwordEncoder.matches(password, userEntity.getPassword());

            if(!passwordMatch){
                return null;
//                return "패스워드 틀렸습니다.";
            }

            String token = tokenProvider.create(userEmail);
            data = new SignInResponseDto(userEntity, token);

        }catch (Exception e){
            e.printStackTrace();
            return null;
//            return "에러@@@";
        }
        return data;
    }
}

