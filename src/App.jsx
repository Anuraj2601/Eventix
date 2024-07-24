
/* import React from 'react'; */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Exploreclub from './pages/president/Exploreclub';
import StudentAllClubs from './pages/student/StudentAllClubs';
import Landing from "./pages/Landing";
import Login from './components/login';
import Signup from "./components/Signup";


import ClubMemberAllClubs from './pages/member/ClubMemberAllClubs';

import StudentDashboard from './pages/student/StudentDashboard';
import ClubDetails from './pages/president/ClubDetails';

import EventRequests from './pages/admin/EventRequests';

import ClubRegistration from './pages/student/ClubRegistration';




/* import Board from './components/Board'; */
/* import Toggle from './components/election/Toggle'; */
import AddEvent from './components/AddEvent';

import MainAnnouncement from './components/MainAnnouncement';



// Import other pages if necessary


const App = () => {
  return (
    <div>
     <Router>
      <Routes>

        <Route exact path="/" element={<Landing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>

        <Route path="/Announcement" element={<MainAnnouncement />}></Route>


      

      <Route path='/clubs' element={<Exploreclub />}></Route>
        <Route path='/clubs/:name' element={<ClubMemberAllClubs />} ></Route>
        

        <Route exact path="/club" element={<Exploreclub />} />
        <Route path='/club/:name' element={<ClubDetails  />} ></Route>
        <Route path='/club/:name/add-event' element={<AddEvent />} ></Route>

        <Route path='/student' element={<StudentAllClubs/>}></Route>
        <Route path='/admin' element={<EventRequests/>}></Route>


        {/* <Route path='/Carousel' element={<Carousel />}></Route> */}

       {/*  <Route path='/Board' element={<Board />}></Route> */}


        <Route path='/studentdashboard' element={<StudentDashboard/>}></Route>
        <Route path='/clubregister/:name' element={<ClubRegistration/>}></Route>


       {/*  <Route path='/Toggle' element={<Toggle />} /> */}
      </Routes>
    </Router>
    </div>
  );
};

export default App;


