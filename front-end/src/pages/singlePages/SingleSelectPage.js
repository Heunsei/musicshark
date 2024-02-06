import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import styles from './SingleSelectPage.module.css'
import Navbar from '../../components/Navbar';

const SingleSelectPage = () => {
    const [isHovering, setIsHovering] = useState('')
    const navigate = useNavigate()
    return (
        <div className={styles.body}>
            <button className={`${styles.moveBtn} ${isHovering === 'record' ? styles.moveBtnAfter : null}`}
                onMouseOver={() => setIsHovering('record')}
                onMouseLeave={() => setIsHovering('')}
                onClick={() => navigate('./record')}>
                녹화 페이지로</button>
            <button className={`${styles.moveBtn} ${isHovering === 'perfect' ? styles.moveBtnAfter : null}`}
                onMouseOver={() => setIsHovering('perfect')}
                onMouseLeave={() => setIsHovering('')}
                onClick={() => navigate('./perfect')}>
                퍼펙트 플레이로</button>
        </div>
    );
};

export default SingleSelectPage;