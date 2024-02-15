package org.example.back.Board.entity;

import java.sql.Timestamp;

import javax.persistence.*;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Entity
@Table(name = "board")
public class BoardEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "board_idx")
	private int boardIdx;

	@JoinColumn(name = "user_idx", referencedColumnName = "user_idx")
	private int userIdx;

	@Column(name = "board_title")
	private String boardTitle;

	@Column(name = "board_content", columnDefinition = "TEXT")
	private String boardContent;

	@Column(name = "board_count")
	@ColumnDefault("0")
	private int boardCount; // 조회 수

	@ColumnDefault("false")
	@Column(name = "board_deleted", columnDefinition = "TINYINT(0)")
	private boolean boardDeleted;

	@CreationTimestamp
	@Column(name = "board_date")
	private Timestamp boardDate;

}
