//package org.example.back.service.implementation;
//
//import lombok.RequiredArgsConstructor;
//import org.example.back.entity.UserEntity;
//import org.example.back.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class
//CustomUserDetailService implements UserDetailsService {
//
//    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//
//    @Override
//    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
//        return userRepository.findByUserEmail(userEmail)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: "+ userEmail));
//    }
//
//    private UserDetails createUserDetails(UserEntity userEntity) {
//        return User.builder()
//                .username(userEntity.getUsername())
//                .password(passwordEncoder.encode(userEntity.getPassword()))
//                .roles(userEntity.getRoles().toArray(new String[0]))
//                .build();
//    }
//}
