package org.example.back.entity;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "TIER")
public class TierEntity {

	@Id
	@Column(name = "user_idx")
	private int userIdx;

	@Column(name = "clear_cnt", nullable = false, columnDefinition = "INT DEFAULT 0")
	private int clearCnt;

	@Column(name = "user_tier", nullable = false, columnDefinition = "VARCHAR(10) DEFAULT 'bronze'")
	private String userTier;

	@OneToOne
	@JoinColumn(name = "user_idx", referencedColumnName = "user_idx", insertable = false, updatable = false)
	private UserEntity user;
}

