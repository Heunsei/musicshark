import React from 'react';

import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';

const MuteMicButton = (props) => {
    const { isMicMute, muteMic } = props
    return (
        <>
            {
                isMicMute ?
                    (<button onClick={muteMic}>
                        <MicOffIcon sx={{ color: '#ff4043' }} />
                    </button>)
                    :
                    (<button onClick={muteMic}>
                        <MicIcon sx={{ color: '#f1faee' }} />
                    </button>)
            }
        </>
    );
};

export default MuteMicButton;