// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/globals.css'
import Exploreclub from './pages/president/Exploreclub';
import StudentAllClubs from './pages/student/StudentAllClubs';

import ClubMemberAllClubs from './pages/member/ClubMemberAllClubs';

import StudentDashboard from './pages/student/StudentDashboard';
import ClubDetails from './pages/president/ClubDetails';

import EventRequests from './pages/admin/EventRequests';

import ClubRegistration from './pages/student/ClubRegistration';


import  Carousel  from './components/Carousel';

import Board from './components/Board';
import Toggle from './components/election/Toggle';
import AddEvent from './components/AddEvent';
import Calendar from './components/Calendar';


// Import other pages if necessary

const App = () => {
  return (
    <Router>
      <Routes>

        <Route exact path="/" element={<Exploreclub />} />
        <Route path='/clubs/:name' element={<ClubMemberAllClubs />} ></Route>
        

        <Route exact path="/club" element={<Exploreclub />} />
        <Route path='/club/:name' element={<ClubDetails  />} ></Route>
        <Route path='/club/:name/add-event' element={<AddEvent />} ></Route>
        <Route path='/calendar' element={<Calendar />}></Route>

        <Route path='/student' element={<StudentAllClubs/>}></Route>
        <Route path='/admin' element={<EventRequests/>}></Route>


        <Route path='/Carousel' element={<Carousel />}></Route>

        <Route path='/Board' element={<Board />}></Route>


        <Route path='/studentdashboard' element={<StudentDashboard/>}></Route>
        <Route path='/clubregister/:name' element={<ClubRegistration/>}></Route>


        <Route path='/Toggle' element={<Toggle />} />
      </Routes>
    </Router>
  );
};

export default App;

