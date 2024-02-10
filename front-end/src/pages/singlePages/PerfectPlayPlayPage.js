import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
        <PlayScreen />

    );
};

export default PerfectPlayPlayPage;