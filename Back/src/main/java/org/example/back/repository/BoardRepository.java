package org.example.back.repository;

import java.util.List;
import java.util.Optional;

import org.example.back.dto.response.GetAllBoardResponseDto;
import org.example.back.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
	List<BoardEntity> findAllByBoardDeleted(boolean boardDeleted);

	Optional<BoardEntity> findByBoardIdx(int boardIdx);

	BoardEntity findByBoardIdxAndBoardDeleted(int boardIdx, boolean boardDeleted);
}
