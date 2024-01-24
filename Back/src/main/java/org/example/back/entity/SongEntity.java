package org.example.back.entity;

import java.sql.Time;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "SONG")
public class SongEntity {

	@Id
	@Column(name = "SONG_IDX")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int songIdx;

	@Column(name = "TITLE", nullable = false)
	@NotNull
	private String title;

	@Column(name = "SINGER", nullable = false)
	@NotNull
	private String singer;

	@Column(name = "START_TIMING")
	@NotNull
	private int startTiming;

	@Column(name = "RUNNING_TIME")
	@NotNull
	private int runningTime;

	@Column(name = "MR_FILE", columnDefinition = "TEXT")
	@NotNull
	private String mrFile;

	@Override
	public String toString() {
		return "Song{" +
			"songIdx=" + songIdx +
			", title='" + title + '\'' +
			", singer='" + singer + '\'' +
			", startTiming=" + startTiming +
			", runningTime=" + runningTime +
			", mrFile='" + mrFile + '\'' +
			'}';
	}
}
