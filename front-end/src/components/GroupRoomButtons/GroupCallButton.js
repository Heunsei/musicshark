import React from 'react';
import CallEndIcon from '@mui/icons-material/CallEnd';
import CallIcon from '@mui/icons-material/Call';

import styles from './GroupCallButton.module.css'


const GroupCallButton = (props) => {
    const { isJoin, leaveSession, joinSession, sessionId } = props
    return (
        <>
            {
                // 입장 퇴장 버튼을 isJoin State로 관리
                !isJoin ?
                    (<button className={`${styles.joinButton}`} onClick={joinSession} disabled={isJoin}>
                        <CallIcon />
                    </button>)
                    :
                    (<button className={styles.disable} onClick={() => leaveSession(sessionId)} disabled={!isJoin} >
                        <CallEndIcon sx={{ color: '#ffffff' }} />
                    </button>)
            }
        </>

    );
};

export default GroupCallButton;