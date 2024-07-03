// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Exploreclub from './pages/president/Exploreclub';
import StudentAllClubs from './pages/student/StudentAllClubs';
import ClubDetails from './pages/president/ClubDetails';
import  Carousel1  from './components/Carousel1';
// Import other pages if necessary

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/club" element={<Exploreclub />} />
        <Route path='/club/:name' element={<ClubDetails /* sname = 'sname' cname ='cname' image = 'image' */ />} ></Route>
        <Route path='/student' element={<StudentAllClubs/>}></Route>
        <Route path='/Carousel' element={<Carousel1 />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
