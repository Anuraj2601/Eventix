



// src/App.jsx
/* import React from 'react'; */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/globals.css'
import Exploreclub from './pages/president/Exploreclub';
import Exploreevent from './pages/president/Exploreevent';
import ClubDetails from './pages/president/ClubDetails';
import Election from './pages/president/Election';
import Dashboard from './pages/president/Dashboard';
import Calendar from './pages/president/Calendar';

import Exploreclubsecretary from './pages/secretary/Exploreclub';
import Exploreeventsecretary from './pages/secretary/Exploreevent';
import ClubDetailssecretary from './pages/secretary/ClubDetails';
import Electionsecretary from './pages/secretary/Election';
import Dashboardsecretary from './pages/secretary/Dashboard';
import Calendarsecretary from './pages/secretary/Calendar';



import StudentDashboard from './pages/student/StudentDashboard';
import StudentAllClubs from './pages/student/StudentAllClubs';
import ClubRegistration from './pages/student/ClubRegistration';
import StudentClubDetails from './pages/student/StudentClubDetails';
import StudentNotifications from './pages/student/StudentNotifications';
import EventRegistration from './pages/student/EventRegistration';




import Landing from "./pages/Landing"
import Login from "./components/login"
import Signup from "./components/Signup"
import SecretaryExploreclub from './pages/secretary/Exploreclub';



import ClubMemberAllClubs from './pages/member/ClubMemberAllClubs';
import ExploreMemberEvent from './pages/member/ExploreMemberEvent';
import MemberElectionForm from './components/MemberElectionForm';
import MemberElectionFormSuccess from './components/MemberElectionFormSuccess';
import MemberVotingProcess from './components/MemberVotingProcess';
import Explorememberclub from './pages/member/ExploreMemberClub';






import EventRequests from './pages/admin/EventRequests';
import NewUsers from './pages/admin/NewUsers';

import EventRequestsNew from './pages/treasurer/EventRequestsNew';





import EventNav from './components/EventNav'; 
/* import Toggle from './components/election/Toggle'; */

import AddEvent from './components/AddEvent';

import { ClubMemberNav } from './components/ClubMemberNav';
import StudentEventCalendar from './pages/student/StudentEventCalendar';


// Import other pages if necessary


const App = () => {
  return (
    <div>
     <Router>
      <Routes>

        <Route exact path="/" element={<Landing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>

      


        <Route path='/member' element={<Explorememberclub />}></Route>
        <Route path='/member/clubs/:name' element={<ClubMemberAllClubs />} ></Route>
        <Route exact path="/member/event" element={<ExploreMemberEvent />} />      
        <Route path="/member-election-form" element={<MemberElectionForm />} />
        <Route path="/member-form-success" element={<MemberElectionFormSuccess />} />
        <Route path="/member-voting" element={<MemberVotingProcess />} />
        
             
                {/* STUDENT ROUTES */}
        <Route path='/student' element={<StudentAllClubs/>}></Route>
        <Route path='/student/club/:name' element={<StudentClubDetails/>}></Route>
        <Route path='/student/notifications' element={<StudentNotifications/>}></Route>
        <Route path='/studentdashboard' element={<StudentDashboard/>}></Route>
        <Route path='/clubregister/:name' element={<ClubRegistration/>}></Route>
        <Route path='/eventregister/:event' element={<EventRegistration/>}></Route>
       
        
        
        {/* President ROUTES */}
        <Route exact path="/president" element={<Exploreclub />} />
        <Route exact path="/president/club/event" element={<Exploreevent />} />
        <Route path='/president/club/:name' element={<ClubDetails />} />
        <Route path='/Dashboard' element={<Dashboard  />} ></Route>
        <Route path='/club/:name/add-event' element={<AddEvent />} ></Route>
        <Route path='/calendar' element={<Calendar />}></Route>
        <Route path='/club/election' element={<Election/>}></Route>

        


       

        <Route path='/admin' element={<EventRequests/>}></Route>
        <Route path='/admin/newusers' element={<NewUsers/>}></Route>


        <Route path='/treasurer' element={<EventRequestsNew/>}></Route>


        <Route exact path="/sectrataryclub" element={<SecretaryExploreclub />} />




        {/* <Route path='/Carousel' element={<Carousel />}></Route> */}


         <Route path='/eventnav' element={<EventNav />}></Route> 

       {/*  <Route path='/Board' element={<Board />}></Route> */}



       
        


       {/*  <Route path='/Toggle' element={<Toggle />} /> */}
      </Routes>
    </Router>
    </div>
  );
};

export default App;


