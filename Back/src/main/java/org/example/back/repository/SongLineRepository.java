package org.example.back.repository;

import org.example.back.entity.SongEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongLineRepository extends JpaRepository<SongEntity, Integer> {

}
