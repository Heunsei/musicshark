package org.example.back.repository;

import org.apache.catalina.User;
import org.example.back.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    public boolean existsByNickname(String nickname);
    public boolean existsByUserEmail(String userEmail);
    Optional<UserEntity> findByUserEmail(String userEmail);

    public UserEntity findByUserIdx(int userIdx);


}
