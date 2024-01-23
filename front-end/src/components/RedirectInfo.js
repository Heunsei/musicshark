import React from 'react';
import { styled } from '@mui/material';

const RedirectText = styled('p')({
    color: '#00AFF4',
    float: 'right',
    display: 'inline-block',
    margin: '0 5px',
    cursor: 'pointer',
})
const RedirectInfo = ({
    redirectText,
    redirectHandler,
}) => {
    return (
        <RedirectText onClick={redirectHandler}>{redirectText}</RedirectText>
    );
};

export default RedirectInfo;