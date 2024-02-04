import React from 'react';

import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

const MuteCamButton = (props) => {
    const { isCamMute, muteCam } = props
    return (
        <>
            {
                isCamMute ?
                    <button onClick={muteCam}>
                        <VideocamOffIcon sx={{ color: '#ff4043' }} />
                    </button>
                    :
                    <button onClick={muteCam}>
                        <VideocamIcon sx={{ color: '#f1faee' }} />
                    </button>
            }
        </>
    );
};

export default MuteCamButton;