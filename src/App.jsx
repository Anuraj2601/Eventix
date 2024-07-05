// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Exploreclub from './pages/president/Exploreclub';
import StudentAllClubs from './pages/student/StudentAllClubs';

import ClubMemberAllClubs from './pages/member/ClubMemberAllClubs';


import StudentDashboard from './pages/student/StudentDashboard';
import ClubDetails from './pages/president/ClubDetails';

import  Carousel  from './components/Carousel';

import Board from './components/Board';

// Import other pages if necessary

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Exploreclub />} />
        <Route path='/clubs/:name' element={<ClubMemberAllClubs />} ></Route>
          

        <Route exact path="/club" element={<Exploreclub />} />
        <Route path='/club/:name' element={<ClubDetails  />} ></Route>
        <Route path='/student' element={<StudentAllClubs/>}></Route>


        <Route path='/Carousel' element={<Carousel />}></Route>

        <Route path='/Board' element={<Board />}></Route>


        <Route path='/studentdashboard' element={<StudentDashboard/>}></Route>


      </Routes>
    </Router>
  );
};

export default App;
