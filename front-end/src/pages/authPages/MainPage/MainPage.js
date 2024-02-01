import React from 'react';
import { styled } from '@mui/system';
import Navbar from '../../../components/Navbar';
import { useNavigate } from 'react-router-dom';
//import styles from './MainButton/MainButton.module.css';

const BoxWrapper = styled('div')({
    width: '200%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#997B66',
    flexDirection: 'column',

})

export default function MainPage(){

    const navigate = useNavigate();
 
    const navigateToGroup = () => {
      navigate('/group');
    };

    const navigateToSingle = () => {
        navigate('/single');
      };

    return (
        <>
            <Navbar/>
            <BoxWrapper>
                <div style={{ position : 'absolute',left:'10%',overflow:'hidden', width:'100%'}}>
                    <div>
                        <h2 style={{color:'white', margin:2}}>
                            아름다운 선율을 연주하게 될<br/>
                            당신을 위해<br/>
                        </h2>
                    </div>
                    <div>
                        <h4 style={{color:'#F5A760', margin:3}} >
                            <strong>온라인</strong>으로 <strong>연습</strong>하는 <strong>악기 연주</strong>
                        </h4>
                        <br/>
                        <h3 style={{color:'#FFFADD', margin:4, fontWeight:'normal'}}>
                            친구들과 함께든 혼자서든<br/>
                            원하는 대로 즐기세요<br/>
                        </h3>
                    </div>
                    <div>
                        <button onClick={navigateToGroup}
                        style={{
                            display:'inline-block',
                            border: 'none',
                            color:'#783F26',
                            backgroundColor:'#FFFADD',                        
                            width:'6rem',
                            height:'2.5rem',
                            margin: '1rem 0.5rem 0 0',
                            padding: '0 1rem ',
                            borderRadius: '22px',
                            fontWeight:900,
                            
                        }}>
                            함께 하기
                        </button>
                        <button onClick={navigateToSingle}
                        style={{
                            display:'inline-block',
                            border: 'none',
                            color:'#783F26',
                            backgroundColor:'#FADDA4',                        
                            width:'6rem',
                            height:'2.5rem',
                            margin: '1rem 0 0 0.5rem',
                            padding: '0 1rem ',
                            borderRadius: '22px',
                            fontWeight:900,
                            
                        }}>
                            혼자 하기
                        </button>
                    </div>
                </div>
            </BoxWrapper>
        </>
    )
}