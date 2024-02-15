import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import GroupIcon from '@mui/icons-material/Group';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import styles from './TopIcon.module.css'

import { useParams, useNavigate } from 'react-router-dom';
import { deleteGroupMemberAction } from './deleteGroupMemberAction';
import { deleteGroupAction } from './deleteGroupAction';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const TopIcon = (props) => {
    const { groupMembers } = props
    const { id } = useParams()
    const navigate = useNavigate()
    const userName = useSelector((state) => state.user.nickname)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDeleteMember = async (id) => {
        let result = window.confirm('진짜로 나갈건가요?')
        if (result) {
            await deleteGroupMemberAction(id)
        }
    }

    const handleDeleteGroup = async (id) => {
        let result = window.confirm('그룹을 삭제하시겠습니까?')
        if (result) {
            const res = await deleteGroupAction(id)
            console.log('res : ', res)
            if (res.data.message === '채널 삭제 성공') {
                navigate('/group')
            }
        }
    }

    return (
        <>
            <Button
                onClick={() => handleOpen()}
                style={{
                    witdh: '5%',
                    height: '5%',
                    borderRadius: "16px",
                    margin: 0,
                    padding: 0,
                    minWitdh: 0,
                    marginTop: '10px',
                    color: 'white',
                    backgroundColor: '#997B66'
                }}
            >
                <GroupIcon />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2"
                        sx={{ textAlign: 'center', fontFamily: 'Pretendard-Bold', marginBottom: '5px', borderBottom: '2px solid black' }}>
                        그룹 관리
                    </Typography>
                    <div className={styles.groupUserBox}>
                        {
                            groupMembers.map((element, i) => {
                                return (
                                    <div className={styles.userBox} key={i}>
                                        <p style={{ fontFamily: 'Pretendard-Medium' }}>{element.nickname}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.groupInfoButtonBox}>
                        <button className={styles.groupDeleteBtn} onClick={() => { handleDeleteMember(id) }}>
                            <ExitToAppIcon className={styles.groupDeleteIcon} />
                            <span style={{ fontFamily: 'Pretendard-Medium' }}>그룹 탈퇴</span>
                        </button>
                        <button className={styles.groupDeleteBtn} onClick={() => { handleDeleteGroup(id) }}>
                            <DeleteForeverIcon className={styles.groupDeleteIcon} />
                            <span style={{ fontFamily: 'Pretendard-Medium' }}>그룹 삭제</span>
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default TopIcon;