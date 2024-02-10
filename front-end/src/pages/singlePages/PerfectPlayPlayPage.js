import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import { getSongDetailAction } from './actions/getSongDetailAction';
import PlayScreen from './components/PerfectPlayPlay/PlayScreen';
import styles from './PerfectPlayPlayPage.module.css'

const PerfectPlayPlayPage = () => {
    const { song_idx } = useParams()
    const [songDetail, setSongDetail] = useState([])
    const [isPlaying, setIsPlaying] = useState(false)
    const navigate = useNavigate()
    
    const startPlay = () => {
        //setIsPlaying(true)
        //console.log(isPlaying)
        //startButtonClick();
    }
    const stopPlay = () => {
        //setIsPlaying(false);
        //stopButtonClick();
    }

    useEffect(() => {
        const get = async () => {
            const res = await getSongDetailAction(song_idx)
            setSongDetail(res)
        }
        get()
    }, [])

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.screenBox}>
                    <PlayScreen />
                </div>
                <div className={styles.buttonBox}>
                    {
                        !isPlaying ?
                            (<button onClick={() => startPlay()}>
                                <PlayCircleFilledWhiteIcon /> <span>시작하기</span>
                            </button>) :
                            (<button onClick={() => stopPlay()}>
                                <StopCircleIcon /> <span>중지</span>
                            </button>)
                    }

                    <button onClick={() => navigate('/single/perfect')} style={{ position: 'absolute', right: '30px' }}>
                        <LogoutIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PerfectPlayPlayPage;