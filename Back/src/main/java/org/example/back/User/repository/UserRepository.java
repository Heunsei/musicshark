package org.example.back.User.repository;

import org.example.back.User.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    public boolean existsByNickname(String nickname);
    public boolean existsByUserEmail(String userEmail);
    Optional<UserEntity> findByUserEmail(String userEmail);
    UserEntity findByNickname(String userNickname);
    public UserEntity findByUserIdx(int userIdx);


}
