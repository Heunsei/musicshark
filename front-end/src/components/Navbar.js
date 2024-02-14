    import * as React from 'react';
    import { Box, AppBar, Toolbar, Typography, TableRow, Table } from '@mui/material';
    import { useNavigate } from 'react-router-dom';
    // import NavButton from './NavButton';
    // import LogoButton from './LogoButton';
    import styles from './Buttons.module.css';
    import sharklogo from '../assets/sharklogo.png';
    import userSlice from '../redux/store/userSlice';

    import { logoutAction } from './../pages/authPages/LoginPage/logoutAction';
import { useDispatch, useSelector } from 'react-redux';
import getUserAction from './../pages/authPages/LoginPage/getUserAction';

export default function Navbar() {
        const navigate = useNavigate();
        const dispatch = useDispatch()
        const navigateToAbout = () => {
            navigate('/about')
        }
        const navigateToGroup = () => {
            navigate('/group')
        }
        const navigateToSingle = () => {
            navigate('/single')
        }
        const navigateToBoard = () => {
            navigate('/board')
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
        const navigateToMain = () => {
            navigate('/');
        };

        
             

        const loginState = useSelector((state) => state.login.login)
        const userNickname=useSelector((state)=>state.user.nickname)

        console.log("확인용입니다"+userNickname)

        return (
        <Box sx={{flexGrow:1}}>
            <AppBar position="static" sx={{bgcolor: "#997B66"}} >
                <Toolbar style={{height:100}}>

                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} style={{width:"20%", margin:"3%"}}>
                        <table>
                            
                            <div className={styles.logoBtn} onClick={navigateToMain}>
                            <img src={sharklogo}/>
                            {/* <tr><td><img src={sharklogo}/></td>
                            <td>악기</td>
                            <td>상어</td>
                            </tr> */}
                            
                            </div>
                        </table>
                        

                    </Typography>

                        <Table style={{width:"100%", marginRight:0}}>
                                <colgroup>
                                    <col style={{width:"20%"}}/>
                                    <col style={{width:"20%"}}/>
                                    <col style={{width:"20%"}}/>
                                    <col style={{width:"20%"}}/>
                                    <col style={{width:"20%"}}/>
                                    <col style={{width:"20%"}}/>
                                </colgroup>
                            
                        <TableRow>
                            <td colSpan={4} style={{textAlign:'right'}}>
                            {
                                !loginState ? 
                                <text>{userNickname}</text>:(
                                <text>반갑습니다 {userNickname}님&nbsp;&nbsp;&nbsp;</text>)
                            }

                                
                               { !loginState ? 
                                (<button onClick={()=>{
                                    navigateToSignIn();
                                }}>
                                로그인
                                </button>) :
                                (<button onClick={() => {
                                    logoutAction(navigate, dispatch)
                                }}> 
                                 로그아웃
                                    </button>
                                    )
                                    
                            }

                            </td>
                        </TableRow>
                        <TableRow>
                            <td>
                                <div className={styles.navBtn} onClick={navigateToAbout}>
                                    악기상어 소개
                                </div>
                            </td>
                            <td>
                                <div className={styles.navBtn} onClick={navigateToGroup}>
                                    함께 연습하기
                                </div>
                            </td>
                            <td>
                                <div className={styles.navBtn} onClick={navigateToSingle}>
                                    혼자 연습하기
                                </div>
                            </td>
                            <td>
                                <div className={styles.navBtn} onClick={navigateToBoard}>
                                    커뮤니티
                                </div>
                            </td>
                            <td>
                                <div className={styles.navBtn} onClick={navigateToMyPage}>
                                    마이페이지
                                </div>
                            </td>
                        </TableRow>
                    </Table>

                    {/* 로그인/로그아웃 배치 */}
                </Toolbar>
            </AppBar>
        </Box >
    );
}
