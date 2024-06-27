// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Exploreclub from './pages/Exploreclub';
import StudentAllClubs from './pages/StudentAllClubs';
// Import other pages if necessary

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Exploreclub />} />
        <Route path='/student' element={<StudentAllClubs/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
