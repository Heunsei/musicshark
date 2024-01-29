package org.example.back.service.implementation;

import lombok.RequiredArgsConstructor;
import org.example.back.dto.response.GetUserResponseDto;
import org.example.back.entity.UserEntity;
import org.example.back.repository.UserRepository;
import org.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public GetUserResponseDto getUser(Integer userIdx) {

            GetUserResponseDto data = null;
            UserEntity userEntity = null;

        try {

            userEntity = userRepository.findByUserIdx(userIdx);

            System.out.println(userEntity.getNickname());
            if(userEntity == null){
                return null;
            }
            data = new GetUserResponseDto(userEntity);
            System.out.println(data.getNickname());

        }catch (Exception e){
            System.out.println("에러" + data.getNickname());
            e.printStackTrace();
        }

        System.out.println(data.getNickname());
        return data;
    }
}
