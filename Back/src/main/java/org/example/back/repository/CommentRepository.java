package org.example.back.repository;

import org.example.back.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {
    List<CommentEntity> findAllByBoardIdxAndCommentDeleted(int boardIdx, boolean commentDeleted);

    CommentEntity findByCommentIdx(int commentIdx);
}
