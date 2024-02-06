import React from 'react';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';



const NavButton=(props)=>{
    const { label, id } = props
    const navigate = useNavigate()
    
    const handleMove = () => {
        if(id==="nav_about"){
            navigate('/about')
        }
        else if(id==="nav_group"){
            navigate('/group')
        }
        else if(id==="nav_single"){
            navigate('/single')
        }
        else if(id==="nav_community"){
            navigate('/community')
        }
        else if(id==="nav_mypage"){
            navigate('/register')
        }
    }

    return(
        <Button
            sx={{
                bgcolor:'#997B66',
                color:'#ffffff',
                fontSize:'18px',
                fontWeight:'bold',
                mx:5
            }}
            onClick={handleMove}
            >
                {label} 
            </Button>
    );
};

export default NavButton;
