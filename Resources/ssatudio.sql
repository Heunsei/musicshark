create database if not exists ssatudio;
use ssatudio;

-- 해당 테이블에서만 쓰는 변수는 테이블명 안붙이기 --
-- 다른 테이블에서도 쓰는 변수는 테이블명 붙이기 --
create table if not exists `User` (
    user_idx int primary key auto_increment COMMENT '유저 인덱스',
    nickname varchar(16) NOT NULL unique COMMENT '닉네임',
    password varchar(16) NOT NULL COMMENT '패스워드',
    gender varchar(8) NOT NULL COMMENT '성별',
    birth timestamp NOT NULL COMMENT '생년월일',
    user_isDelete tinyint NOT NULL default 0 COMMENT '탈퇴 여부',
    user_email varchar(60) NOT NULL unique COMMENT '이메일',
    profile_image blob COMMENT '프로필 사진'
); 

create table if not exists `Channel` (
    channel_idx int primary key auto_increment COMMENT '채널 인덱스',
    channel_name varchar(30) NOT NULL COMMENT '채널명',
    channel_intro varchar(200) NULL COMMENT '채널 소개',
    channel_date timestamp NOT NULL default now() COMMENT '생성일자',
    channel_max int NOT NULL COMMENT '모집인원',
    channel_cur int NOT NULL DEFAULT 1 COMMENT '현재인원',
    channel_isDelete tinyint NOT NULL COMMENT '삭제여부'
);

create table if not exists `belong_channel` (
    belong_channel_idx int primary key auto_increment COMMENT '가입채널 인덱스',
    channel_idx int NOT NULL COMMENT '채널 인덱스',
    user_idx int NOT NULL COMMENT '유저 인덱스',
	is_admin tinyint NOT NULL COMMENT '채널장 여부',
    CONSTRAINT `fk_belong_channel_1` FOREIGN KEY (channel_idx) REFERENCES `channel` (channel_idx),
    CONSTRAINT `fk_belong_channel_2` FOREIGN KEY (user_idx) REFERENCES `user` (user_idx)
);  

create table if not exists `notice` (
    notice_idx int primary key auto_increment COMMENT '공지사항 인덱스',
    channel_idx int NOT NULL COMMENT '채널 인덱스',
    content text NOT NULL COMMENT '내용',
    notice_date timestamp default now() NOT NULL COMMENT '작성일자',
    isDelete tinyint NOT NULL DEFAULT 0 COMMENT '삭제여부',
    notice_title varchar(50) NOT NULL COMMENT '제목',
    CONSTRAINT `fk_notice_1` FOREIGN KEY (channel_idx) REFERENCES `channel` (channel_idx)
);

create table if not exists `friend` (
    friend_idx int primary key auto_increment COMMENT '친구 인덱스',
    from_user_idx int NOT NULL COMMENT '유저 인덱스',
    to_user_idx int NOT NULL COMMENT '친구 인덱스',
    are_friend tinyint NOT NULL COMMENT '친구 여부',
    CONSTRAINT `fk_friend_1` FOREIGN KEY (from_user_idx) REFERENCES `user` (user_idx),
    CONSTRAINT `fk_friend_2` FOREIGN KEY (to_user_idx) REFERENCES `user` (user_idx)
 ); 
 
create table if not exists `song` (
	song_idx int primary key auto_increment COMMENT '노래 인덱스',
    title varchar(50) NOT NULL COMMENT '제목'
);

create table if not exists `perfectplay`(
    pp_idx int primary key auto_increment COMMENT '퍼펙트 플레이 인덱스',
    user_idx int NOT NULL COMMENT '유저 인덱스',
    score int NOT NULL COMMENT '점수',
    song_idx int NOT NULL COMMENT '노래 인덱스',
    date timestamp NOT NULL COMMENT '실행 날짜',
    clear tinyint NOT NULL COMMENT '클리어 여부',
    CONSTRAINT `fk_perfectplay_1` FOREIGN KEY (user_idx) REFERENCES 
)


 