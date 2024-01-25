package org.example.back.repository;

import org.example.back.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    public boolean existsByNickname(String nickname);
    public boolean existsByUserEmail(String userEmail);
    public UserEntity findByUserEmail(String userEmail);

    @Query("SELECT u FROM User u WHERE u.userIdx = :userIdx")
    public UserEntity findByUserIdx(Integer userIdx);
}
