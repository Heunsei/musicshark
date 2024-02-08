import React from 'react';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';

const LogoButton=(props)=>{
    const {label, id}=props
    const navigate=useNavigate()

    const handleMove=()=>{
        if(id==="nav_logo"){
            navigate('/')
        }
    }
    return(
        <Button
            sx={{
                bgcolor:'#997B66',
                color:'#ffffff',
                fontSize:'36px',
                fontWeight:'bold',
                margin:2,
                
            }}
            onClick={handleMove}
            >
                {label} 
            </Button>
    );
}



export default LogoButton;