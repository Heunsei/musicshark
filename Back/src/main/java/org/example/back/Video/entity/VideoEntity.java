package org.example.back.Video.entity;

import java.sql.Date;
import java.sql.Timestamp;

import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Entity
@Table(name = "video")
@NoArgsConstructor
public class VideoEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "video_idx")
	private int videoIdx;

//	@Column(name = "video_date", columnDefinition = "DATE default current_date")
	@Column(name = "video_date")
	@CreationTimestamp
	private Date videoDate;

	@NotBlank
	@Column(name = "video_title", columnDefinition = "TEXT")
	private String videoTitle;

	@Lob
	@Column(name = "video_picture", nullable = true)
	private String videoPicture;


	@JoinColumn(name = "user_idx", referencedColumnName = "user_idx")
	private int userIdx;

	@NotBlank
	@Column(name = "video_path", columnDefinition = "TEXT")
	private String videoPath;
}
