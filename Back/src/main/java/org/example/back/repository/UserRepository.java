package org.example.back.repository;

import org.example.back.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    public boolean existsByNickname(String nickname);
    public boolean existsByUserEmail(String userEmail);
}
