package org.example.back.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "FRIEND")
public class FriendEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "friend_idx")
	private int friendIdx;

	@Column(name = "from_user_idx")
	private int fromUserIdx;

	@Column(name = "to_user_idx")
	private int toUserIdx;

	@Column(name = "are_friend")
	private int areFriend;

	@ManyToOne
	@JoinColumn(name = "from_user_idx", referencedColumnName = "user_idx", insertable = false, updatable = false)
	private UserEntity fromUser;

	@ManyToOne
	@JoinColumn(name = "to_user_idx", referencedColumnName = "user_idx", insertable = false, updatable = false)
	private UserEntity toUser;
}

