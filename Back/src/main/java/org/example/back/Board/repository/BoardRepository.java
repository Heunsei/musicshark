package org.example.back.Board.repository;

import java.util.List;
import java.util.Optional;

import org.example.back.Board.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
	List<BoardEntity> findAllByBoardDeleted(boolean boardDeleted);

	Optional<BoardEntity> findByBoardIdx(int boardIdx);

	Optional<BoardEntity> findByBoardIdxAndBoardDeleted(int boardIdx, boolean boardDeleted);

	Optional<List<BoardEntity>> findByUserIdxAndBoardDeleted(int userIdx, boolean boardDeleted);
}
