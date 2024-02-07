import React from 'react';

import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import styles from './GroupCallButton.module.css'

const MuteCamButton = (props) => {
    const { isCamMute, muteCam } = props
    return (
        <>
            {
                isCamMute ?
                    <button className={`${styles.groupCallBtn}`} onClick={muteCam}>
                        <VideocamOffIcon sx={{ color: '#ff4043' }} />
                    </button>
                    :
                    <button className={`${styles.groupCallBtn}`} onClick={muteCam}>
                        <VideocamIcon sx={{ color: '#f1faee' }} />
                    </button>
            }
        </>
    );
};

export default MuteCamButton;