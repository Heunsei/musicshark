import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system'
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import styles from './../../GroupRoom/GroupRoom.module.css'
import InputWithLabel from '../../../../components/InputWithLabel';
import { editGroupAction } from './editGroupAction';

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
    console.log('??????', groupDetail)
    const [open, setOpen] = useState(false);

    const [groupName, setGroupName] = useState(groupDetail.channelName)
    const [groupIntro, setGroupIntro] = useState(groupDetail.channelIntro)
    const [groupMax, setGroupMax] = useState(groupDetail.channelMax)

    const [isValidMaxMember, setisValidMaxmember] = useState(true)

    const handleOpen = () => {
        setGroupName(groupDetail.channelName)
        setGroupIntro(groupDetail.channelIntro)
        setGroupMax(groupDetail.channelMax)
        setOpen(true);
    }

    const handleClose = () => {
        setGroupName(groupDetail.channelName)
        setGroupIntro(groupDetail.channelIntro)
        setGroupMax(groupDetail.channelMax)
        setOpen(false)
    };

    const handleEditGroup = async () => {
        const editInfo = {
            channelId: groupDetail.channelIdx,
            channelName: groupName,
            channelIntro: groupIntro,
            channelMax: groupMax
        }
        await editGroupAction(editInfo)
        window.location.reload();
        setOpen(false)
    }

    useEffect(() => {
        if (groupMax >= 11) {
            setGroupMax(groupMax % 10)
        } else if (groupMax >= 6) {
            setGroupMax(6)
        }
    }, [groupMax, setGroupMax, groupDetail.channelCur])

    return (
        <>
            <Container>
                <p>{groupDetail.channelName}</p>
                <p>{groupDetail.channelIntro}</p>
                <p>{`현재 인원 : ${groupDetail.channelCur} / ${groupDetail.channelMax}`}</p>
                <p>{`채널 생성일 : ${groupDetail.channelDate}`}</p>
                <button className={`${styles.groupInfoModifyBtn} ${styles.groupRoomBtn}`} onClick={handleOpen}>
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
                    <InputWithLabel value={groupName} setValue={setGroupName}
                        label='그룹명 변경' placeholder="변경할 그룹명을 입력하세요" type='text' />
                    <InputWithLabel value={groupIntro} setValue={setGroupIntro}
                        label='그룹소개 변경' placeholder="변경할 그룹소개를 입력하세요" type='text' />
                    <InputWithLabel value={groupMax} setValue={setGroupMax}
                        label='그룹최대 인원 변경' placeholder="최대 인원을 입력하세요" type='number' />
                    <div>
                        {groupMax >= 6 ? <p>최대 인원수는 6명입니다</p> : null}
                        {groupMax <= groupDetail.channelCur ? <p>최소 인원수는 {groupDetail.channelCur}명입니다</p> : null}
                    </div>
                    <div className={styles.groupInfoBtnBox}>
                        <button className={`${styles.groupRoomBtn} ${groupMax <= groupDetail.channelCur ? styles.btnDisable : ''}`}
                            disabled={groupMax <= groupDetail.channelCur} onClick={handleEditGroup}
                        > <CheckIcon /> </button>
                        <button className={`${styles.groupRoomBtn}`} onClick={handleClose}> <ClearIcon /> </button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default GroupInfoBox;