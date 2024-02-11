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

const PerfectPlayLobyPage = () => {
    const userName = useSelector((state) => state.user.nickname)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    // 페이지 로드 시 axios요청으로 전체 음악 조회
    const [songList, setSongLisg] = useState([])
    const testSongList = [
        {
            song_idx: 1,
            title: '이것은 노래',
            singer: '가수는 누군가..',
        }
    ]

    useEffect(() => {
        const res = getSongListAction()
        setSongLisg(res)
    }, [])

    return (
        <>
            <Navbar />
            <div className={styles.body}>
                <div className={styles.container}>
                    <div className={styles.topIndicator}>
                        <p>{userName}님 어서오세요</p>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.songList}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: '#997B66' }}>
                                        <TableRow>
                                            <TableCell>제목</TableCell>
                                            <TableCell>가수</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {testSongList.map((element) => (
                                            <TableRow
                                                key={element.title}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" sx={{ cursor: 'pointer' }}
                                                    onClick={() => { navigate(`./${element.song_idx}`) }}>
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
                            <div className={styles.topMyInfoBox}>
                                티어 박스 & 티어 박스
                            </div>
                            <div className={styles.bottomClearList}>
                                퍼펙트 플레이 기록이 나올 박스
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PerfectPlayLobyPage;