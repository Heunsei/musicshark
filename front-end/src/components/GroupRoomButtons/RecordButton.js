import React from 'react';
import styles from './GroupCallButton.module.css'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const RecordButton = (props) => {
    const { isRecording, } = props
    return (
        <>
            {
                isRecording ?
                    <button className={`${styles.groupCallBtn}`} >
                        <RadioButtonCheckedIcon sx={{ color: '#ff4043' }} />
                    </button>
                    :
                    <button className={`${styles.groupCallBtn}`} >
                        <RadioButtonUncheckedIcon sx={{ color: '#f1faee' }} />
                    </button>
            }
        </>
    );
};

export default RecordButton;