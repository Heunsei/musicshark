import * as React from 'react';
import {Box, AppBar, Toolbar, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import NavButton from './NavButton';
// import LogoButton from './LogoButton';
import styles from './Buttons.module.css';

export default function Navbar(){

        const navigate = useNavigate();
    
        const navigateToAbout = () => {
            navigate('/about')
        }
        const navigateToGroup = () => {
            navigate('/group')
        }
        const navigateToSingle = () => {
            navigate('/single')
        }
        const navigateToCommunity = () => {
            navigate('/community')
        }
        const navigateToMyPage = () => {
            navigate('/mypage')
        }
        const navigateToRegister = () => {
            navigate('/register')
        }

        const navigateToSignIn = () => {
            navigate('/login');
            
        };
    
        const navigateToSignOut = () => {
            navigate('/');
        };
    return(
        <Box border>
            <AppBar position="static" sx={{bgcolor: "#997B66", position:"fixed", boxShadow:'none'}} >
                <Toolbar position="static" sx={{bgcolor: "#997B66", height:'120px', width:'100%', position:"fixed", boxShadow:'none'}}>
                    
                    <Typography variant="h4" component="div" sx={{flexGrow:1}}>
                        <p className={styles.logoBtn}>악기상어</p>
                        
                    </Typography>
                    
                        
                    <p className={styles.loginBtn} onClick={navigateToSignIn}>
                        Login
                    </p>

                        <p className={styles.navBtn} onClick={navigateToAbout}>
                            악기상어 소개
                        </p>
                        <p className={styles.navBtn} onClick={navigateToGroup}>
                            함께 연습하기
                        </p>
                        <p className={styles.navBtn} onClick={navigateToSingle}>
                            혼자 연습하기
                        </p>
                        <p className={styles.navBtn} onClick={navigateToCommunity}>
                            커뮤니티
                        </p>
                        <p className={styles.navBtn} onClick={navigateToMyPage}>
                            마이페이지
                        </p>

                    {/* 로그인/로그아웃 배치 */}
                </Toolbar>
            </AppBar>
        </Box>
    );
}