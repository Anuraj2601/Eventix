import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsMegaphone } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoCalendarNumberOutline, IoExitOutline, IoVideocamOutline } from 'react-icons/io5';
import { MdSettings } from 'react-icons/md';
import { HiMenuAlt1, HiX } from 'react-icons/hi'; 
import Logo from '../assets/eventix Logo1.png';
import axios from 'axios';
import { getUserIdFromToken } from '../utils/utils';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [UserProfiles, setUserProfiles] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const userId = getUserIdFromToken();
  const baseUrl = 'student';

  const isSelected = (path) => currentPath.includes(path);

  useEffect(() => {
    axios
      .get('https://eventix-spring-production.up.railway.app/api/users/getAllUsersIncludingCurrent', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        const fetchedUsers = response.data.map((user) => ({
          image: user.photoUrl || 'default-image-url.jpg',
          name: `${user.firstname} ${user.lastname}`,
          id: user.id,
          email: user.email,
          role: user.role,
        }));
        setUserProfiles(fetchedUsers);

        const currentUser = fetchedUsers.find((user) => user.id === userId);
        if (currentUser) {
          setUserRole(currentUser.role);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, [userId]);

  const linkClass = (path) => {
    const fullPath = `/${baseUrl}${path}`;
    const isSelected = currentPath.includes(path);  // Check if the path is active
    return isSelected
      ? 'w-15 h-15 mb-6 text-[#AEC90A] border-[#AEC90A] rounded-lg hover:shadow hover:bg-[#AEC90A] hover:text-black py-2 bg-[#AEC90A] text-black'  // Active state style
      : 'w-15 h-15 mb-6 text-[#AEC90A] border-[#AEC90A] rounded-lg hover:shadow hover:bg-[#AEC90A] hover:text-black py-2';  // Inactive state style
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleDialogClose = () => {
    setShowLogoutDialog(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Menu for Mobile */}
      <button
        className="text-[#AEC90A] sm:hidden absolute top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <HiX size={30} /> : <HiMenuAlt1 size={30} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-stone-950 shadow-2xl text-white w-52 h-full p-4 flex flex-col justify-between items-center overflow-y-auto z-40 fixed top-0 ${
          isSidebarOpen ? 'left-0' : '-left-64'
        } sm:left-0 sm:relative transition-all duration-300`}
      >
        <div className="p-2 flex justify-center">
          <img src={Logo} alt="logo" className="w-70 h-24 ml-2 mb-2" />
        </div>

        <div className="flex flex-col items-center space-y-1 flex-grow">
          <ul className="ml-0 text-black font-bold">
            <li className={linkClass('/dashboard')} style={{ boxShadow: '0 0 7px 0 #a3e635' }}>
              <Link to={`/${baseUrl}/dashboard`} className="px-3">
                <FaHome className="inline-block w-9 h-9 mt-1 -ml-0.5" />
              </Link>
            </li>

            <li className={linkClass('/calendar')} style={{ boxShadow: '0 0 7px 0 #a3e635' }}>
              <Link to={`/${baseUrl}/calendar`} className="px-3">
                <IoCalendarNumberOutline className="inline-block w-9 h-9 -ml-0.5 mt-1" />
              </Link>
            </li>

            <li className={linkClass('/announcements')} style={{ boxShadow: '0 0 7px 0 #a3e635' }}>
            <Link
    to={`/${userRole.toLowerCase() === 'admin' ? 'admin' : 'student'}/announcements`}
    className="px-3"
  >
                <BsMegaphone className="inline-block w-9 h-9 mt-1 -ml-0.5" />
              </Link>
            </li>

            <li className={linkClass('/club')} style={{ boxShadow: '0 0 7px 0 #a3e635' }}>
              <Link to={`/${baseUrl}/club`} className="px-3">
                <FaPeopleGroup className="inline-block w-9 h-9 mt-1 -ml-0.5" />
              </Link>
            </li>

            <li className={linkClass('/meeting')} style={{ boxShadow: '0 0 7px 0 #a3e635' }}>
              <Link to={`/${baseUrl}/meeting`} className="px-3">
                <IoVideocamOutline className="inline-block w-9 h-9 mt-1 -ml-0.5" />
              </Link>
            </li>

            {(['admin', 'treasurer'].includes(userRole.toLowerCase()) ||
              currentPath.startsWith('/admin') ||
              currentPath.startsWith('/treasurer')) && (
              <li className={linkClass('/requests')} style={{ boxShadow: '0 0 7px 0 #a3e635' }}>
                <Link to={`/${baseUrl}/requests`} className="px-3">
                  <MdSettings className="inline-block w-9 h-9 mt-1 -ml-0.5" />
                </Link>
              </li>
            )}
          </ul>
        </div>

        <ul className="mb-0">
          <li className="w-28 text-[#AEC90A] border-[#AEC90A] rounded-lg hover:shadow hover:bg-[#AEC90A] hover:text-black py-2">
            <button className="px-3" onClick={() => setShowLogoutDialog(true)}>
              <span className="hover:bg-[#AEC90A] hover:text-black mr-2 mt-2 mb-2">Logout</span>
              <IoExitOutline className="inline-block w-6 h-6 mt-0" />
            </button>
          </li>
        </ul>

        {showLogoutDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <p className="mb-4 text-black ">Are you sure you want to logout?</p>
              <div className="flex space-x-2 justify-center">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-red-700"
                  onClick={handleLogout}
                >
                  Yes
                </button>
                <button
                  className="px-4 py-2 bg-[#AEC90A] rounded hover:bg-gray-400"
                  onClick={handleDialogClose}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Sidebar;
