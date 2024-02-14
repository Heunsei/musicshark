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

const Container = styled('div')({
    width: '90%',
    height: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px 0'
})

// 연주 이동 버튼 & 캘린더 버튼 & 그룹 삭제 버튼
const GroupBottomBox = () => {
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
                        backgroundColor: '#C0AB9A',
                        margin: '15px',
                        color: 'black',
                        fontSize: '32px',
                        borderRadius: '15px',
                        ':hover': {
                            bgcolor: '#588157',
                        },
                    }}> 연습하기 </Button>
                <Button onClick={() => handleOpen()}
                    sx={{
                        fontFamily: "Pretendard-Medium",
                        width: '45%',
                        height: '50%',
                        backgroundColor: '#C0AB9A',
                        margin: '15px',
                        color: 'black',
                        fontSize: '32px',
                        borderRadius: '15px',
                        ':hover': {
                            bgcolor: '#588157',
                        },
                    }}> 캘린더 </Button>
            </Container>
            <button style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', border: '1px solid gray',
                fontFamily: 'Pretendard-Medium', borderRadius: '5px', boxShadow: '3px 3px',
            }}
                onClick={() => navigate('/group')}>
                <LogoutIcon /> <span>그룹 목록 페이지로</span>
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={styles.modalBox}>
                    <div>
                        <Calander />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default GroupBottomBox;