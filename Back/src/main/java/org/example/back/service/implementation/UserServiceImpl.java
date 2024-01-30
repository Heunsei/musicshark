package org.example.back.service.implementation;

import lombok.RequiredArgsConstructor;
import org.example.back.dto.request.PatchUserRequestDto;
import org.example.back.dto.response.GetUserResponseDto;
import org.example.back.dto.response.PatchUserResponseDto;
import org.example.back.entity.UserEntity;
import org.example.back.repository.UserRepository;
import org.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

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
    public PatchUserResponseDto patchUser(String userEmail, PatchUserRequestDto dto) {

        PatchUserResponseDto data = null;
        Optional<UserEntity> OptionUserEntity = userRepository.findByUserEmail(userEmail);

        String nickname = dto.getNickname();
        String password = dto.getPassword();
        String profileImage = dto.getProfileImage();

        try{

            if(!OptionUserEntity.isPresent()) throw new RuntimeException("존재하지 않는 유저입니다.");

            UserEntity userEntity = OptionUserEntity.get();

                boolean usedNickname = userRepository.existsByNickname(nickname);
                if(!usedNickname) userEntity.setNickname(nickname); // 받는 값들이 null이면 기존 값들을 넣고, 값들을 넣어서 보냈다면 값 바꾸기...?
                userEntity.setPassword(password);
                userEntity.setProfileImage(profileImage);

                userRepository.save(userEntity);
                data = new PatchUserResponseDto(userEntity);

        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("에러@@@");
        }
        return data;
    }
}
