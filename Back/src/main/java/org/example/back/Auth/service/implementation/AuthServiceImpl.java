package org.example.back.Auth.service.implementation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.back.Auth.dto.request.SignInRequestDto;
import org.example.back.Auth.dto.request.SignUpRequestDto;
import org.example.back.User.entity.UserEntity;
import org.example.back.common.ApiResponse;
import org.example.back.config.JwtTokenProvider;
import org.example.back.config.JwtToken;
import org.example.back.User.entity.TierEntity;
import org.example.back.Auth.dto.response.SignUpResponseDto;
import org.example.back.User.repository.TierRepository;
import org.example.back.User.repository.UserRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.example.back.Auth.service.AuthService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.OK;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    private final TierRepository tierRepository;

    @Override
    public ApiResponse<SignUpResponseDto> signUp(SignUpRequestDto dto) {

        SignUpResponseDto data = null;
        String nickname = dto.getNickname();
        String userEmail = dto.getUserEmail();
        String password = dto.getPassword();

        try{

        if (userRepository.existsByNickname(nickname)) {
            return new ApiResponse("존재하는 닉네임입니다.",  500, null);
        }

        if(userRepository.existsByUserEmail(userEmail)) {
            return new ApiResponse("존재하는 이메일입니다.",  500, null);
        }

            String encodePassword = passwordEncoder.encode(password);
            List<String> roles = new ArrayList<>();
            roles.add("USER");

            dto.setPassword(encodePassword);
            UserEntity userEntity = new UserEntity(dto, roles);
            userRepository.save(userEntity);

            //회원 가입 시, 티어 테이블 생성
            TierEntity tierEntity = new TierEntity();
            tierEntity.setUserIdx(userEntity.getUserIdx());
            tierEntity.setUserTier("bronze");
            tierEntity.setClearCnt(0);

            tierRepository.save(tierEntity);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ApiResponse("회원가입 에러",  500, null);
        }

        return new ApiResponse("회원가입 성공",  OK.value(), data);
    }

    @Override
    public JwtToken signIn(SignInRequestDto dto) {

        String userEmail = dto.getUserEmail();
        String password = dto.getPassword();

        Optional<UserEntity> userEntity = userRepository.findByUserEmail(userEmail);

        try{
            if(userEntity.get().getUserIsdelete() == 1) throw new RuntimeException("존재하지 않는 유저");
            if(userEntity.isPresent()){

                boolean passwordMatch = passwordEncoder.matches(password, userEntity.get().getPassword());
                if(passwordMatch){

                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userEmail, userEntity.get().getPassword());
                Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
                JwtToken jwtToken = jwtTokenProvider.generateToken(authentication);

                return jwtToken;
                }
            }


        }catch (Exception e){
            e.printStackTrace();
            log.error("로그인 중 오류 발생: {}", e.getMessage());
            throw new RuntimeException("로그인 중 오류 발생");
        }

        throw new RuntimeException("로그인 중 오류 발생");
    }
}

