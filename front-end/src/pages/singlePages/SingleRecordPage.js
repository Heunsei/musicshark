import React, { useState } from 'react';

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import styles from './SingleRecordPage.module.css'
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

const SingleRecordPage = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const navigate = useNavigate()
    const handlePlay = () => {
        setIsPlaying(!isPlaying)
        console.log(isPlaying)
    }

    

    return (
        <>
            <Navbar />
            <div className={styles.background}>
                <div className={styles.container}>
                    <div className={styles.screenBox}>
                        <div className={styles.screen}>
                            녹화 화면 컴포넌트?
                        </div>
                        <div className={styles.recordList}>
                            녹화 리스트 컴포넌트?
                        </div>
                    </div>
                    <div className={styles.buttonBox}>
                        {
                            !isPlaying ?
                                (<button onClick={() => handlePlay()}>
                                    <PlayCircleFilledWhiteIcon /> <span>시작하기</span>
                                </button>) :
                                (<button onClick={() => handlePlay()}>
                                    <StopCircleIcon /> <span>중지</span>
                                </button>)
                        }

                        <button onClick={() => navigate('/single')} style={{ position: 'absolute', right: '30px' }}>
                            <LogoutIcon />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleRecordPage;