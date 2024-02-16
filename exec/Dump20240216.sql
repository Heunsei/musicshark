-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ssatudio
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `belong_channel`
--

DROP TABLE IF EXISTS `belong_channel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `belong_channel` (
  `belong_channel_idx` int NOT NULL AUTO_INCREMENT COMMENT '가입채널 인덱스',
  `channel_idx` int NOT NULL COMMENT '채널 인덱스',
  `user_idx` int NOT NULL COMMENT '유저 인덱스',
  `is_admin` tinyint NOT NULL COMMENT '채널장 여부',
  PRIMARY KEY (`belong_channel_idx`),
  KEY `fk_belong_channel_channel_idx` (`channel_idx`),
  KEY `fk_belong_channel_user_idx` (`user_idx`),
  CONSTRAINT `fk_belong_channel_channel_idx` FOREIGN KEY (`channel_idx`) REFERENCES `channel` (`channel_idx`),
  CONSTRAINT `fk_belong_channel_user_idx` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `belong_channel`
--

LOCK TABLES `belong_channel` WRITE;
/*!40000 ALTER TABLE `belong_channel` DISABLE KEYS */;
/*!40000 ALTER TABLE `belong_channel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `board_idx` int NOT NULL AUTO_INCREMENT COMMENT '게시글 인덱스',
  `user_idx` int NOT NULL COMMENT '유저 인덱스',
  `board_title` varchar(100) NOT NULL COMMENT '제목',
  `board_content` text NOT NULL COMMENT '내용',
  `board_count` int NOT NULL DEFAULT '0' COMMENT '조회수',
  `board_deleted` tinyint NOT NULL DEFAULT '0' COMMENT '삭제여부',
  `board_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성일자',
  PRIMARY KEY (`board_idx`),
  KEY `fk_board_user_idx` (`user_idx`),
  CONSTRAINT `fk_board_user_idx` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `channel`
--

DROP TABLE IF EXISTS `channel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channel` (
  `channel_idx` int NOT NULL AUTO_INCREMENT COMMENT '채널 인덱스',
  `channel_name` varchar(30) NOT NULL COMMENT '채널명',
  `channel_intro` varchar(200) DEFAULT NULL COMMENT '채널 소개',
  `channel_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일자',
  `channel_max` int NOT NULL COMMENT '모집인원',
  `channel_cur` int NOT NULL DEFAULT '1' COMMENT '현재인원',
  `channel_isDelete` tinyint NOT NULL COMMENT '삭제여부',
  PRIMARY KEY (`channel_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channel`
--

LOCK TABLES `channel` WRITE;
/*!40000 ALTER TABLE `channel` DISABLE KEYS */;
/*!40000 ALTER TABLE `channel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `channel_video`
--

DROP TABLE IF EXISTS `channel_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channel_video` (
  `channel_video_idx` int NOT NULL AUTO_INCREMENT,
  `channel_idx` int NOT NULL COMMENT '채널 인덱스',
  `video_idx` int NOT NULL COMMENT '영상 인덱스',
  `user_idx` int NOT NULL COMMENT '유저 인덱스',
  PRIMARY KEY (`channel_video_idx`),
  KEY `fk_channel_video_channel_idx` (`channel_idx`),
  KEY `fk_channel_video_video_idx` (`video_idx`),
  KEY `fk_channel_video_user_idx` (`user_idx`),
  CONSTRAINT `fk_channel_video_channel_idx` FOREIGN KEY (`channel_idx`) REFERENCES `channel` (`channel_idx`),
  CONSTRAINT `fk_channel_video_user_idx` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`),
  CONSTRAINT `fk_channel_video_video_idx` FOREIGN KEY (`video_idx`) REFERENCES `video` (`video_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channel_video`
--

LOCK TABLES `channel_video` WRITE;
/*!40000 ALTER TABLE `channel_video` DISABLE KEYS */;
/*!40000 ALTER TABLE `channel_video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `channelchatroom`
--

DROP TABLE IF EXISTS `channelchatroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channelchatroom` (
  `chatroom_idx` int NOT NULL AUTO_INCREMENT COMMENT '채팅방 인덱스',
  `channel_idx` int NOT NULL COMMENT '채널 인덱스',
  PRIMARY KEY (`chatroom_idx`),
  KEY `fk_channelChatRoom_channel_idx` (`channel_idx`),
  CONSTRAINT `fk_channelChatRoom_channel_idx` FOREIGN KEY (`channel_idx`) REFERENCES `channel` (`channel_idx`),
  CONSTRAINT `fk_channelChatRoom_chatroom_idx` FOREIGN KEY (`chatroom_idx`) REFERENCES `chatroom` (`chatroom_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channelchatroom`
--

LOCK TABLES `channelchatroom` WRITE;
/*!40000 ALTER TABLE `channelchatroom` DISABLE KEYS */;
/*!40000 ALTER TABLE `channelchatroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `chat_idx` int NOT NULL AUTO_INCREMENT COMMENT '채팅 인덱스',
  `chatroom_idx` int NOT NULL COMMENT '채팅방 인덱스',
  `content` text NOT NULL COMMENT '내용',
  `chat_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성시간',
  `user_idx` int NOT NULL COMMENT '유저 인덱스',
  PRIMARY KEY (`chat_idx`),
  KEY `fk_chat_chatroom_idx` (`chatroom_idx`),
  KEY `fk_chat_user_idx` (`user_idx`),
  CONSTRAINT `fk_chat_chatroom_idx` FOREIGN KEY (`chatroom_idx`) REFERENCES `chatroom` (`chatroom_idx`),
  CONSTRAINT `fk_chat_user_idx` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatroom`
--

DROP TABLE IF EXISTS `chatroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatroom` (
  `chatroom_idx` int NOT NULL AUTO_INCREMENT COMMENT '채팅방 인덱스',
  PRIMARY KEY (`chatroom_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatroom`
--

LOCK TABLES `chatroom` WRITE;
/*!40000 ALTER TABLE `chatroom` DISABLE KEYS */;
/*!40000 ALTER TABLE `chatroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_idx` int NOT NULL AUTO_INCREMENT COMMENT '댓글 인덱스',
  `board_idx` int NOT NULL COMMENT '게시글 인덱스',
  `comment_content` text NOT NULL COMMENT '내용',
  `comment_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성일자',
  `comment_deleted` tinyint NOT NULL DEFAULT '0' COMMENT '삭제여부',
  `user_idx` int NOT NULL COMMENT '유저 인덱스',
  PRIMARY KEY (`comment_idx`),
  KEY `fk_comment_board_idx` (`board_idx`),
  KEY `fk_comment_user_idx` (`user_idx`),
  CONSTRAINT `fk_comment_board_idx` FOREIGN KEY (`board_idx`) REFERENCES `board` (`board_idx`),
  CONSTRAINT `fk_comment_user_idx` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend` (
  `friend_idx` int NOT NULL AUTO_INCREMENT COMMENT '친구 인덱스',
  `from_user_idx` int NOT NULL COMMENT '유저 인덱스',
  `to_user_idx` int NOT NULL COMMENT '친구 인덱스',
  `are_friend` tinyint NOT NULL COMMENT '친구 여부',
  PRIMARY KEY (`friend_idx`),
  KEY `fk_friend_from_user_idx` (`from_user_idx`),
  KEY `fk_friend_to_user_idx` (`to_user_idx`),
  CONSTRAINT `fk_friend_from_user_idx` FOREIGN KEY (`from_user_idx`) REFERENCES `user` (`user_idx`),
  CONSTRAINT `fk_friend_to_user_idx` FOREIGN KEY (`to_user_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instrument`
--

DROP TABLE IF EXISTS `instrument`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instrument` (
  `user_idx` int NOT NULL AUTO_INCREMENT COMMENT '유저 인덱스',
  `instrument` varchar(20) NOT NULL COMMENT '악기 이름',
  PRIMARY KEY (`user_idx`),
  CONSTRAINT `fk_instrument_user_idx` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instrument`
--

LOCK TABLES `instrument` WRITE;
/*!40000 ALTER TABLE `instrument` DISABLE KEYS */;
/*!40000 ALTER TABLE `instrument` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `notice_idx` int NOT NULL AUTO_INCREMENT COMMENT '공지사항 인덱스',
  `channel_idx` int NOT NULL COMMENT '채널 인덱스',
  `content` text NOT NULL COMMENT '내용',
  `notice_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성일자',
  `isDelete` tinyint NOT NULL DEFAULT '0' COMMENT '삭제여부',
  `notice_title` varchar(50) NOT NULL COMMENT '제목',
  PRIMARY KEY (`notice_idx`),
  KEY `fk_notice_channel_idx` (`channel_idx`),
  CONSTRAINT `fk_notice_channel_idx` FOREIGN KEY (`channel_idx`) REFERENCES `channel` (`channel_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfectplay`
--

DROP TABLE IF EXISTS `perfectplay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perfectplay` (
  `pp_idx` int NOT NULL AUTO_INCREMENT COMMENT '퍼펙트 플레이 인덱스',
  `user_idx` int NOT NULL COMMENT '유저 인덱스',
  `score` double NOT NULL COMMENT '점수',
  `song_idx` int NOT NULL COMMENT '노래 인덱스',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '실행 날짜',
  `clear` tinyint NOT NULL COMMENT '클리어 여부',
  PRIMARY KEY (`pp_idx`),
  KEY `fk_perfectplay_user_idx` (`user_idx`),
  KEY `fk_perfectplay_song_idx` (`song_idx`),
  CONSTRAINT `fk_perfectplay_song_idx` FOREIGN KEY (`song_idx`) REFERENCES `song` (`song_idx`),
  CONSTRAINT `fk_perfectplay_user_idx` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfectplay`
--

LOCK TABLES `perfectplay` WRITE;
/*!40000 ALTER TABLE `perfectplay` DISABLE KEYS */;
/*!40000 ALTER TABLE `perfectplay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `song`
--

DROP TABLE IF EXISTS `song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `song` (
  `song_idx` int NOT NULL AUTO_INCREMENT COMMENT '노래 인덱스',
  `title` varchar(50) NOT NULL COMMENT '제목',
  `singer` varchar(50) DEFAULT NULL COMMENT '가수',
  `start_timing` int NOT NULL COMMENT '시작 시간',
  `running_time` int NOT NULL COMMENT '재생 시간',
  `song_img` text NOT NULL COMMENT '노래 이미지',
  PRIMARY KEY (`song_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song`
--

LOCK TABLES `song` WRITE;
/*!40000 ALTER TABLE `song` DISABLE KEYS */;
INSERT INTO `song` VALUES (1,'언제나 몇번이라도(센과 치히로의 행방불명 OST)','키무라 유미',3,102,'https://akgishark-test-bucket-01.s3.ap-northeast-2.amazonaws.com/storage/song_img/images.jfif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240215T151133Z&X-Amz-SignedHeaders=host&X-Amz-Expires=144400&X-Amz-Credential=AKIA4IJEZKEH7OWNWSP4%2F20240215%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=4e74a8d76c9f1d3665e8ba3b654c0d86407ba1c1f16bab5c2ddaf390402f4f1c');
/*!40000 ALTER TABLE `song` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `song_line`
--

DROP TABLE IF EXISTS `song_line`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `song_line` (
  `song_line_idx` int NOT NULL AUTO_INCREMENT COMMENT '노래바 인덱스',
  `song_idx` int NOT NULL COMMENT '노래 인덱스',
  `start_node` bigint NOT NULL COMMENT '시작 노드',
  `end_node` bigint NOT NULL COMMENT '끝 노드',
  `start_time` bigint NOT NULL COMMENT '시작 시간',
  `end_time` bigint NOT NULL COMMENT '끝 시간',
  PRIMARY KEY (`song_line_idx`),
  KEY `fk_song_line_song_idx` (`song_idx`),
  CONSTRAINT `fk_song_line_song_idx` FOREIGN KEY (`song_idx`) REFERENCES `song` (`song_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song_line`
--

LOCK TABLES `song_line` WRITE;
/*!40000 ALTER TABLE `song_line` DISABLE KEYS */;
/*!40000 ALTER TABLE `song_line` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tier`
--

DROP TABLE IF EXISTS `tier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tier` (
  `user_idx` int NOT NULL COMMENT '사용자 인덱스',
  `clear_cnt` int NOT NULL DEFAULT '0' COMMENT '클리어 수',
  `user_tier` varchar(10) NOT NULL DEFAULT 'bronze' COMMENT '사용자 티어',
  KEY `fk_tier_user_idx` (`user_idx`),
  CONSTRAINT `fk_tier_user_idx` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tier`
--

LOCK TABLES `tier` WRITE;
/*!40000 ALTER TABLE `tier` DISABLE KEYS */;
/*!40000 ALTER TABLE `tier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_idx` int NOT NULL AUTO_INCREMENT COMMENT '유저 인덱스',
  `nickname` varchar(16) NOT NULL COMMENT '닉네임',
  `password` text NOT NULL COMMENT '패스워드',
  `gender` varchar(8) NOT NULL COMMENT '성별',
  `birth` date NOT NULL COMMENT '생년월일',
  `user_isDelete` tinyint NOT NULL DEFAULT '0' COMMENT '탈퇴 여부',
  `user_email` varchar(60) NOT NULL COMMENT '이메일',
  `profile_image` blob COMMENT '프로필 사진',
  PRIMARY KEY (`user_idx`),
  UNIQUE KEY `nickname` (`nickname`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_user_idx` int NOT NULL AUTO_INCREMENT,
  `roles` text,
  PRIMARY KEY (`user_user_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video` (
  `video_idx` int NOT NULL AUTO_INCREMENT COMMENT '영상 인덱스',
  `video_date` date NOT NULL DEFAULT (curdate()) COMMENT '생성일자',
  `video_title` text NOT NULL COMMENT '제목',
  `video_picture` blob COMMENT '영상사진',
  `user_idx` int NOT NULL COMMENT '유저 인덱스',
  `video_path` text NOT NULL,
  PRIMARY KEY (`video_idx`),
  KEY `fk_video_user_idx` (`user_idx`),
  CONSTRAINT `fk_video_user_idx` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16  1:13:49
