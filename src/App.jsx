



// src/App.jsx
/* import React from 'react'; */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/globals.css'
import Exploreclub from './pages/president/Exploreclub';
import Exploreevent from './pages/president/Exploreevent';

import StudentAllClubs from './pages/student/StudentAllClubs';
import Landing from "./pages/Landing"
import Login from "./components/login"
import Signup from "./components/Signup"
import SecretaryExploreclub from './pages/secretary/Exploreclub';



import ClubMemberAllClubs from './pages/member/ClubMemberAllClubs';

import StudentDashboard from './pages/student/StudentDashboard';
import ClubDetails from './pages/president/ClubDetails';
import Election from './pages/president/Election';
import Dashboard from './pages/president/Dashboard';



import EventRequests from './pages/admin/EventRequests';

import ClubRegistration from './pages/student/ClubRegistration';





import EventNav from './components/EventNav'; 
/* import Toggle from './components/election/Toggle'; */

import AddEvent from './components/AddEvent';
import Calendar from './pages/president/Calendar';
import StudentClubDetails from './pages/student/StudentClubDetails';
import StudentNotifications from './pages/student/StudentNotifications';


// Import other pages if necessary


const App = () => {
  return (
    <div>
     <Router>
      <Routes>

        <Route exact path="/" element={<Landing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>

      

        <Route path='/clubs' element={<Exploreclub />}></Route>
        <Route path='/clubs/:name' element={<ClubMemberAllClubs />} ></Route>
        

        <Route exact path="/club" element={<Exploreclub />} />
        <Route exact path="/event" element={<Exploreevent />} />

        <Route path='/club/:name' element={<ClubDetails  />} ></Route>
        <Route path='/Dashboard' element={<Dashboard  />} ></Route>

        <Route path='/club/:name/add-event' element={<AddEvent />} ></Route>
        <Route path='/calendar' element={<Calendar />}></Route>

        <Route path='/student' element={<StudentAllClubs/>}></Route>
        <Route path='/student/club/:name' element={<StudentClubDetails/>}></Route>
        <Route path='/student/notifications' element={<StudentNotifications/>}></Route>

        <Route path='/admin' element={<EventRequests/>}></Route>
        <Route path='/club/election' element={<Election/>}></Route>

        <Route exact path="/sectrataryclub" element={<SecretaryExploreclub />} />




        {/* <Route path='/Carousel' element={<Carousel />}></Route> */}


         <Route path='/eventnav' element={<EventNav />}></Route> 

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


