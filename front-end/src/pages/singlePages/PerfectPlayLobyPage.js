import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import TitleIcon from '@mui/icons-material/Title';
import LyricsIcon from '@mui/icons-material/Lyrics';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FlagIcon from '@mui/icons-material/Flag';

import styles from './PerfectPlayPage.module.css'
import Navbar from '../../components/Navbar';
import { useSelector } from 'react-redux';
import { getSongListAction } from './actions/getSongListAction';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../util/cookie';
import axios from 'axios'

const PerfectPlayLobyPage = () => {
  const userName = useSelector((state) => state.user.nickname)
  const [userTier, setUserTier] = useState("");
  const userIdx = useSelector((state) => state.user.userIdx)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // 페이지 로드 시 axios요청으로 전체 음악 조회
  const [songList, setSongList] = useState([])
  const [userInfo, setUserInfo] = useState({});
  const [perfectplayList, setPerfectPlayList] = useState([]);

  // 유저 정보
  const getUserAction = async () => {
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    try {
      const response = await axios({
        method: 'get',
        url: `${URL}/user/`,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response
    } catch (err) {
      console.log(err)
    }
  }
  const getUser = async () => {
    try {
      const response = await getUserAction();
      const data = response.data;
      setUserInfo(data);
      console.log(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  // 노래 리스트
  const getSongList = async () => {
    try {
      const response = await getSongListAction();
      const data = response.data.data;
      setSongList(data); // songList에 데이터 저장
      setIsLoading(false); // 데이터 로딩이 완료됨을 표시
    } catch (error) {
      console.error(error);
    }
  };

  // 티어
  const getUserTierAction = async () => {
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    try {
      const response = await axios({
        method: 'get',
        url: `${URL}/user/tier`,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response
    } catch (err) {
      console.log(err)
    }
  }
  const getUserTier = async () => {
    try {
      const response = await getUserTierAction();
      const data = response.data;
      setUserTier(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  // 퍼펙트 플레이 리스트
  const getPerfectPlayListAction = async () => {
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    try {

      const response = await axios({
        method: 'get',
        url: `${URL}/perfectplay/${userIdx}`,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response
    } catch (err) {
      console.log(err)
    }
  }
  const getPerfectList = async () => {
    try {
      const response = await getPerfectPlayListAction();
      const data = response.data.data;
      setPerfectPlayList(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
    getSongList();
    getUserTier();
    getPerfectList();
  }, [])

  const perfectplayListStyle = {
    width: "90%", // 필요에 따라 조정하거나 제거
    height: "40%",
    border: "solid 3px silver",
    borderRadius: 7,
    position: "relative"
  }

  const innerBoxStyle = {
    display: "flex",
    flexDirection: "column",
    border: "3px solid #ccc",
    borderRadius: "3px",
    backgroundColor: "#F9FFF8",
    paddingTop: "0%",
    width: "90%", // 각 박스가 전체의 30% 차지
    height: "275px",
    textAlign: "center",
    marginTop: "15px",
    marginBottom: "15px",
    marginLeft: "10px",
    marginRight: "10px",
    alignItems: "center", // 가로축 기준으로 가운데 정렬합니다.
    // justifyContent: "center", // 세로축 기준으로 가운데 정렬합니다.
  };

  const innerTitle = {
    fontSize: "28px",
  };

  const getTierStyle = (tier) => {
    const baseStyle = { ...userTierStyle }; // 기본 userTierStyle을 복사하여 사용

    switch (tier) {
      case "bronze":
        return {
          ...baseStyle,
          backgroundColor: "#cd7f32", // Bronze 색상
          color: "white",
          marginLeft: "1.5%",
          marginRight: "3%",
          fontSize: "28px"
        };
      case "silver":
        return {
          ...baseStyle,
          backgroundColor: "#C0C0C0", // Silver 색상
          color: "white",
          fontSize: "28px"
        };
      case "gold":
        return {
          ...baseStyle,
          backgroundColor: "#FFD700", // Gold 색상
          color: "white",
          fontSize: "28px"
        };
      case "platinum":
        return {
          ...baseStyle,
          backgroundColor: "#E5E4E2", // Platinum 색상
          color: "white",
          fontSize: "28px"
        };
      case "diamond":
        return {
          ...baseStyle,
          backgroundColor: "#b9f2ff", // Diamond 색상
          color: "black", // Diamond는 밝은 색상이므로 텍스트 색상을 검정으로 변경
          fontSize: "28px"
        };
      default:
        return baseStyle; // 일치하는 티어가 없는 경우 기본 스타일 사용
    }
  };

  const userTierStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // 수평 중앙 정렬 추가
    width: "60%", // 필요에 따라 조정하거나 제거
    height: "30%",
    border: "solid", // 필요에 따라 테두리 스타일을 조정
  };

  const getTierAbbreviation = (tier) => {
    switch (
    tier.toLowerCase() // 소문자로 변환하여 대소문자 구분 없이 비교
    ) {
      case "bronze":
        return "BRONZE";
      case "silver":
        return "SILVER";
      case "gold":
        return "GOLD";
      case "platinum":
        return "PLATINUM";
      case "diamond":
        return "DIAMOND";
      default:
        return ""; // 일치하는 티어가 없는 경우 빈 문자열 반환
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.topIndicator}>
            <p style={{ fontFamily: 'Pretendard-Bold', borderBottom: '3px solid black' }}>{userName}님 어서오세요</p>
          </div>
          <div className={styles.content}>
            <div className={styles.songList}>
              <TableContainer component={Paper}>
                <Table sx={{ backgroundColor: "#F5F5DC", minWidth: 650, borderSpacing: '7px 7px', borderCollapse: 'separate' }} aria-label="simple table">
                  <TableHead sx={{ backgroundColor: "#997B66" }}>
                    <TableRow sx={{ backgroundColor: "#997B66" }} >
                      <TableCell sx={{ textAlign: 'center', borderRadius: '7px', alignItems: 'center', width: '70%' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                          <TitleIcon sx={{ color: 'white' }} />
                          <p style={{ fontFamily: 'Pretendard-Bold', fontSize: '17px', fontWeight: 'bold', color: 'white' }}>제목</p>
                        </div>
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', borderRadius: '7px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                          <LyricsIcon sx={{ color: 'white' }} />
                          <p style={{ fontFamily: 'Pretendard-Bold', fontSize: '17px', fontWeight: 'bold', color: 'white' }}>가수</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody >
                    {songList.map((element) => (
                      <TableRow
                        key={element.title}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            fontFamily: 'Pretendard-Medium', cursor: "pointer", width: '70%',
                            textAlign: 'center', borderRadius: '5px', alignItems: 'center', boxShadow: '1px 1px 1px gray'
                          }}
                          onClick={() => {
                            navigate(`./${element.songIdx}`);
                          }}
                        >
                          {element.title}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: 'Pretendard-Medium', cursor: "pointer",
                            textAlign: 'center', borderRadius: '5px', alignItems: 'center', boxShadow: '1px 1px 1px gray'
                          }}
                        >{element.singer}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.rightBox}>
              <div className={styles.rightTierBox}>
                <h2 style={innerTitle}>나의 티어</h2>
                <div style={getTierStyle(userTier)}>
                  {getTierAbbreviation(userTier)}
                </div>
              </div>
              <div className={styles.perfectplayList}>
                <TableContainer component={Paper} sx={{ height: "100%" }}>
                  <Table sx={{ backgroundColor: "#F5F5DC", borderSpacing: '7px 7px', borderCollapse: 'separate' }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#997B66" }}>
                      <TableRow>
                        <TableCell sx={{ textAlign: 'center', borderRadius: '7px', alignItems: 'center' }}>
                          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <TitleIcon sx={{ color: 'white' }} />
                            <p style={{ fontFamily: 'Pretendard-Bold', fontSize: '17px', fontWeight: 'bold', color: 'white' }}>제목</p>
                          </div>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center', borderRadius: '7px', alignItems: 'center', width: '23%' }}>
                          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <MusicNoteIcon sx={{ color: 'white' }} />
                            <p style={{ fontFamily: 'Pretendard-Bold', fontSize: '17px', fontWeight: 'bold', color: 'white' }}>점수</p>
                          </div>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center', borderRadius: '7px', alignItems: 'center', width: '23%' }}>
                          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <FlagIcon sx={{ color: 'white' }} />
                            <p style={{ fontFamily: 'Pretendard-Bold', fontSize: '17px', fontWeight: 'bold', color: 'white' }}>클리어</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {perfectplayList.map((element) => (
                        <TableRow>
<<<<<<< HEAD
                          <TableCell sx={{ fontFamily: 'Pretendard-Medium', }}>{element.title}</TableCell>
                          <TableCell sx={{ fontFamily: 'Pretendard-Medium', width: '23%' }}>{element.score}</TableCell>
                          <TableCell sx={{ fontFamily: 'Pretendard-Medium', width: '23%' }}>{element.clear ? "O" : "X"}</TableCell>
=======
                          <TableCell sx={{ fontFamily: 'Pretendard-Medium' }}>{element.title}</TableCell>
                          <TableCell sx={{ fontFamily: 'Pretendard-Medium' }}>{element.score.toFixed(2)}</TableCell>
                          <TableCell sx={{ fontFamily: 'Pretendard-Medium' }}>{element.clear ? "O" : "X"}</TableCell>
>>>>>>> 1c60bb4ac1920529125a129f5e1debb56a952556
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default PerfectPlayLobyPage;
