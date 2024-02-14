import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from './pages/authPages/LoginPage/LoginPage';
import RegisterPage from './pages/authPages/RegisterPage/RegisterPage';
import MainPage from './pages/authPages/MainPage/MainPage';
import GroupPage from './pages/groupPages/GroupListPage/GroupPage';
import GroupDetailPage from './pages/groupPages/GroupDetailPage/GroupDetailPage';
import MyPage from "./pages/authPages/MyPage/MyPage";
import SingleSelectPage from "./pages/singlePages/SingleSelectPage";
import PerfectPlayLobyPage from "./pages/singlePages/PerfectPlayLobyPage";
import PerfectPlayPlayPage from "./pages/singlePages/PerfectPlayPlayPage";
import SingleRecordPage from "./pages/singlePages/SingleRecordPage";

import KakaoLoginHandler from "./pages/authPages/LoginPage/KakaoLoginHandler";

import BoardList from './pages/Board/BoardList';
import BoardDetail from './pages/Board/BoardDetail';
import BoardCreate from './pages/Board/BoardCreate';
import BoardUpdate from './pages/Board/BoardUpdate';

import PrivateRoute from "./util/PrivateRoute";
import PublicRoute from "./util/PublicRoute";

import ProfileEdit from "./pages/authPages/MyPage/ProfileEdit";

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path="auth/kakao/*" element={<KakaoLoginHandler />} />
        <Route path='/board' element={<BoardList />} />
        <Route path='/board/:board_id' element={<BoardDetail />} />
        <Route element={<PrivateRoute />}>
          <Route path='/group' element={<GroupPage />} />
          <Route path='/group/:id' element={<GroupDetailPage />} />
          <Route path='/single/record' element={<SingleRecordPage />} />
          <Route path='/single/perfect' element={<PerfectPlayLobyPage />} />
          <Route path='/single/perfect/:songIdx' element={<PerfectPlayPlayPage />} />
          <Route path='/single' element={<SingleSelectPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/:userId" element={<ProfileEdit />} />
          <Route path='/board/create' element={<BoardCreate />} />
          <Route path='/update/:board_id' element={<BoardUpdate />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path='/group/:id' element={<GroupDetailPage />} />
          {/* <Route path='/about' element={<AboutPage />} /> */}
        </Route>
        <Route element={<PublicRoute />}>
          <Route path='/login' element={<LoginPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
