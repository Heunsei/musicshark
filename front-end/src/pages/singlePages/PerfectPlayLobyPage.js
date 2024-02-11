import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import styles from './PerfectPlayPage.module.css'
import Navbar from '../../components/Navbar';
import { useSelector } from 'react-redux';
import { getSongListAction } from './actions/getSongListAction';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../util/cookie';
import axios from 'axios'

const PerfectPlayLobyPage = () => {
    const userName = useSelector((state) => state.user.nickname)
    const [userTier, setUserTier] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    // 페이지 로드 시 axios요청으로 전체 음악 조회
    const [songList, setSongList] = useState([])
    const [userInfo, setUserInfo] = useState([]);
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
        try{
            const response = await getUserAction();
            // console.log(response);
            const data = response.data;
            setUserInfo(data);
            // console.log(data);
        }
        catch(error){
            console.log(error);
        }
    }

    // 노래 리스트
    const getSongList = async () => {
        try{
            const response = await getSongListAction();
            const data = response.data.data;
            setSongList(data); // songList에 데이터 저장
            setIsLoading(false); // 데이터 로딩이 완료됨을 표시
            console.log(data);
        }catch (error){
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
        try{
            const response = await getUserTierAction();
            // console.log(response);
            const data = response.data;
            setUserTier(data);
            // console.log(data);
        }
        catch(error){
            console.log(error);
        }
    }

    // 퍼펙트 플레이 리스트
    const getPerfectPlayListAction = async () => {
        console.log(userInfo.userIdx);
        const URL = process.env.REACT_APP_API_URL
        const accessToken = getCookie('accessToken')
        try {

            const response = await axios({
                method: 'get',
                url: `${URL}/perfectplay/13`,
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
        try{
            const response = await getPerfectPlayListAction();
            console.log(response);
            const data = response.data.data;
            setPerfectPlayList(data);
            console.log(data);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
        getPerfectList();
        getSongList();
        getUserTier();
    }, [])

    const tierBoxStyle = {
        backgroundColor: "gold", // 'G4' 박스의 배경색을 황금색으로 설정합니다.
        color: "black", // 'G4' 텍스트 색상을 검은색으로 설정합니다.
        padding: "8px 12px", // 적당한 패딩을 추가합니다.
        borderRadius: "5px", // 모서리를 둥글게 합니다.
        fontWeight: "bold", // 글씨를 굵게 합니다.
        marginTop: "4%",
        marginBottom: "8%", // 'Gold 4' 텍스트와의 간격을 설정합니다.
      };
    
      const tierTextStyle = {
        marginBottom: "3%",
        fontSize: "32px", // 'Gold 4' 텍스트 크기를 크게 설정합니다.
        color: "black", // 'Gold 4' 텍스트 색상을 검은색으로 설정합니다.
        fontWeight: "bold", // 글씨를 굵게 합니다.
      };

      const innerBoxStyle = {
        display: "flex",
        flexDirection: "column",
        border: "3px solid #ccc",
        borderRadius: "3px",
        backgroundColor: "#F9FFF8",
        paddingTop: "0%",
        width: "30%", // 각 박스가 전체의 30% 차지
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

    return (
      <>
        <Navbar />
        <div className={styles.body}>
          <div className={styles.container}>
            <div className={styles.topIndicator}>
              <p>{userName}님 어서오세요</p>
              <br/>
              <p>{userInfo.userIdx}님 어서옵쇼</p>
            </div>
            <div className={styles.content}>
              <div className={styles.songList}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#997B66" }}>
                      <TableRow>
                        <TableCell>제목</TableCell>
                        <TableCell>가수</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
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
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                              navigate(`./${element.song_idx}`);
                            }}
                          >
                            {element.title}
                          </TableCell>
                          <TableCell>{element.singer}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className={styles.rightBox}>
                <div style={innerBoxStyle}>
                  <h2 style={innerTitle}>나의 티어</h2>
                  <div style={tierBoxStyle}>{userTier}</div>
                  <div style={tierTextStyle}>{userTier}</div>
                  <br />
                </div>
                <div className={styles.bottomClearList}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#997B66" }}>
                      <TableRow>
                        <TableCell>제목</TableCell>
                        <TableCell>점수</TableCell>
                        <TableCell>클리어</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        {perfectplayList.map((element) => (
                                <TableRow >
                            <TableCell>{element.title}</TableCell>
                          <TableCell>
                            {element.score}
                          </TableCell>
                          <TableCell>{element.clear ? "O" : "X"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default PerfectPlayLobyPage;