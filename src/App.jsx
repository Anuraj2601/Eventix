// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Exploreclub from './pages/president/Exploreclub';
import StudentAllClubs from './pages/student/StudentAllClubs';
import StudentDashboard from './pages/student/StudentDashboard';
import ClubDetails from './pages/president/ClubDetails';
import ClubRegistration from './pages/student/ClubRegistration';
// Import other pages if necessary

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Exploreclub />} />
        <Route path='/club/:name' element={<ClubDetails />} ></Route>
        <Route path='/student' element={<StudentAllClubs/>}></Route>
        <Route path='/studentdashboard' element={<StudentDashboard/>}></Route>
        <Route path='/clubregister/:name' element={<ClubRegistration/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
