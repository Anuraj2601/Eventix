// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Exploreclub from './pages/president/Exploreclub';
import StudentAllClubs from './pages/student/StudentAllClubs';
import ClubMemberAllClubs from './pages/member/ClubMemberAllClubs';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Exploreclub />} />
        <Route path='/club/:name' element={<ClubMemberAllClubs />} ></Route>
        <Route path="/student" element={<StudentAllClubs />} />       
      </Routes>
    </Router>
  );
};

export default App;
