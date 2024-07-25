



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
import NewElectionForm from './pages/president/NewElectionForm';
import AddNewPostForm from './pages/president/AddNewPostForm';

import Explorecluboc from './pages/oc/Exploreclub';
import Exploreeventoc from './pages/oc/Exploreevent';
import ClubDetailsoc from './pages/oc/ClubDetails';
import Electionoc from './pages/oc/Election';
import Dashboardoc from './pages/oc/Dashboard';
import Calendaroc from './pages/oc/Calendar';
import NewElectionFormoc from './pages/oc/NewElectionForm';
import AddNewPostFormoc from './pages/oc/AddNewPostForm';

import Exploreclubsecretary from './pages/secretary/Exploreclub';
import Exploreeventsecretary from './pages/secretary/Exploreevent';
import ClubDetailssecretary from './pages/president/ClubDetails';
import Electionsecretary from './pages/secretary/Election';
import Dashboardsecretary from './pages/secretary/Dashboard';
import Calendarsecretary from './pages/secretary/Calendar';



import StudentDashboard from './pages/student/StudentDashboard';
import StudentAllClubs from './pages/student/StudentAllClubs';
import ClubRegistration from './pages/student/ClubRegistration';
import StudentClubDetails from './pages/student/StudentClubDetails';
import StudentNotifications from './pages/student/StudentNotifications';
import EventRegistration from './pages/student/EventRegistration';
import Exploreeventstudent from './pages/student/Exploreevent';
import StudentEventCalendar from './pages/student/StudentEventCalendar';






import Landing from "./pages/Landing"
import Login from "./components/login"
import Signup from "./components/Signup"
import SecretaryExploreclub from './pages/secretary/Exploreclub';


// member
import ClubMemberAllClubs from './pages/member/ClubMemberAllClubs';
import ExploreMemberEvent from './pages/member/ExploreMemberEvent';

import ExploreMemberclub from './pages/member/ExploreMemberClub';

import MemberElectionForm from './pages/member/MemberElectionForm';
import MemberElectionFormSuccess from './pages/member/MemberElectionFormSuccess';
import MemberVotingProcess from './pages/member/MemberVotingProcess';
import MemberOCJoinForm from './pages/member/MemberOCJoinForm';





import StudentDashboardadmin from './pages/student/StudentDashboard';
import StudentAllClubsadmin from './pages/student/StudentAllClubs';
import ClubRegistrationadmin from './pages/student/ClubRegistration';
import StudentClubDetailsadmin from './pages/student/StudentClubDetails';
import StudentNotificationsadmin from './pages/student/StudentNotifications';
import EventRegistrationadmin from './pages/student/EventRegistration';
import Exploreeventstudentadmin from './pages/student/Exploreevent';
import StudentEventCalendaradmin from './pages/student/StudentEventCalendar';
import EventRequests from './pages/admin/Requests';
import NewUsers from './pages/admin/NewUsers';


import StudentDashboardtreasurer from './pages/student/StudentDashboard';
import StudentAllClubstreasurer from './pages/student/StudentAllClubs';
import ClubRegistrationtreasurer from './pages/student/ClubRegistration';
import StudentClubDetailstreasurer from './pages/student/StudentClubDetails';
import StudentNotificationstreasurer from './pages/student/StudentNotifications';
import EventRegistrationtreasurer from './pages/student/EventRegistration';
import Exploreeventstudenttreasurer from './pages/student/Exploreevent';
import StudentEventCalendartreasurer from './pages/student/StudentEventCalendar';
import EventRequestsNew from './pages/treasurer/Requests';



import Requests from './components/Requests'; 


import EventNav from './components/EventNav'; 
/* import Toggle from './components/election/Toggle'; */

import AddEvent from './components/AddEvent';

import { ClubMemberNav } from './components/ClubMemberNav';


// Import other pages if necessary


const App = () => {
  return (
    <div>
     <Router>
      <Routes>

        <Route exact path="/" element={<Landing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>

      

         {/* member routes */}

        <Route path='/member' element={<Dashboard />}></Route>
        <Route path='/member/dashboard' element={<Dashboard  />} ></Route>
        <Route path='/member/club' element={<ExploreMemberclub />}></Route>

        <Route path='/member/club/:name' element={<ClubMemberAllClubs />} ></Route>
        <Route exact path="/member/event" element={<ExploreMemberEvent />} />      
        <Route path="/member-election-form" element={<MemberElectionForm />} />
        <Route path="/member-form-success" element={<MemberElectionFormSuccess />} />
        <Route path="/member-voting" element={<MemberVotingProcess />} />
        <Route path="/member-oc-form" element={<MemberOCJoinForm />} />

        
             
                {/* STUDENT ROUTES */}
        <Route path='/student/club' element={<StudentAllClubs/>}></Route>
        <Route path='/student/club/:name' element={<StudentClubDetails/>}></Route>
        <Route path='/student/notifications' element={<StudentNotifications/>}></Route>
        <Route path='/student/dashboard' element={<StudentDashboard/>}></Route>
        <Route path='/clubregister/:name' element={<ClubRegistration/>}></Route>
        <Route path='/eventregister/:event' element={<EventRegistration/>}></Route>
        <Route path='/student/club/event' element={<Exploreeventstudent />}></Route>
        <Route path='/student/calendar' element={<StudentEventCalendar />}></Route>
        <Route path='/student' element={<StudentDashboard/>}></Route>
        




      
        
        
        {/* President ROUTES */}
        <Route exact path="/president/club" element={<Exploreclub />} />
        <Route exact path="/president/club/event" element={<Exploreevent />} />
        <Route path='/president/club/:name' element={<ClubDetails />} />
        <Route path='/president/dashboard' element={<Dashboard  />} ></Route>
        <Route path='/club/:name/add-event' element={<AddEvent />} ></Route>
        <Route path='/president/calendar' element={<Calendar />}></Route>
        <Route path='/president/club/election' element={<Election/>}></Route>
        <Route path='/president' element={<Dashboard  />} ></Route>
        <Route path="/president/club/election/add" element={<NewElectionForm />} />
        <Route path="/club/new-post" element={<AddNewPostForm />} />

        

         {/* secretary ROUTES */}
         <Route exact path="/secretary/club" element={<Exploreclubsecretary />} />
        <Route path='/secretary/club/:name' element={<ClubDetailssecretary />} />
        <Route exact path="/secretary/club/event" element={<Exploreeventsecretary />} />
        <Route path='/secretary/dashboard' element={<Dashboard  />} ></Route>
        <Route path='/club/:name/add-event' element={<AddEvent />} ></Route>
        <Route path='/secretary/calendar' element={<Calendar />}></Route>
        <Route path='/secretary/club/election' element={<Election/>}></Route>
        <Route path='/secretary' element={<Dashboard  />} ></Route>

        {/* OC ROUTES */}
        <Route exact path="/oc/club" element={<Explorecluboc />} />
        <Route exact path="/oc/club/event" element={<Exploreeventoc />} />
        <Route path='/oc/club/:name' element={<ClubDetailsoc />} />
        <Route path='/oc/dashboard' element={<Dashboard  />} ></Route>

        <Route path='/club/:name/add-event' element={<AddEvent />} ></Route>
        <Route path='/oc/calendar' element={<Calendar />}></Route>
        <Route path='/oc/club/election' element={<Election/>}></Route>
        <Route path='/oc' element={<Dashboardoc  />} ></Route>
        <Route path="/oc/club/election/add" element={<NewElectionForm />} />
        <Route path="/oc/new-post" element={<AddNewPostFormoc />} />

        


       
        <Route path='/admin/club' element={<StudentAllClubsadmin/>}></Route>
        <Route path='/admin/club/:name' element={<StudentClubDetailsadmin/>}></Route>
        <Route path='/admin/notifications' element={<StudentNotificationsadmin/>}></Route>
        <Route path='/admin/dashboard' element={<StudentDashboardadmin/>}></Route>
        <Route path='/clubregister/:name' element={<ClubRegistrationadmin/>}></Route>
        <Route path='/eventregister/:event' element={<EventRegistrationadmin/>}></Route>
        <Route path='/admin/club/event' element={<Exploreeventstudentadmin />}></Route>
        <Route path='/admin/calendar' element={<StudentEventCalendaradmin />}></Route>
        <Route path='/admin' element={<StudentDashboardadmin/>}></Route>
        <Route path='/admin/requests' element={<EventRequests/>}></Route>
        <Route path='/admin/users' element={<NewUsers/>}></Route>

        <Route path='/treasurer/club' element={<StudentAllClubstreasurer/>}></Route>
        <Route path='/treasurer/club/:name' element={<StudentClubDetailstreasurer/>}></Route>
        <Route path='/treasurer/notifications' element={<StudentNotificationstreasurer/>}></Route>
        <Route path='/treasurer/dashboard' element={<StudentDashboardtreasurer/>}></Route>
        <Route path='/clubregister/:name' element={<ClubRegistrationtreasurer/>}></Route>
        <Route path='/eventregister/:event' element={<EventRegistrationtreasurer/>}></Route>
        <Route path='/treasurer/club/event' element={<Exploreeventstudenttreasurer />}></Route>
        <Route path='/treasurer/calendar' element={<StudentEventCalendartreasurer />}></Route>
        <Route path='/treasurer' element={<StudentDashboardadmin/>}></Route>
        <Route path='/treasurer/requests' element={<EventRequestsNew/>}></Route>


        <Route path='/requests' element={<EventRequestsNew/>}></Route>


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


