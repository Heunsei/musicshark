package org.example.back.PerfectPlay.entity;

import javax.persistence.*;
import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.example.back.User.entity.UserEntity;

@Getter
@Setter
@AllArgsConstructor
@Entity(name = "PERFECTPLAY")
public class PerfectplayEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PP_IDX")
	private int ppIdx;

	@Column(name = "USER_IDX", nullable = false)
	private int userIdx;

	@Column(name = "SCORE", nullable = false)
	private int score;

	@Column(name = "SONG_IDX", nullable = false)
	private int songIdx;

	@Column(name = "DATE", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", nullable = false)
	private Timestamp date;

	@Column(name = "CLEAR", nullable = false)
	private boolean clear;

	@ManyToOne
	@JoinColumn(name = "USER_IDX", referencedColumnName = "USER_IDX", insertable = false, updatable = false)
	private UserEntity user;

	@ManyToOne
	@JoinColumn(name = "SONG_IDX", referencedColumnName = "SONG_IDX", insertable = false, updatable = false)
	private SongEntity song;

	public PerfectplayEntity() {
		this.date = new Timestamp(System.currentTimeMillis());
	}
}