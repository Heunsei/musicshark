package org.example.back.service.implementation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.back.config.JwtTokenProvider;
import org.example.back.dto.request.JwtToken;
import org.example.back.dto.request.SignInRequestDto;
import org.example.back.dto.request.SignUpRequestDto;
import org.example.back.dto.response.SignInResponseDto;
import org.example.back.entity.UserEntity;
import org.example.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.example.back.service.AuthService;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

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
    public JwtToken signIn(SignInRequestDto dto) {

        String userEmail = dto.getUserEmail();
        String password = dto.getPassword();


        try{

            Optional<UserEntity> userEntity = null;
            userEntity = userRepository.findByUserEmail(userEmail);

            if(!userEntity.isPresent()){
                return null;
//                return "존재하지 않는 이메일입니다.";
            }

            boolean passwordMatch = passwordEncoder.matches(password, userEntity.get().getPassword());

            if(!passwordMatch){
                return null;
//                return "패스워드 틀렸습니다.";
            }


        }catch (Exception e){
            e.printStackTrace();
            return null;
//            return "에러@@@";
        }

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userEmail, password);

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        JwtToken jwtToken = jwtTokenProvider.generateToken(authentication);

        return jwtToken;
    }
}

