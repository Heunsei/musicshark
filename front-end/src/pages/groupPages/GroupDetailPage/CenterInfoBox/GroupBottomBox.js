import React from 'react';
import { styled } from '@mui/system'
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setLoby } from '../../../../redux/store/lobySlice';
import Modal from '@mui/material/Modal';

import styles from './GroupBottomBox.module.css'
import Calander from './../../../authPages/MyPage/Calendar'
import zIndex from '@mui/material/styles/zIndex';

const Container = styled('div')({
    width: '90%',
    height: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px 0'
})

// 연주 이동 버튼 & 캘린더 버튼 & 그룹 삭제 버튼
const GroupBottomBox = (props) => {
    const { isCalander, setIsCalander } = props
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Container>
                <Button
                    onClick={() => {
                        dispatch(setLoby(false))
                    }}
                    sx={{
                        fontFamily: "Pretendard-Medium",
                        width: '45%',
                        height: '50%',
                        backgroundColor: 'white',
                        margin: '10px',
                        color: 'black',
                        fontSize: '32px',
                        borderRadius: '15px',
                        transition: '0.5s',
                        ':hover': {
                            bgcolor: '#588157',
                            color: 'white',
                        },
                    }}> 연습하기 </Button>
                <Button onClick={() => setIsCalander(!isCalander)}
                    sx={{
                        fontFamily: "Pretendard-Medium",
                        width: '45%',
                        height: '50%',
                        backgroundColor: 'white',
                        margin: '10px',
                        color: 'black',
                        fontSize: '32px',
                        borderRadius: '15px',
                        transition: '0.5s',

                        ':hover': {
                            bgcolor: '#588157',
                            color: 'white',
                        },
                    }}> 캘린더 </Button>
            </Container>
            <div style={{ height: '10%' }} >
                <button className={styles.moveToLobyBtn}
                    onClick={() => navigate('/group')}>
                    <LogoutIcon /> <span>그룹 목록 페이지로</span>
                </button>
            </div>
        </>
    );
};

export default GroupBottomBox;