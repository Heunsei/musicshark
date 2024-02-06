import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from './pages/authPages/LoginPage/LoginPage';
import RegisterPage from './pages/authPages/RegisterPage/RegisterPage';
import MainPage from './pages/authPages/MainPage/MainPage';
import GroupPage from './pages/groupPages/GroupListPage/GroupPage';
import GroupDetailPage from './pages/groupPages/GroupDetailPage/GroupDetailPage';
import MyPage from "./pages/authPages/MyPage/MyPage";
import SingleSelectPage from "./pages/singlePages/SingleSelectPage";
import PerfectPlayPage from "./pages/singlePages/PerfectPlayPage";
import SingleRecordPage from "./pages/singlePages/SingleRecordPage";

import Board from './pages/Board/Board';
import BoardList from './pages/Board/BoardList';
import BoardDetail from './pages/Board/BoardDetail';
import BoardWrite from './pages/Board/BoardWrite';
import BoardUpdate from './pages/Board/BoardUpdate'

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/group' element={<GroupPage />} />
        <Route path='/single' element={<SingleSelectPage />}>
          <Route path='record' element={<SingleRecordPage />} />
          <Route path='perfect' element={<PerfectPlayPage />} />
        </Route>
        <Route path='/board' element={<BoardList />} />
        <Route path='/create' element={<BoardWrite />} />
        <Route path='/update/:board_id' element={<BoardUpdate />} />
        <Route path='/board/:board_id' element={<BoardDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path='/group/:id' element={<GroupDetailPage />} />

      </Routes>
    </>
  );
}

export default App;
