package org.example.back.PerfectPlay.entity;

import java.sql.Time;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "SONG")
public class SongEntity {

	@Id
	@Column(name = "SONG_IDX")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int songIdx;

	@Column(name = "TITLE", nullable = false)
	private String title;

	@Column(name = "SINGER", nullable = false)
	private String singer;

	@Column(name = "START_TIMING", nullable = false)
	private int startTiming;

	@Column(name = "RUNNING_TIME", nullable = false)
	private int runningTime;

	@Column(name = "SONG_IMG", nullable = false)
	private String songImg;

	@Override
	public String toString() {
		return "Song{" +
			"songIdx=" + songIdx +
			", title='" + title + '\'' +
			", singer='" + singer + '\'' +
			", startTiming=" + startTiming +
			", runningTime=" + runningTime +
			", mrFile='" + songImg + '\'' +
			'}';
	}
}
