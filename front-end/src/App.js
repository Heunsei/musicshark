import React from 'react';
import {  Route, Routes } from 'react-router-dom'
import LoginPage from './pages/authPages/LoginPage/LoginPage';
import RegisterPage from './pages/authPages/RegisterPage/RegisterPage';
import MainPage from './pages/authPages/MainPage/MainPage';
import GroupPage from './pages/groupPages/GroupListPage/GroupPage';
import GroupDetailPage from './pages/groupPages/GroupDetailPage/GroupDetailPage';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/group' element={<GroupPage />} />
        <Route path='/group/:id' element={<GroupDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
