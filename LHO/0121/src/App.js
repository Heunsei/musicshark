import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './authPages/LoginPage/LoginPage.js'
import RegisterPage from './authPages/RegisterPage/RegisterPage.js'
import { DashboardPage } from './Dashboard/Dashboard.js';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/' element={<DashboardPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
