import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsMegaphone } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoCalendarNumberOutline, IoExitOutline, IoVideocamOutline } from 'react-icons/io5';
import { MdSettings } from 'react-icons/md';
import Logo from '../assets/eventix Logo1.png';
import axios from 'axios';
import { getUserIdFromToken } from '../utils/utils'; // Utility function for getting user ID from the token

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [users, setUsers] = useState([]); // State to store the users
  const [userRole, setUserRole] = useState(''); // State to store the user's role
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Retrieve the user ID from the token
  const userId = getUserIdFromToken();

  // Base URL for student
  const baseUrl = 'student';

  // Function to determine if the item should be selected
  const isSelected = (path) => currentPath.includes(path);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Call the backend API to fetch the users
        const response = await axios.get('http://localhost:8080/api/users/getAllUsersIncludingCurrent', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        // Check if the response is successful and update the users state
        if (response.status === 200) {
          setUsers(response.data); // Assuming response.data contains the list of users
        } else {
          console.error('Error fetching users:', response.status);
          setError('Error fetching users.');
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Error fetching users.');
      } finally {
        setLoading(false); // Set loading to false after the request is completed
      }
    };

    fetchUsers(); // Call the function to fetch the users when the component mounts
  }, []);

  // To determine the link style
  const linkClass = (path) => {
    const fullPath = `/${baseUrl}${path}`;
    const isSelected = currentPath.startsWith(fullPath) || currentPath.includes(fullPath);
    return isSelected
      ? 'w-15 h-15 mb-6 text-[#AEC90A] border-[#AEC90A] rounded-lg hover:shadow hover:bg-[#AEC90A] hover:text-black py-2 bg-[#AEC90A] text-black'
      : 'w-15 h-15 mb-6 text-[#AEC90A] border-[#AEC90A] rounded-lg hover:shadow hover:bg-[#AEC90A] hover:text-black py-2';
  };

  const handleLogout = () => {
    const confirmDelete = window.confirm('Are you sure you want to Logout?');
    if (confirmDelete) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  };

  return (
    <aside className="bg-stone-950 shadow-2xl text-white w-52 h-full p-4 flex flex-col justify-between items-center overflow-y-auto">
      <div className="p-2 flex justify-center">
        <img src={Logo} alt="logo" className="w-70 h-24 ml-2 mb-4" />
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

          <li className={linkClass('/announcement')} style={{ boxShadow: '0 0 7px 0 #a3e635' }}>
            <Link to={`/${baseUrl}/announcement`} className="px-3">
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

          {['admin', 'treasurer'].includes(userRole.toLowerCase()) && (
            <li className={linkClass('/requests')} style={{ boxShadow: '0 0 7px 0 #a3e635' }}>
              <Link to={`/${baseUrl}/requests`} className="px-3">
                <MdSettings className="inline-block w-9 h-9 mt-1 -ml-0.5" />
              </Link>
            </li>
          )}
        </ul>

        {/* Display user details */}
        <div className="mt-4 w-full px-4">
          <p>User ID: {userId}</p>
          <p>User Role: {userRole}</p>

          <h2 className="text-center text-lg font-bold mb-2">User Profile</h2>
          <ul>
            {loading ? (
              <p>Loading users...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              users.map((user) => (
                <li key={user.id}>
                  {user.firstname} {user.lastname} - {user.email}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <ul className="mb-0">
        <li className="w-28 text-[#AEC90A] border-[#AEC90A] rounded-lg hover:shadow hover:bg-[#AEC90A] hover:text-black py-2">
          <a className="px-3">
            <Link to="/" onClick={handleLogout}>
              <span className="hover:bg-[#AEC90A] hover:text-black mr-2 mt-6">Logout</span>
              <IoExitOutline className="inline-block w-6 h-6 mt-0" />
            </Link>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
