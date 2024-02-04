import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


import { addMemberAction } from './addMemberAction'
import styles from './../../GroupRoom/GroupRoom.module.css'
import { useParams } from 'react-router-dom';

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

const AddMemberButton = () => {
    const { id } = useParams()
    const [open, setOpen] = useState(false);
    const [btnDisable, setBtnDisable] = useState(true)
    const [inviteUser, SetInviteUser] = useState('')
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleValueChange = (event) => {
        const inputValue = event.target.value;
        SetInviteUser(inputValue)
        setBtnDisable(inputValue.length === 0);
    }

    return (
        <>
            <Button
                onClick={handleOpen}
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
                <AddIcon />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        멤버 초대
                    </Typography>
                    <div className={styles.inviteBox}>
                        <input className={styles.memberInput} minLength={1} placeholder={`텍스트를 입력해 주세요`}
                            type="text" value={inviteUser} onChange={handleValueChange} />
                        <button className={`${styles.addMemberBtn} ${btnDisable ? styles.btnDisable : ''}`}
                            onClick={() => addMemberAction(id, inviteUser)} disabled={btnDisable}>
                            <PersonAddIcon />
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default AddMemberButton;