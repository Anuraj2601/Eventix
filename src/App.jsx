



// src/App.jsx
/* import React from 'react'; */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/globals.css'
import Exploreclub from './pages/president/Exploreclub';
import Exploreevent from './pages/president/Exploreevent';
import ClubDetails from './pages/student/StudentClubDetails';
import Election from './pages/president/Election';
import Dashboard from './pages/president/Dashboard';
import Calendar from './pages/president/Calendar';
import NewElectionForm from './pages/president/NewElectionForm';
import AddNewPostForm from './pages/president/AddNewPostForm';
import PresidentNotifications from './pages/student/StudentNotifications';
import Announcementpresident from './components/MainAnnouncement';
import Inquiriespresident from './components/Inquiry';
import Messagespresident from './components/Message';
import Profilepresident from './components/Profile';
import MainMeetingPresident from './components/MainMeeting';
import MeetingLandingPage from './MeetingLandingPage'
import AddSponsor from './components/AddSponsor';




import Explorecluboc from './pages/oc/Exploreclub';
import Exploreeventoc from './pages/president/Exploreevent';
import ClubDetailsoc from './pages/oc/ClubDetails';
import Electionoc from './pages/oc/Election';
import Dashboardoc from './pages/oc/Dashboard';
import Calendaroc from './pages/oc/Calendar';
import NewElectionFormoc from './pages/oc/NewElectionForm';
import AddNewPostFormoc from './pages/oc/AddNewPostForm';
import OcNotifications from './pages/student/StudentNotifications';
import Announcementoc from './components/MainAnnouncement';
import Inquiriesoc from './components/Inquiry';
import Messagesoc from './components/Message';
import Profileoc from './components/Profile';
import Finalistsoc from './components/Finalists';
import Votingoc from './components/Voting';
import Winners from './components/Winners';

import Apply from './components/Apply';
import MainMeetingoc from './components/MainMeetingold';




import Exploreclubsecretary from './pages/president/Exploreclub';
import Exploreeventsecretary from './pages/secretary/Exploreevent';
import ClubDetailssecretary from './pages/president/ClubDetails';
import Electionsecretary from './pages/secretary/Election';
import Dashboardsecretary from './pages/secretary/Dashboard';
import Calendarsecretary from './pages/secretary/Calendar';
import SecretaryNotifications from './pages/student/StudentNotifications';
import Announcementsecretary from './components/MainAnnouncement';
import Inquiriessecretary from './components/Inquiry';
import Messagessecretary from './components/Message';
import Profilesecretary from './components/Profile';
import MainMeetingsecretary from './components/MainMeetingold';




import StudentDashboard from './pages/student/StudentDashboard';
import StudentAllClubs from './pages/student/StudentAllClubs';
import ClubRegistration from './pages/student/ClubRegistration';
import StudentClubDetails from './pages/student/StudentClubDetails';
import StudentNotifications from './pages/student/StudentNotifications';
import EventRegistration from './pages/student/EventRegistration';
import Exploreeventstudent from './pages/student/Exploreevent';
import StudentEventCalendar from './pages/student/StudentEventCalendar';
import Inquiriesstudent from './pages/student/Inquiry';
import Announcementstudent from './components/MainAnnouncement';
import Messagesstudent from './components/Message';
import Profilestudent from './components/Profile';
import MainMeetingstudent from './components/MainMeeting';




//import MainMeeting from './components/MainMeeting';

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
import MemberNotifications from './pages/student/StudentNotifications';
import Announcementmember from './components/MainAnnouncement';
import Inquiriesmember from './components/Inquiry';
import Messagesmember from './components/Message';
import Profilemember from './components/Profile';
import MainMeetingmember from './components/MainMeetingold';





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
import AdminNotifications from './pages/student/StudentNotifications';
import Announcementadmin from './components/MainAnnouncement';
import Inquiriesadmin from './pages/student/Inquiry';
import Messagesadmin from './components/Message';
import Profileadmin from './components/Profile';
import MainMeetingadmin from './components/MainMeetingold';
import ProtectedRoute from './ProtectedRoute';

import StudentDashboardtreasurer from './pages/student/StudentDashboard';
import StudentAllClubstreasurer from './pages/student/StudentAllClubs';
import ClubRegistrationtreasurer from './pages/student/ClubRegistration';
import StudentClubDetailstreasurer from './pages/student/StudentClubDetails';
import StudentNotificationstreasurer from './pages/student/StudentNotifications';
import EventRegistrationtreasurer from './pages/student/EventRegistration';
import Exploreeventstudenttreasurer from './pages/student/Exploreevent';
import StudentEventCalendartreasurer from './pages/student/StudentEventCalendar';
import EventRequestsNew from './pages/treasurer/Requests';
import TreasurerNotifications from './pages/student/StudentNotifications';
import Announcementtreasurer from './components/MainAnnouncement';
import Inquiriestreasurer  from './pages/student/Inquiry';
import Messagestreasurer from './components/Message';
import Profiletreasurer from './components/Profile';
import MainMeetingtreasurer from './components/MainMeetingold';
import Requests from './components/Requests'; 

import EventNav from './components/EventNav'; 
/* import Toggle from './components/election/Toggle'; */

import AddEvent from './components/AddEvent';
import EditEvent from './components/EditEvent';

import { ClubMemberNav } from './components/ClubMemberNav';
import AddNewAnnouncementForm from './pages/president/AddNewAnnouncementForm';
import AddNewMeetingForm from './pages/president/AddNewMeetingForm';

import AddNewunionAnnouncementForm from './pages/president/AddNewunionAnnouncementForm';
import AddNewClubForm from './pages/admin/AddNewClubForm';


import CheckEmail from './components/CheckEmail';
import ForgotPassword from './components/ForgotPassword';
import Auth from './service/UsersService';

import Accountverify from './components/VerifyUser';

// Import other pages if necessary

const App = () => {
  return (
    <div>
     <Router>
      <Routes>

        <Route exact path="/" element={<Landing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/CheckEmail" element={<CheckEmail />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/Accountverify" element={<Accountverify />} />


         {/* member routes */}

        if(Auth.isAuthenticated())

         {/*  member routes */}
         <Route exact path="/member/club" element={<ProtectedRoute element={<Exploreclub />}  />}/>
        {/* <Route exact path="/member/club/event" element={<Exploreeventstudent />} /> */}
        <Route path='/member/club/event' element={<ProtectedRoute element={<Exploreevent />} />}></Route>
        <Route path='/member/club/:id' element={<ProtectedRoute element={<ClubDetails />} />}/>
        <Route path='/member/dashboard' element={<ProtectedRoute element={<Dashboard  />} />}></Route>
        <Route path='/club/:name/add-event' element={<ProtectedRoute element={<AddEvent />} />}></Route>
        <Route path='/member/calendar' element={<ProtectedRoute element={<Calendar />} />}></Route>
        <Route path='/member/club/election' element={<ProtectedRoute element={<Election/>} />}></Route>
        <Route path='/member' element={<ProtectedRoute element={<Dashboardoc  />} />} ></Route>
        <Route path="/member/club/election/add" element={<ProtectedRoute element={<NewElectionForm />} />}/>
        <Route path="/member/new-post" element={<ProtectedRoute element={<AddNewPostFormoc />} />}/>
        <Route path='/member/notifications' element={<ProtectedRoute element={<OcNotifications />} />}></Route>
        <Route path='/member/announcement' element={<ProtectedRoute element={<Announcementoc />} />}></Route> 
        <Route path='/member/inquiry' element={<ProtectedRoute element={<Inquiriesoc/>} />}></Route>
        <Route path='/member/messages' element={<ProtectedRoute element={<Messagesoc/>} />}></Route>
        <Route path='/member/profile' element={<ProtectedRoute element={<Profileoc/>} />}></Route>
        <Route path='/member/club/election/finalists/:electionId' element={<ProtectedRoute element={<Finalistsoc/>} />}></Route>
        <Route path='/member/club/election/voting/:electionId' element={<ProtectedRoute element={<Votingoc/>} />}></Route>
        <Route path='/member/club/election/apply/:electionId' element={<ProtectedRoute element={<Apply/>} />}></Route>
        <Route path='/member/meeting' element={<ProtectedRoute element={<MainMeetingmember />} />}></Route>
        <Route path='/member/club/election/winners/:electionId' element={<ProtectedRoute element={<Winners/>} />}></Route>


        
             
                {/* STUDENT ROUTES */}
        <Route path='/student/club' element={<ProtectedRoute element={<StudentAllClubs/>} />}></Route>
        <Route path='/student/club/:id' element={<ProtectedRoute element={<StudentClubDetails/>} />}></Route>
        <Route path='/student/notifications' element={<ProtectedRoute element={<StudentNotifications/>} />}></Route>
        <Route path='/student/dashboard' element={<ProtectedRoute element={<StudentDashboard/>} />}></Route>
        <Route path='/:role/clubregister/:club_id' element={<ProtectedRoute element={<ClubRegistration />}  />}/>
        <Route path='/eventregister/:event' element={<ProtectedRoute element={<EventRegistration/>} />}></Route>
        {/* <Route path='/student/club/event' element={<Exploreeventstudent />}></Route> */}
        <Route path='/student/club/event' element={<ProtectedRoute element={<Exploreevent />} />}></Route>
        <Route path='/student/calendar' element={<ProtectedRoute element={<StudentEventCalendar />} />}></Route>
        <Route path='/student' element={<ProtectedRoute element={<StudentDashboard/>} />}></Route>
        <Route path='/student/inquiry' element={<ProtectedRoute element={<Inquiriesstudent/>} />}></Route>
        <Route path='/student/announcements' element={<ProtectedRoute element={<Announcementstudent />} />}></Route> 
        <Route path='/student/messages' element={<ProtectedRoute element={<Messagesstudent/>} />}></Route>
        <Route path='/student/profile' element={<ProtectedRoute element={<Profilestudent/>} />}></Route>
        <Route path='/student/meeting' element={<ProtectedRoute element={<MainMeetingstudent />} />}></Route> 





      
        
        
        {/* President ROUTES */}
        <Route exact path="/president/club" element={<ProtectedRoute element={<Exploreclub />}  />}/>
        <Route exact path="/president/club/event" element={<ProtectedRoute element={<Exploreevent />}  />}/>
        <Route path='/president/club/:id' element={<ProtectedRoute element={<ClubDetails />}  />}/>
        <Route path='/president/dashboard' element={<ProtectedRoute element={<Dashboard  />}  />}></Route>
        <Route path='/club/:id/add-event' element={<ProtectedRoute element={<AddEvent />}  />}></Route>
        <Route path='/president/calendar' element={<ProtectedRoute element={<Calendar />} />}></Route>
        <Route path='/president/club/election/:id' element={<ProtectedRoute element={<Election/>} />}></Route>
        <Route path='/president' element={<ProtectedRoute element={<Dashboard  />}  />}></Route>
        <Route path="/president/club/election/add" element={<ProtectedRoute element={<NewElectionForm />}  />}/>
        <Route path="/president/club/election/edit/:id" element={<ProtectedRoute element={<NewElectionForm />}  />}/>
        <Route path="/club/new-post" element={<ProtectedRoute element={<AddNewPostForm />}  />}/>
        <Route path="/club/edit-post/:id" element={<ProtectedRoute element={<AddNewPostForm />}  />}/>

        <Route path='/president/notifications' element={<ProtectedRoute element={<PresidentNotifications  />}  />}></Route>
        <Route path='/president/announcement' element={<ProtectedRoute element={<Announcementpresident />} />}></Route> 
        <Route path='/president/inquiry' element={<ProtectedRoute element={<Inquiriespresident/>} />}></Route>
        <Route path='/president/messages' element={<ProtectedRoute element={<Messagespresident/>} />}></Route>
        <Route path='/president/profile' element={<ProtectedRoute element={<Profilepresident/>} />}></Route>

        <Route path='/president/meeting' element={<ProtectedRoute element={<MainMeetingPresident />} />}></Route>
        <Route path='/president/meeting/:id' element={<ProtectedRoute element={<MeetingLandingPage />} />}></Route>
        <Route path='/president/AddSponsor' element={<ProtectedRoute element={<AddSponsor />} />}></Route> 
        <Route path='/president/EditSponsor/:id' element={<ProtectedRoute element={<AddSponsor />} />}></Route>

        <Route path="/president/club/announce/add" element={<ProtectedRoute element={<AddNewAnnouncementForm/>} />}></Route>

        <Route path="/president/club/announce/edit/:id" element={<ProtectedRoute element={<AddNewAnnouncementForm/>} />}></Route>
        <Route path="/president/club/meet/add" element={<ProtectedRoute element={<AddNewMeetingForm/>} />}></Route>
        <Route path="/president/club/meet/edit/:id" element={<ProtectedRoute element={<AddNewMeetingForm/>} />}></Route>



        

         {/* secretary ROUTES */}
         <Route exact path="/secretary/club" element={<ProtectedRoute element={<Exploreclub />}  />}/>
        <Route path='/secretary/club/:id' element={<ProtectedRoute element={<ClubDetails />}  />}/>
        <Route exact path="/secretary/club/event" element={<ProtectedRoute element={<Exploreevent />}  />}/>
        <Route path='/secretary/dashboard' element={<ProtectedRoute element={<Dashboard  />}  />}></Route>
        <Route path='/club/:name/add-event' element={<ProtectedRoute element={<AddEvent />}  />}></Route>
        <Route path='/secretary/calendar' element={<ProtectedRoute element={<Calendar />} />}></Route>
        <Route path='/secretary/club/election' element={<ProtectedRoute element={<Election/>} />}></Route>
        <Route path='/secretary' element={<ProtectedRoute element={<Dashboard  />}  />}></Route>
        <Route path='/secretary/notifications' element={<ProtectedRoute element={<SecretaryNotifications />}  />}></Route>
        <Route path='/secretary/announcement' element={<ProtectedRoute element={<Announcementsecretary />} />}></Route> 
        <Route path='/secretary/inquiry' element={<ProtectedRoute element={<Inquiriessecretary/>} />}></Route>
        <Route path='/secretary/messages' element={<ProtectedRoute element={<Messagessecretary/>} />}></Route>
        <Route path='/secretary/profile' element={<ProtectedRoute element={<Profilesecretary/>} />}></Route>
        <Route path='/secretary/meeting' element={<ProtectedRoute element={<MainMeetingsecretary />} />}></Route> 



        {/* OC ROUTES */}
        <Route exact path="/oc/club" element={<ProtectedRoute element={<Exploreclub />}  />}/>
        <Route exact path="/oc/club/event" element={<ProtectedRoute element={<Exploreeventoc />}  />}/>
        <Route path='/oc/club/:id' element={<ProtectedRoute element={<ClubDetails />}  />}/>
        <Route path='/oc/dashboard' element={<ProtectedRoute element={<Dashboard  />}  />}></Route>
        <Route path='/club/:name/add-event' element={<ProtectedRoute element={<AddEvent />}  />}></Route>
        <Route path="/club/:club_id/edit-event/:event_id" element={<ProtectedRoute element={<EditEvent />} />}></Route>
        <Route path='/oc/calendar' element={<ProtectedRoute element={<Calendar />} />}></Route>
        <Route path='/oc/club/election' element={<ProtectedRoute element={<Election/>} />}></Route>
        <Route path='/oc' element={<ProtectedRoute element={<Dashboardoc  />}  />}></Route>
        <Route path="/oc/club/election/add" element={<ProtectedRoute element={<NewElectionForm />}  />}/>
        <Route path="/oc/new-post" element={<ProtectedRoute element={<AddNewPostFormoc />}  />}/>
        <Route path='/oc/notifications' element={<ProtectedRoute element={<OcNotifications />} />}></Route>
        <Route path='/oc/announcement' element={<ProtectedRoute element={<Announcementoc />} />}></Route> 
        <Route path='/oc/inquiry' element={<ProtectedRoute element={<Inquiriesoc/>} />}></Route>
        <Route path='/oc/messages' element={<ProtectedRoute element={<Messagesoc/>} />}></Route>
        <Route path='/oc/profile' element={<ProtectedRoute element={<Profileoc/>} />}></Route>
        <Route path='/oc/club/finalists' element={<ProtectedRoute element={<Finalistsoc/>} />}></Route>
        <Route path='/oc/club/voting' element={<ProtectedRoute element={<Votingoc/>} />}></Route>
        <Route path='/oc/election/Apply' element={<ProtectedRoute element={<Apply/>} />}></Route>
        <Route path='/oc/meeting' element={<ProtectedRoute element={<MainMeetingoc />} />}></Route> 

        

        <Route path='/admin/club' element={<ProtectedRoute element={<StudentAllClubsadmin/>} />}></Route>
        <Route path='/admin/club/:id' element={<ProtectedRoute element={<StudentClubDetailsadmin/>} />}></Route>
        <Route path='/admin/notifications' element={<ProtectedRoute element={<StudentNotificationsadmin/>} />}></Route>
        <Route path='/admin/dashboard' element={<ProtectedRoute element={<StudentDashboardadmin/>} />}></Route>
        <Route path='/clubregister/:name' element={<ProtectedRoute element={<ClubRegistrationadmin/>} />}></Route>
        <Route path='/eventregister/:event' element={<ProtectedRoute element={<EventRegistrationadmin/>} />}></Route>
        <Route path='/admin/club/event' element={<ProtectedRoute element={<Exploreeventstudentadmin />} />}></Route>
        <Route path='/admin/calendar' element={<ProtectedRoute element={<StudentEventCalendaradmin />} />}></Route>
        <Route path='/admin' element={<ProtectedRoute element={<StudentDashboardadmin/>} />}></Route>
        <Route path='/student/requests' element={<ProtectedRoute element={<EventRequests/>} />}></Route>
        <Route path='/student/users' element={<ProtectedRoute element={<NewUsers/>} />}></Route>
        <Route path='/admin/notifications' element={<ProtectedRoute element={<AdminNotifications  />}  />}></Route>
        <Route path='/admin/announcements' element={<ProtectedRoute element={<Announcementstudent />} />}></Route> 
        <Route path='/admin/inquiry' element={<ProtectedRoute element={<Inquiriesadmin/>} />}></Route>
        <Route path='/admin/messages' element={<ProtectedRoute element={<Messagesadmin/>} />}></Route>
        <Route path='/admin/profile' element={<ProtectedRoute element={<Profileadmin/>} />}></Route>
        <Route path='/admin/meeting' element={<ProtectedRoute element={<MainMeetingadmin />} />}></Route> 
        <Route path='/admin/addclub' element={<ProtectedRoute element={<AddNewClubForm />} />}></Route>
        <Route path="/admin/club/announcement/add" element={<ProtectedRoute element={<AddNewunionAnnouncementForm/>} />}></Route>

<Route path="/admin/club/announcement/edit/:id" element={<ProtectedRoute element={<AddNewunionAnnouncementForm/>} />}></Route>

        <Route path='/treasurer/club' element={<ProtectedRoute element={<StudentAllClubstreasurer/>} />}></Route>
        <Route path='/treasurer/club/:name' element={<ProtectedRoute element={<StudentClubDetailstreasurer/>} />}></Route>
        <Route path='/treasurer/notifications' element={<ProtectedRoute element={<StudentNotificationstreasurer/>} />}></Route>
        <Route path='/treasurer/dashboard' element={<ProtectedRoute element={<StudentDashboardtreasurer/>} />}></Route>
        <Route path='/clubregister/:name' element={<ProtectedRoute element={<ClubRegistrationtreasurer/>} />}></Route>
        <Route path='/eventregister/:event' element={<ProtectedRoute element={<EventRegistrationtreasurer/>} />}></Route>
        <Route path='/treasurer/club/event' element={<ProtectedRoute element={<Exploreeventstudenttreasurer />} />}></Route>
        <Route path='/treasurer/calendar' element={<ProtectedRoute element={<StudentEventCalendartreasurer />} />}></Route>
        <Route path='/treasurer' element={<ProtectedRoute element={<StudentDashboardadmin/>} />}></Route>
        <Route path='/treasurer/requests' element={<ProtectedRoute element={<EventRequestsNew/>} />}></Route>
        <Route path='/treasurer/notifications' element={<ProtectedRoute element={<TreasurerNotifications  />} />} ></Route>
        <Route path='/treasurer/announcement' element={<ProtectedRoute element={<Announcementtreasurer />} />}></Route> 
        <Route path='/treasurer/inquiry' element={<ProtectedRoute element={<Inquiriestreasurer/>} />}></Route>
        <Route path='/treasurer/messages' element={<ProtectedRoute element={<Messagestreasurer/>} />}></Route>
        <Route path='/treasurer/profile' element={<ProtectedRoute element={<Profiletreasurer/>} />}></Route>
        <Route path='/treasurer/meeting' element={<ProtectedRoute element={<MainMeetingtreasurer />} />}></Route> 



        <Route path='/requests' element={<ProtectedRoute element={<EventRequestsNew/>} />}></Route>


        <Route exact path="/sectrataryclub" element={<ProtectedRoute element={<SecretaryExploreclub />}  />}/>




        {/* <Route path='/Carousel' element={<Carousel />}></Route> */}


         <Route path='/eventnav' element={<ProtectedRoute element={<EventNav />} />}></Route> 

       {/*  <Route path='/Board' element={<Board />}></Route> */}



       
        


       {/*  <Route path='/Toggle' element={<Toggle />} /> */}
      </Routes>
    </Router>
    </div>
  );
};

export default App;


