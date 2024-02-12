import React from 'react';
import styles from './SearchListBox.module.css'
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { addMemberAction } from './addMemberAction';
import { useParams } from 'react-router-dom';

const SearchListBox = (props) => {
    const { id } = useParams()
    const { emailOrNickname, profileImage, userIdx, setOpen } = props

    const addMember = async (id, userIdx) => {
        await addMemberAction(id, userIdx)

        setOpen(false)
    }

    return (
        <div className={styles.wrapper}>
            <p> {emailOrNickname} </p>
            <button onClick={() => { addMember(id, userIdx) }}>
                <PersonAddIcon />
            </button>
        </div>
    );
};

export default SearchListBox;