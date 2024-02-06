import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from './pages/authPages/LoginPage/LoginPage';
import RegisterPage from './pages/authPages/RegisterPage/RegisterPage';
import MainPage from './pages/authPages/MainPage/MainPage';
import GroupPage from './pages/groupPages/GroupListPage/GroupPage';
import GroupDetailPage from './pages/groupPages/GroupDetailPage/GroupDetailPage';
<<<<<<< HEAD
import MyPage from "./pages/authPages/MyPage/MyPage";
import "./App.css";
=======

import Board from './pages/Board/Board';
import BoardList from './pages/Board/BoardList';
import BoardDetail from './pages/Board/BoardDetail';
import BoardWrite from './pages/Board/BoardWrite';
import BoardUpdate from './pages/Board/BoardUpdate'

import './App.css';
>>>>>>> 0b508c2ac70021a34c08f2f17ae2992fa75c95cb

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/group' element={<GroupPage />} />
<<<<<<< HEAD
        <Route path='/community' element={<CommunityPage/>}/>
        <Route path='/group/:id' element={<GroupDetailPage />} />
        <Route path="/mypage" element={<MyPage />} />
=======

        <Route path='/board' element={<BoardList/>}/>
        <Route path='/board/:board_id' element={<BoardDetail/>}/>
        <Route path='/create' element={<BoardWrite/>}/>
        <Route path='/update/:board_id' element={<BoardUpdate/>}/>
        <Route path='/board/:board_id' element={<BoardDetail/>}/>

        <Route path='/group/:id' element={<GroupDetailPage />} />

>>>>>>> 0b508c2ac70021a34c08f2f17ae2992fa75c95cb
      </Routes>
    </>
  );
}

export default App;
