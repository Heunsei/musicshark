import React from 'react';
import Button from '@mui/material/Button'

const NavButton=({
    label, onClick,
})=>{
    return(
        <Button
            sx={{
                bgcolor:'#997B66',
                color:'#ffffff',
                fontSize:'18px',
                fontWeight:'bold',
                mx:5
            }}
            >
                {label}
            </Button>
    );
};

export default NavButton;