import React from 'react';
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

const AddMemberButton = () => {
    return (
        <Button
            // onClick={createNewRoomHandler}
            style={{
                witdh: '48px',
                height: '48px',
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
    );
};

export default AddMemberButton;