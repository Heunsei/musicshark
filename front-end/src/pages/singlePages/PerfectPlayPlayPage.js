import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getSongDetailAction } from './actions/getSongDetailAction';
import PlayScreen from './components/PerfectPlayPlay/PlayScreen';

const PerfectPlayPlayPage = () => {
    const { song_idx } = useParams()
    const [songDetail, setSongDetail] = useState([])

    useEffect(() => {
        const get = async () => {
            const res = await getSongDetailAction(song_idx)
            setSongDetail(res)
        }
        get()
    }, [])

    return (
        <PlayScreen songIdx={song_idx}/>
    );
};

export default PerfectPlayPlayPage;