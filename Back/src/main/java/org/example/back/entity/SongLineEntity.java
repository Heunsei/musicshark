package org.example.back.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import javax.persistence.Id;
import javax.persistence.GenerationType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "SONG_LINE")
public class SongLineEntity {

	@Id
	@Column(name = "SONG_LINE_IDX")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int songLineIdx;

	@ManyToOne
	@JoinColumn(name = "SONG_IDX")
	private SongEntity songEntity;

	@Column(name = "START_NODE")
	@NotNull
	private Long startNode;

	@Column(name = "END_NODE")
	@NotNull
	private Long endNode;

	@Column(name = "START_TIME")
	@NotNull
	private Long startTime;

	@Column(name = "END_TIME")
	@NotNull
	private Long endTime;
}