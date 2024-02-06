package org.example.back.Comment.repository;

import org.example.back.Comment.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {
    List<CommentEntity> findAllByBoardIdxAndCommentDeleted(int boardIdx, boolean commentDeleted);

    CommentEntity findByCommentIdx(int commentIdx);
}
