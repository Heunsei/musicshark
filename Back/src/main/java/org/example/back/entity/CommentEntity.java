package org.example.back.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import lombok.*;
import org.example.back.dto.request.CommentRequestDto;
import org.example.back.dto.response.GetCommentsResponseDto;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

@Data
@Getter
@Setter
@Entity
@Table(name= "comment")
@NoArgsConstructor
@AllArgsConstructor
public class CommentEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int commentIdx;

	@JoinColumn(name = "board_idx", referencedColumnName = "board_idx")
	private int boardIdx;

	@JoinColumn(name = "user_idx", referencedColumnName = "user_idx")
	private int userIdx;

	@Column(name = "comment_content", columnDefinition = "TEXT")
	private String commentContent;

	@CreationTimestamp
	@Column(name = "comment_date")
	private Timestamp commentDate;

	@ColumnDefault("false")
	@Column(name = "comment_deleted", columnDefinition = "TINYINT(0)")
	private boolean commentDeleted;

	public CommentEntity(CommentRequestDto dto){
		this.boardIdx = dto.getBoardIdx();
		this.commentContent = dto.getCommentContent();
	}
}
