import React from 'react';
import { useRef, useEffect } from 'react';

import styles from './VideoScreen.module.css'

const VideoScreen = (props) => {
    const { streamManager } = props
    const screen = streamManager
    const videoRef = useRef(null);

    useEffect(() => {
        if (screen && !!videoRef.current) {
            screen.addVideoElement(videoRef.current);
        }
    }, [screen])

    return (
        <div>
            <video className={styles.subScreen} autoPlay ref={videoRef} />
        </div>
    );
};

export default VideoScreen;