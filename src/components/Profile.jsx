import React, { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import EventOcService from '../service/EventOcService';
import EventService from "../service/EventService";
import { getUserEmailFromToken } from '../utils/utils'; // Assuming this function is correctly defined
import { getUserIdFromToken } from '../utils/utils'; // Assuming this function is correctly defined
import EventsParticipated from "./EventsParticipated"; 
import axios from 'axios';
import ClubsService from '../service/ClubsService';
import RegistrationService from '../service/registrationService';
import Sidebar from './Sidebar'; // Update the path as needed
import Navbar from './Navbar';   // Update the path as needed
import UsersService from '../service/UsersService';

const ProfileUpdatePage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [regNo, setRegNo] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hobby, setHobby] = useState("");
  const [participatedClubs, setParticipatedClubs] = useState([]);
  const [participatedEvents, setParticipatedEvents] = useState([]);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [clubDetails, setClubDetails] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [selectedClubId, setSelectedClubId] = useState(null);
  const userId = getUserEmailFromToken();
  const [events, setEvents] = useState([]);
  const [currentOcMembers, setCurrentOcMembers] = useState([]);
  const [eventOCData, setEventOCData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [userrId, setUserId] = useState(null);


  useEffect(() => {
    console.log("User ID from Token:", userId);
  }, [userId]);

  useEffect(() => {
    fetchClubs();
    fetchRegistrations();

  }, [token]);
 
  useEffect(() => {
    // Get userId from token
    const userrIdFromToken = getUserIdFromToken();
    setUserId(userrIdFromToken);

    // Fetch events based on userId
  }, []);


  const fetchClubs = async () => {
    try {
      const clubs = await ClubsService.getAllClubs(token);
      const clubsArray = clubs.content || [];
      setClubDetails(clubsArray);
    } catch (error) {
      console.error("Failed to fetch clubs", error);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const response = await RegistrationService.getAllRegistrations(token);
      const fetchedRegistrations = response.data || response.content || [];
      setRegistrations(fetchedRegistrations);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

   // Filter registrations based on user ID, accepted status, and specified positions
   const validPositions = ["president", "member", "secretary", "treasurer", "oc"];
   const filteredRegistrations = registrations.filter(
     (reg) =>
       reg.email === userId &&
       reg.accepted === 1 &&
       validPositions.includes(reg.position.toLowerCase())
   );
 
   // Filter clubs based on the filtered registrations' club IDs
   const filteredClubs = clubDetails.filter((club) =>
     filteredRegistrations.some((reg) => reg.clubId === club.club_id)
   );

  const handleProfileImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("profileImage", file);

      // Update the preview immediately
      setProfileImage(URL.createObjectURL(file));

      // Send the image to the backend
      axios
        .post("http://localhost:8080/api/user/profile/photo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log("Profile image updated:", response.data);

          // If the server returns the new photoUrl, update the profileImage state
          if (response.data.photoUrl) {
            setProfileImage(response.data.photoUrl);

            alert("Profile image uploaded successfully!");
          }
        })
        .catch((error) => {
          console.error("There was an error uploading the image!", error);
          alert("Failed to upload image. Please try again.");
          // Optionally, revert to the previous image if upload fails
          fetchUserProfile(); // Refreshes the profile data including the image
        });
    }
  };

  // Fetch the user profile data
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data;
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setRegNo(data.regNo);
      setYearOfStudy(data.yearOfStudy || "");
      setBio(data.bio || "");

      if (data.photoUrl) {
        setProfileImage(`${data.photoUrl}`);
      } else {
        setProfileImage("https://randomuser.me/api/portraits/men/73.jpg");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleEditBioClick = () => {
    setIsEditingBio(true);
  };

  const handleSaveBioClick = () => {
    axios
      .put("http://localhost:8080/api/user/profile/bio", bio, {
        headers: {
          "Content-Type": "text/plain", // Change Content-Type to text/plain
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Bio updated:", response.data);
        setIsEditingBio(false);
      })
      .catch((error) => {
        console.error("There was an error updating the bio!", error);
        alert("Failed to update bio. Please try again.");
      });
  };

  const userEvents = participatedEvents.filter((event) =>
  filteredClubs.some((club) => event.clubId === club.club_id)
);


  return (
    <div className="fixed inset-0 flex">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar className="sticky top-0 z-10 p-4" />
        <div className="w-full p-6 h-screen bg-neutral-900 text-white overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-neutral-900 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="relative w-40 h-40 ml-8 items-center">
                  <img
                    src={
                      profileImage ||
                      "https://randomuser.me/api/portraits/men/73.jpg"
                    }
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                    style={{
                      boxShadow:
                        "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                    }}
                  />
                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer"
                  >
                    <FaUpload />
                    <input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="ml-8">
                  <h2 className="text-xl font-semibold">{`${firstName} ${lastName}`}</h2>
                  <p className="text-white">{yearOfStudy}</p>
                </div>
              </div>
              <div className="ml-8 mb-6">
                <label className="block text-white mb-2">Bio</label>
                {isEditingBio ? (
                  <div>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself..."
                      className="w-full h-32 p-2 bg-black rounded-lg border-none outline-none"
                      style={{
                        boxShadow:
                          "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                      }}
                    />
                    <button
                      onClick={handleSaveBioClick}
                      className="mt-2 px-4 py-2 text-black rounded-lg hover:bg-green-500"
                      style={{ backgroundColor: "#AEC90A" }}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="mb-2">{bio || "Tell us about yourself..."}</p>
                    <button
                      onClick={handleEditBioClick}
                      className="px-2 py-2 text-black rounded-lg hover:bg-green-500"
                      style={{ backgroundColor: "#AEC90A" }}
                    >
                      <FaEdit />
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 ml-8">
                <div className="mb-6">
                  <label className="block text-white mb-2">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    readOnly
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2 bg-black rounded-lg border-none outline-none"
                    style={{
                      boxShadow:
                        "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                    }}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-white mb-2">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    readOnly
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 bg-black rounded-lg border-none outline-none"
                    style={{
                      boxShadow:
                        "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                    }}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-white mb-2">Student Email</label>
                  <input
                    type="email"
                    value={email}
                    readOnly
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 bg-black rounded-lg border-none outline-none"
                    style={{
                      boxShadow:
                        "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                    }}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-white mb-2">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    value={regNo}
                    readOnly
                    onChange={(e) => setRegNo(e.target.value)}
                    className="w-full p-2 bg-black rounded-lg border-none outline-none"
                    style={{
                      boxShadow:
                        "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                    }}
                  />
                </div>
              </div>
              <div className="bg-neutral-900 rounded-lg shadow-md p-6">
  <h2 className="text-xl font-semibold mb-4">Participated Event OCs </h2>
  <EventsParticipated /> 
</div>

           
            </div>
            <style>
              {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px); /* Adjust the distance of the bounce */
            }
          }

          .animated-card {
            animation: bounce 2s infinite; /* Adjust duration as needed */
          }
        `}
            </style>

         {/* Clubs Participated In */}
<div className="bg-neutral-900 rounded-lg shadow-md p-6">
  {filteredClubs.length === 0 ? (
    <Typography color="white" className="text-center">No clubs found.</Typography>
  ) : (
    <>
      <h2 className="text-xl font-semibold mb-4">Clubs Participated In</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animated-card">
        {filteredClubs.map(club => {
          // Find the registration data for the current club based on the club_id
          const registration = filteredRegistrations.find(
            reg => reg.clubId === club.club_id && reg.accepted === 1
          );
          
          return (
            <div key={club.club_id} className="flex flex-col items-center justify-center">
              <img
                src={club.club_image}
                alt={club.name}
                className="w-96 h-48 rounded-lg object-cover"  // Adjusted width and height for 2:1 ratio
                style={{
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                }}
              />
              <div className="text-center mt-2">
                <h3 className="text-white text-lg font-semibold">{club.club_name}</h3>
                {/* Display position if available */}
                {registration ? (
                  <p className="text-white text-sm">As a {registration.position}</p>
                ) : (
                  <p className="text-white text-sm">No position assigned</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  )}
</div>



            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
