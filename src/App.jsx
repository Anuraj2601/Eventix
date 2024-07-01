// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Exploreclub from './pages/president/Exploreclub';
import StudentAllClubs from './pages/student/StudentAllClubs';
import ClubMemberAllClubs from './pages/member/ClubMemberAllClubs';

import ClubMember from './components/ClubMember';
import ClubMemberExplore from './pages/member/ClubMemberExplore';
// Import other pages if necessary

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Exploreclub />} />       
        <Route path='/student-all-clubs' element={<StudentAllClubs/>} />
        <Route path='/member-all-clubs' element={<ClubMemberAllClubs/>} />
        <Route path="/member" element={<ClubMember />} />
        <Route path="/explore" element={<ClubMemberExplore />} />
      </Routes>
    </Router>
  );
};

export default App;
