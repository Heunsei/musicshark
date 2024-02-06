package org.example.back.config;

import lombok.RequiredArgsConstructor;
import org.example.back.User.entity.UserEntity;
import org.example.back.User.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 사용자 정보 접근
    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        Optional<UserEntity> userEntity = userRepository.findByUserEmail(userEmail);

        return userRepository.findByUserEmail(userEmail)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 회원을 찾을 수 없습니다."));

    }

    // 해당하는 User의 데이터가 존재한다면 UserDetails 객체로 만들어서 return
    private UserDetails createUserDetails(UserEntity userEntity) {
        return User.builder()
                .username(userEntity.getUsername())
                .password(passwordEncoder.encode(userEntity.getPassword()))
                .roles(userEntity.getRoles().toArray(new String[0]))
                .build();
    }

}
