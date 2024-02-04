import React, { useState } from 'react';
import { styled } from '@mui/system'
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import styles from './../../GroupRoom/GroupRoom.module.css'
import InputWithLabel from '../../../../components/InputWithLabel';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const Container = styled('div')({
    backgroundColor: '#C0AB9A',
    width: '90%',
    height: '50%',
    position: 'relative',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: '15px',
    overflow: 'auto'
})
// group detail은 GroupDetailPage에서 props 받아옴
const GroupInfoBox = (props) => {
    const { groupDetail } = props
    const [open, setOpen] = useState(false);
    const [GroupName, setGroupName] = useState(groupDetail.channelName)
    const [GroupIntro, setGroupIntro] = useState(groupDetail.channelIntro)
    const [GroupMax, setGroupMax] = useState(groupDetail.channelIdx)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setGroupName('')
        setGroupIntro('')
        setGroupMax(groupDetail.channelIdx)
        setOpen(false)
    };

    return (
        <>
            <Container>
                <p>{groupDetail.channelName}</p>
                <p>{groupDetail.channelIntro}</p>
                <p>{`현재 인원 : ${groupDetail.channelCur} / ${groupDetail.channelIdx}`}</p>
                <p>{`채널 생성일 : ${groupDetail.channelDate}`}</p>
                <button className={styles.groupInfoModifyBtn} onClick={handleOpen}>
                    <EditIcon />
                </button>
            </Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <InputWithLabel value={GroupName} setValue={setGroupName}
                        label='그룹명 변경' placeholder="변경할 그룹명을 입력하세요" type='text' />
                    <InputWithLabel value={GroupIntro} setValue={setGroupIntro}
                        label='그룹소개 변경' placeholder="변경할 그룹소개를 입력하세요" type='text' />
                    <InputWithLabel value={GroupMax} setValue={setGroupMax}
                        label='그룹최대 인원 변경' placeholder="최대 인원을 입력하세요" type='number' />
                    <button> <CheckIcon /> </button>
                    <button onClick={handleClose}> <ClearIcon /> </button>
                </Box>
            </Modal>
        </>
    );
};

export default GroupInfoBox;