import React from 'react';

import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';
import styles from './GroupCallButton.module.css'

const MuteMicButton = (props) => {
    const { isMicMute, muteMic } = props
    return (
        <>
            {
                isMicMute ?
                    (<button className={`${styles.groupCallBtn}`} onClick={muteMic}>
                        <MicOffIcon sx={{ color: '#ff4043' }} />
                    </button>)
                    :
                    (<button className={`${styles.groupCallBtn}`} onClick={muteMic}>
                        <MicIcon sx={{ color: '#f1faee' }} />
                    </button>)
            }
        </>
    );
};

export default MuteMicButton;