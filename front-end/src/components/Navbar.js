import * as React from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import NavButton from './NavButton';
import LogoButton from './LogoButton';

export default function Navbar() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#997B66", position: "fixed", boxShadow: 'none' }} >
        <Toolbar>

          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            <LogoButton id="nav_logo" label={"악기상어"}></LogoButton>

          </Typography>

          <NavButton id="nav_about" label={"악기상어 소개"}></NavButton>
          <NavButton id="nav_group" label={"함께 연습하기"}></NavButton>
          <NavButton id="nav_single" label={"혼자 연습하기"}></NavButton>
          <NavButton id="nav_community" label={"커뮤니티"}></NavButton>
          <NavButton id="nav_mypage" label={"마이페이지"}></NavButton>

          {/* 로그인/로그아웃 배치 */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}