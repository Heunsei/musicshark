import React from 'react';
import Button from '@mui/material/Button';
import GroupIcon from '@mui/icons-material/Group';

const TopIcon = () => {
    return (
        <Button
            style = {{
                witdh : '5%',
                height : '5%',
                borderRadius : "16px",
                margin : 0,
                padding : 0,
                minWitdh : 0,
                marginTop : '10px',
                color : 'white',
                backgroundColor : '#997B66'
            }}
        >
            <GroupIcon />
        </Button>
    );
};

export default TopIcon;