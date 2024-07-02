// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Exploreclub from './pages/president/Exploreclub';
import StudentAllClubs from './pages/student/StudentAllClubs';
import StudentDashboard from './pages/student/StudentDashboard';
// Import other pages if necessary

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Exploreclub />} />
        <Route path='/student' element={<StudentAllClubs/>}></Route>
        <Route path='/studentdashboard' element={<StudentDashboard/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
