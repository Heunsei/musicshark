import React from 'react';
import { Typography } from '@mui/material';

const LoginPageHeader = () => {
    return (
        <>
        <Typography variant='h5' sx={{color : "white"}}>
            Welecome Back!
        </Typography>
        <Typography sx={{color : '#b9bbbe'}}>
            we are happy that you are with us!
        </Typography>
        </>
    );
};

export default LoginPageHeader;