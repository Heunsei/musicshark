create database if not exists ssatudio;

use ssatudio;

-- 해당 테이블에서만 쓰는 변수는 테이블명 안붙이기 ? --
-- 다른 테이블에서도 쓰는 변수는 테이블명 붙이기 ? --

select * from user;  

drop table User;

-- 사용자
create table if not exists `User` (
    user_idx int primary key auto_increment COMMENT '유저 인덱스',
    nickname varchar(16) NOT NULL unique COMMENT '닉네임',
    password TEXT NOT NULL COMMENT '패스워드',
    gender varchar(8) NOT NULL COMMENT '성별',
    birth date NOT NULL COMMENT '생년월일',
    user_isDelete tinyint NOT NULL default 0 COMMENT '탈퇴 여부',
    user_email varchar(60) NOT NULL unique COMMENT '이메일',
    profile_image blob COMMENT '프로필 사진'
); 

-- 채널
create table if not exists `Channel` (
    channel_idx int primary key auto_increment COMMENT '채널 인덱스',
    channel_name varchar(30) NOT NULL COMMENT '채널명',
    channel_intro varchar(200) NULL COMMENT '채널 소개',
    channel_date timestamp NOT NULL default now() COMMENT '생성일자',
    channel_max int NOT NULL COMMENT '모집인원',
    channel_cur int NOT NULL DEFAULT 1 COMMENT '현재인원',
    channel_isDelete tinyint NOT NULL COMMENT '삭제여부'
);

-- 가입 채널
create table if not exists `belong_channel` (
    belong_channel_idx int primary key auto_increment COMMENT '가입채널 인덱스',
    channel_idx int NOT NULL COMMENT '채널 인덱스',
    user_idx int NOT NULL COMMENT '유저 인덱스',
	is_admin tinyint NOT NULL COMMENT '채널장 여부',
    CONSTRAINT `fk_belong_channel_channel_idx` FOREIGN KEY (channel_idx) REFERENCES `channel` (channel_idx),
    CONSTRAINT `fk_belong_channel_user_idx` FOREIGN KEY (user_idx) REFERENCES `user` (user_idx)
);  

-- 공지사항
create table if not exists `notice` (
    notice_idx int primary key auto_increment COMMENT '공지사항 인덱스',
    channel_idx int NOT NULL COMMENT '채널 인덱스',
    content text NOT NULL COMMENT '내용',
    notice_date timestamp default now() NOT NULL COMMENT '작성일자',
    isDelete tinyint NOT NULL DEFAULT 0 COMMENT '삭제여부',
    notice_title varchar(50) NOT NULL COMMENT '제목',
    CONSTRAINT `fk_notice_channel_idx` FOREIGN KEY (channel_idx) REFERENCES `channel` (channel_idx)
);

-- 친구
create table if not exists `friend` (
    friend_idx int primary key auto_increment COMMENT '친구 인덱스',
    from_user_idx int NOT NULL COMMENT '유저 인덱스',
    to_user_idx int NOT NULL COMMENT '친구 인덱스',
    are_friend tinyint NOT NULL COMMENT '친구 여부',
    CONSTRAINT `fk_friend_from_user_idx` FOREIGN KEY (from_user_idx) REFERENCES `user` (user_idx),
    CONSTRAINT `fk_friend_to_user_idx` FOREIGN KEY (to_user_idx) REFERENCES `user` (user_idx)
 ); 
 
-- 노래
create table if not exists `song` (
    song_idx int primary key auto_increment COMMENT '노래 인덱스',
    title varchar(50) NOT NULL COMMENT '제목',
    singer varchar(50) COMMENT '가수',
    start_timing int NOT NULL COMMENT '시작 시간',
    running_time int NOT NULL COMMENT '재생 시간',
    mr_file varchar(300) NOT NULL COMMENT '반주'
);

-- insert into song (title, singer, start_timing, running_time, mr_file) values ('노래제목1','가수1',3,102,'엠알저장경로1');
-- insert into song (title, singer, start_timing, running_time, mr_file) values ('노래제목2','가수2',4,142,'엠알저장경로2');
-- insert into song (title, singer, start_timing, running_time, mr_file) values ('노래제목3','가수3',5,162,'엠알저장경로3');

-- 노래 바
create table if not exists `song_line` (
   song_line_idx int primary key auto_increment COMMENT '노래바 인덱스',
   song_idx int NOT NULL COMMENT '노래 인덱스',
   start_node bigint NOT NULL COMMENT '시작 노드',
   end_node bigint NOT NULL COMMENT '끝 노드',
   start_time bigint NOT NULL COMMENT '시작 시간',
   end_time bigint NOT NULL COMMENT '끝 시간',
   CONSTRAINT `fk_song_line_song_idx` FOREIGN KEY (song_idx) REFERENCES `song` (song_idx)
);

-- 퍼펙트 플레이
create table if not exists `perfectplay`(
    pp_idx int primary key auto_increment COMMENT '퍼펙트 플레이 인덱스',
    user_idx int NOT NULL COMMENT '유저 인덱스',
    score int NOT NULL COMMENT '점수',
    song_idx int NOT NULL COMMENT '노래 인덱스',
    date timestamp NOT NULL COMMENT '실행 날짜',
    clear tinyint NOT NULL COMMENT '클리어 여부',
    CONSTRAINT `fk_perfectplay_user_idx` FOREIGN KEY (user_idx) REFERENCES `user` (user_idx),
    CONSTRAINT `fk_perfectplay_song_idx` FOREIGN KEY (song_idx) REFERENCES `song` (song_idx)
);

-- 관심악기
create table if not exists `instrument` (
	user_idx int primary key auto_increment COMMENT '유저 인덱스',
    instrument varchar(20) NOT NULL COMMENT '악기 이름',
    CONSTRAINT `fk_instrument_user_idx` FOREIGN KEY (user_idx) REFERENCES `user` (user_idx)
);

-- 채팅방
create table if not exists `chatRoom` (
    chatroom_idx int primary key auto_increment COMMENT '채팅방 인덱스'
);

-- 채팅메시지
create table if not exists `chat` (
    chat_idx int primary key auto_increment COMMENT '채팅 인덱스',
    chatroom_idx int NOT NULL COMMENT '채팅방 인덱스',
    content text NOT NULL COMMENT '내용',
    chat_time timestamp NOT NULL DEFAULT now() COMMENT '작성시간',
    user_idx int NOT NULL COMMENT '유저 인덱스',
    CONSTRAINT `fk_chat_chatroom_idx` FOREIGN KEY (chatroom_idx) REFERENCES `chatroom` (chatroom_idx),
    CONSTRAINT `fk_chat_user_idx` FOREIGN KEY (user_idx) REFERENCES `user` (user_idx)
);

-- 채널 채팅방
create table if not exists `channelChatRoom` (
    chatroom_idx int primary key auto_increment COMMENT '채팅방 인덱스',
    channel_idx int NOT NULL COMMENT '채널 인덱스',
    CONSTRAINT `fk_channelChatRoom_chatroom_idx` FOREIGN KEY (chatroom_idx) REFERENCES `chatroom` (chatroom_idx),
    CONSTRAINT `fk_channelChatRoom_channel_idx` FOREIGN KEY (channel_idx) REFERENCES `channel` (channel_idx)
);

-- 게시판
create table if not exists `board` (
    board_idx int primary key auto_increment COMMENT '게시글 인덱스',
    user_idx int NOT NULL COMMENT '유저 인덱스',
    board_title varchar(100) NOT NULL COMMENT '제목',
    board_content text NOT NULL COMMENT '내용',
    board_count int NOT NULL DEFAULT 0 COMMENT '조회수',
    board_isDelete tinyint NOT NULL DEFAULT 0 COMMENT '삭제여부',
    board_date timestamp NOT NULL DEFAULT now() COMMENT '작성일자',
    CONSTRAINT `fk_board_user_idx` FOREIGN KEY (user_idx) REFERENCES `user` (user_idx)
);

-- 댓글
create table if not exists `comment` (
   comment_idx int primary key auto_increment COMMENT '댓글 인덱스',
   board_idx int NOT NULL COMMENT '게시글 인덱스',
   comment_content text NOT NULL COMMENT '내용',
   comment_date timestamp NOT NULL DEFAULT now() COMMENT '작성일자',
   comment_isDelete tinyint NOT NULL DEFAULT 0 COMMENT '삭제여부',
   user_idx int NOT NULL COMMENT '유저 인덱스',
   CONSTRAINT `fk_comment_board_idx` FOREIGN KEY (board_idx) REFERENCES `board` (board_idx),
   CONSTRAINT `fk_comment_user_idx` FOREIGN KEY (user_idx) REFERENCES `user` (user_idx)
);

-- 영상
create table if not exists `video` (
   video_idx int primary key auto_increment COMMENT '영상 인덱스',
   video_date timestamp NOT NULL DEFAULT now() COMMENT '생성일자',
   video_title varchar(20) NOT NULL COMMENT '제목',
   video_picture blob NOT NULL COMMENT '영상사진',
   user_idx int NOT NULL COMMENT '유저 인덱스',
   CONSTRAINT `fk_video_user_idx` FOREIGN KEY (user_idx) REFERENCES `user` (user_idx)
);

-- 채널 영상
create table if not exists `channel_video` (
   channel_idx int NOT NULL COMMENT '채널 인덱스',
   video_idx int NOT NULL COMMENT '영상 인덱스',
   user_idx int NOT NULL COMMENT '유저 인덱스',
   CONSTRAINT `fk_channel_video_channel_idx` FOREIGN KEY (channel_idx) REFERENCES `channel` (channel_idx),
   CONSTRAINT `fk_channel_video_video_idx` FOREIGN KEY (video_idx) REFERENCES `video` (video_idx),
   CONSTRAINT `fk_channel_video_user_idx` FOREIGN KEY (user_idx) REFERENCES `user` (user_idx) -- 유저 인덱스가 왜 필여하지?
);






 