import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputWithLabel from './../../../../components/InputWithLabel';
import { createGroupAction } from './createGroupAction';

const style = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const GroupCreateModal = (props) => {
    const { isModalOpen, setIsModalOpen } = props
    const [groupName, setGroupName] = useState('')
    const [groupIntro, setGroupIntro] = useState('')
    const [channelMax, setChannelMax] = useState(1)
    const groupDetail = {
        "channel_name": groupName,
        "channel_intro": groupIntro,
        "channel_max": channelMax,
    }

    useEffect(() => {
        if (!isNaN(channelMax)) {
            setChannelMax(parseInt(channelMax))
        }
        if (channelMax >= 6) {
            setChannelMax(6)
        }
    }, [channelMax])

    return (
        <div>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        그룹 생성
                    </Typography>
                    <div>
                        <InputWithLabel
                            label='그룹명을 입력하세요'
                            value={groupName}
                            setValue={setGroupName}
                            type='text'
                            placeholder='그룹명'
                            maxLength='15'
                        />
                        <InputWithLabel
                            label='그룹 설명을 입력하세요'
                            value={groupIntro}
                            setValue={setGroupIntro}
                            type='text'
                            placeholder='채널 설명'
                            maxLength='15'
                        />
                    </div>
                    <InputWithLabel
                        label='채널 인원수를 입력하세요'
                        value={channelMax}
                        setValue={setChannelMax}
                        type='number'
                        placeholder='인원수'
                        max='6'
                        min='0'
                    />
                    <Button variant="contained"
                        onClick={() => createGroupAction(groupDetail)}
                        sx={{
                            margin: '15px'
                        }}
                    >그룹 생성하기</Button>
                </Box>
            </Modal>
        </div >
    );
};

export default GroupCreateModal;