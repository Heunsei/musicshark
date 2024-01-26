package org.example.back.entity;

import lombok.Builder;
import org.example.back.dto.request.SignUpRequestDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
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
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "User")
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

    public UserEntity (SignUpRequestDto dto){
        this.nickname = dto.getNickname();
        this.password = dto.getPassword();
        this.gender = dto.getGender();
        this.birth =  Date.valueOf(dto.getBirth());
        this.userEmail = dto.getUserEmail();
        this.profileImage = dto.getProfileImage();
    }

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
    @Override
    public String getUsername() {
        return userEmail;
    }

    @Override
    public String getPassword() {
        return password;
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
        return userIsdelete == 0;
    }

    @Override
    public String toString() {
        return "UserEntity{" +
                "userIdx=" + userIdx +
                ", nickname='" + nickname + '\'' +
                ", password='" + password + '\'' +
                ", gender='" + gender + '\'' +
                ", birth=" + birth +
                ", userIsdelete=" + userIsdelete +
                ", userEmail='" + userEmail + '\'' +
                ", profileImage='" + profileImage + '\'' +
                ", roles=" + roles +
                '}';
    }
}
