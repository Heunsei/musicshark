import React from 'react';
import styles from './GroupBox.module.css'

const GroupBox = (props) => {
    const { isShowBox } = props

    return (
        <div className={styles.groupBox}>
            <div className={styles.innerBox}>
                {
                    isShowBox ? '박스형태 컴포넌트' : '리스트형태 컴포넌트'
                }
            </div>
        </div>
    );
};

export default GroupBox;