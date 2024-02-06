import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import GroupIcon from '@mui/icons-material/Group';

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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        그룹 관리
                    </Typography>
                    {
                        groupMembers.map((element, i) => {
                            return (
                                <p>{element.nickname}</p>
                            )
                        }

                        )} 
                </Box>
            </Modal>
        </>
    );
};

export default TopIcon;