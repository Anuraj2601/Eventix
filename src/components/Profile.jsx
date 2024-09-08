// export default ProfileUpdatePage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar"; // Adjust the path as needed
import Navbar from "../components/Navbar"; // Adjust the path as needed
import { FaUpload } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

// Club images
import ieeeImg from "../assets/clubs/ieee.png";
import acmImg from "../assets/clubs/acm.png";
import isacaImg from "../assets/clubs/isaca1.png";
import pahasaraImg from "../assets/clubs/pahasara1.png";

// Event images
import ieee1 from "../assets/events/madhack.png";
import ieee2 from "../assets/events/reid.jpg";
import ieee3 from "../assets/events/intro.jpg";
import ieee4 from "../assets/events/ieeeday.jpg";

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
            <div className="bg-neutral-900 rounded-lg shadow-md p-6 ">
              <h2 className="text-xl font-semibold mb-4">
                Clubs Participated In
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animated-card">
                <div className="flex items-center justify-center">
                  <img
                    src={ieeeImg}
                    alt="IEEE"
                    // className="w-20 h-20 rounded-full object-cover"
                    className="w-32 h-32 rounded-lg object-cover"
                    style={{
                      boxShadow:
                        "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                    }}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src={acmImg}
                    alt="ACM"
                    // className="w-20 h-20 rounded-full object-cover"
                    className="w-32 h-32 rounded-lg object-cover"
                    style={{
                      boxShadow:
                        "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                    }}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src={isacaImg}
                    alt="ISACA"
                    // className="w-20 h-20 rounded-full object-cover"
                    className="w-32 h-32 rounded-lg object-cover"
                    style={{
                      boxShadow:
                        "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                    }}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src={pahasaraImg}
                    alt="Pahasara"
                    // className="w-20 h-20 rounded-full object-cover"
                    className="w-32 h-32 rounded-lg object-cover"
                    style={{
                      boxShadow:
                        "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 rounded-lg shadow-md p-6 ">
              <h2 className="text-xl font-semibold mb-4">
                Events Participated In
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animated-card">
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={ieee1}
                    alt="Event 1"
                    className="w-32 h-32 rounded-lg object-cover"
                    style={{
                      boxShadow:
                        "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                    }}
                  />
                  <p className="mt-2">MadHack 2023</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={ieee2}
                    alt="Event 2"
                    className="w-32 h-32 rounded-lg object-cover"
                    style={{
                      boxShadow:
                        "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                    }}
                  />
                  <p className="mt-2">IEEE Reid</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={ieee3}
                    alt="Event 3"
                    className="w-32 h-32 rounded-lg object-cover"
                    style={{
                      boxShadow:
                        "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                    }}
                  />
                  <p className="mt-2">Intro to IEEE</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={ieee4}
                    alt="Event 4"
                    className="w-32 h-32 rounded-lg object-cover"
                    style={{
                      boxShadow:
                        "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                    }}
                  />
                  <p className="mt-2">IEEE Day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
