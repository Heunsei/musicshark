import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSongDetailAction } from './actions/getSongDetailAction';
import PlayScreen from './components/PerfectPlayPlay/PlayScreen';
import Navbar from '../../components/Navbar';

const PerfectPlayPlayPage = () => {
    const { songIdx } = useParams()
    const [songDetail, setSongDetail] = useState([])

    // useEffect(() => {
    //     const get = async () => {
    //         const res = await getSongDetailAction(songIdx)
    //         setSongDetail(res)
    //     }
    //     get()
    // }, [])

    return (
        <>
            <Navbar />
            <PlayScreen songIdx={songIdx} />
        </>
    );
};

export default PerfectPlayPlayPage;