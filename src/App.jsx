// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Exploreclub from './pages/president/Exploreclub';
import StudentAllClubs from './pages/student/StudentAllClubs';
import StudentDashboard from './pages/student/StudentDashboard';
import ClubDetails from './pages/president/ClubDetails';
import Board from './components/Board';
// Import other pages if necessary

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/club" element={<Exploreclub />} />
        <Route path='/club/:name' element={<ClubDetails /* sname = 'sname' cname ='cname' image = 'image' */ />} ></Route>
        <Route path='/student' element={<StudentAllClubs/>}></Route>

        <Route path='/Board' element={<Board />}></Route>

        <Route path='/studentdashboard' element={<StudentDashboard/>}></Route>

      </Routes>
    </Router>
  );
};

export default App;
