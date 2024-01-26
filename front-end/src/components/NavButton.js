import React from 'react';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';


const NavButton=(props)=>{
    const { label, id } = props
    const navigate = useNavigate()
    
    const handleMove = () => {
        if(id==="nav_about"){
            navigate('/login')
        }
        else if(id==="nav_group"){
            navigate('/register')
        }
        else if(id==="nav_single"){
            navigate('/register')
        }
        else if(id==="nav_community"){
            navigate('/register')
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

// import {Link} from 'react-touter-dom';
// import Button from '@mui/material/Button'
// import React from 'react';
// import './Nav';


// function NavButton(){
//     return(
//         <div>
//             <div className="navbar">
//                 <Link className="navbarMenu" to={'/'}>Main</Link>
//                 <Link className="navbarMenu" to={'/about'}> About</Link>
//                 <Link className="navbarMenu" to= {'/contact'}>contact</Link>
//             </div>
//         </div>
//    ); 
// }

// export default Nav;