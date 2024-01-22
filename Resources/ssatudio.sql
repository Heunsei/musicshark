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
)

create table if not exists `notice` (
    notice_idx int primary key auto_increment COMMENT '공지사항 인덱스',
    
)

 