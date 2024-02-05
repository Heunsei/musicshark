package org.example.back.repository;

import org.example.back.dto.response.GetCommentsResponseDto;
import org.example.back.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {
    List<CommentEntity> findAllByBoardIdx(int boardIdx);

    Optional<CommentEntity> findByBoardIdx(int boardIdx);
}
