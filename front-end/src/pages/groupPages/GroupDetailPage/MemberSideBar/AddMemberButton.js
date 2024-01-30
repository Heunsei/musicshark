import React, { useState } from 'react';
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material';

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

const Input = styled("input")({
    flexGrow: 1,
    height: '40px',
    border: '1px solid black',
    borderRadius: '5px',
    color: '#000000',
    background: '#ffffff',
    margin: 0,
    fontSize: "16px",
    padding: "0 5px"
})

const AddMemberButton = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [inviteUser, SetInviteUser] = useState('')
    return (
        <>
            <Button
                onClick={handleOpen}
                style={{
                    witdh: '5%',
                    height: '8%',
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
                    <Input/>
                </Box>
            </Modal>
        </>
    );
};

export default AddMemberButton;