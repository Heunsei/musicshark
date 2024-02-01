package org.example.back.entity;

import lombok.*;
import org.example.back.dto.request.SignUpRequestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "User")
@EqualsAndHashCode(of = "userIdx")
public class UserEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_idx")
    private int userIdx;

    private String nickname;
    private String password;
    private String gender;
    private Date birth;

    @Column(name = "user_isdelete")
    private int userIsdelete;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "profile_image")
    private String profileImage;

    // roles 필드가 UserEntity 테이블과 관련된 별도의 테이블에 저장되어야 함을 나타냄
    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    public UserEntity (SignUpRequestDto dto, List<String> roles){
        this.nickname = dto.getNickname();
        this.password = dto.getPassword();
        this.gender = dto.getGender();
        this.birth =  Date.valueOf(dto.getBirth());
        this.userEmail = dto.getUserEmail();
        this.profileImage = dto.getProfileImage();
        this.roles = roles;
    }

     @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
    
    // getUsername은 UserDetails의 오버라이딩
    @Override
    public String getUsername() {
        return userEmail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
