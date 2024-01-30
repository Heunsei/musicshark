package org.example.back.service.implementation;

import lombok.RequiredArgsConstructor;
import org.example.back.common.ApiResponse;
import org.example.back.dto.request.PatchUserRequestDto;
import org.example.back.dto.response.DeleteUserResponseDto;
import org.example.back.dto.response.GetUserResponseDto;
import org.example.back.dto.response.PatchUserResponseDto;
import org.example.back.entity.UserEntity;
import org.example.back.repository.UserRepository;
import org.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static org.springframework.http.HttpStatus.OK;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public GetUserResponseDto getUser(String userEmail) {

            GetUserResponseDto data = null;
            Optional<UserEntity> userEntity = null;

        try {

            userEntity = userRepository.findByUserEmail(userEmail);

            if(!userEntity.isPresent()){
                throw new RuntimeException("존재하지 않는 유저입니다.");
            }

            data = new GetUserResponseDto(userEntity.get());

        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("에러@@@");
        }

        return data;
    }
    @Override
    public ApiResponse<PatchUserResponseDto> patchUser(String userEmail, PatchUserRequestDto dto) {

        PatchUserResponseDto data = null;
        Optional<UserEntity> OptionUserEntity = userRepository.findByUserEmail(userEmail);

        String nickname = dto.getNickname();
        String password = dto.getPassword();
        String profileImage = dto.getProfileImage();

        try{

            if(!OptionUserEntity.isPresent()) {
                return new ApiResponse("존재하지 않는 유저입니다.", 500, data);
            }

            UserEntity userEntity = OptionUserEntity.get();

                boolean usedNickname = userRepository.existsByNickname(nickname);
                if(usedNickname) return  new ApiResponse<>("존재하는 닉네임입니다.", 500, data);
                userEntity.setNickname(nickname); // 받는 값들이 null이면 기존 값들을 넣고, 값들을 넣어서 보냈다면 값 바꾸기...?

                if(password != null){
                    String passwordEncoded = passwordEncoder.encode(password);
                    userEntity.setPassword(passwordEncoded);
                }
                if(profileImage != null) userEntity.setProfileImage(profileImage);

                userRepository.save(userEntity);
                data = new PatchUserResponseDto(userEntity);

        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse("유저 정보 수정 에러", 500, null);
        }
        return new ApiResponse("유저 정보 수정 성공", OK.value(), data);
    }

    @Override
    public ApiResponse<DeleteUserResponseDto> deleteUser(String userEmail) {

        Optional<UserEntity> OptionalUserEntity = userRepository.findByUserEmail(userEmail);

        try{

                UserEntity userEntity = OptionalUserEntity.get();

            userEntity.setUserIsdelete(1);
            userRepository.save(userEntity);

        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse("유저 탈퇴 에러", 500, null);
        }

        return new ApiResponse("유저 탈퇴 성공", OK.value(), null);
    }
}
