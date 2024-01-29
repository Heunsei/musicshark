import React from 'react';
import { styled } from '@mui/system'
import Button from '@mui/material/Button';

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
    return (
        <Container>
            <Button sx={{
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
            <Button sx={{
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
    );
};

export default GroupBottomBox;