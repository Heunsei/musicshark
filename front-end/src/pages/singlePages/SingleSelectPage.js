import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import styles from './SingleSelectPage.module.css'
import Navbar from '../../components/Navbar';
import singlePageImg from './components/img/singlePlay.png'

const SingleSelectPage = () => {
    const [isHovering, setIsHovering] = useState('')
    const navigate = useNavigate()
    return (
        <>
            <Navbar />
            <div className={styles.body}>
                <button className={`${styles.recordBtn} ${isHovering === 'record' ? styles.moveBtnAfter : null}`}
                    onMouseOver={() => setIsHovering('record')}
                    onMouseLeave={() => setIsHovering('')}
                    onClick={() => navigate('./record')}
                    style={{ backgroundImage: `/components/img/singlePlay.png`, backgroundSize: 'cover' }}>
                    SingleRecord</button>
                <button className={`${styles.perfectBtn} ${isHovering === 'perfect' ? styles.moveBtnAfter : null}`}
                    onMouseOver={() => setIsHovering('perfect')}
                    onMouseLeave={() => setIsHovering('')}
                    onClick={() => navigate('./perfect')}>
                    PerfectPlay</button>
            </div>
        </>
    );
};

export default SingleSelectPage;