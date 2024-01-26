import React, { useState } from 'react';
import axios from 'axios';
import styles from './GroupInput.module.css'


const GroupInput = (props) => {
    const { value, setValue } = props

    const [isLoading, setIsLoading] = useState(false)

    const checkGroupList = (event) => {
        // 이곳에서 그룹 리스트를 요청하는 ajax요청을 보냄
        setValue(event.target.value)
    }

    return (
        <div className={styles.groupInputBox}>
            <input className={styles.customInput}
                placeholder='검색할 그룹명을 입력하세요'
                value={value}
                onChange={checkGroupList}
                maxLength={20}
            />
        </div>
    );
};

export default GroupInput;