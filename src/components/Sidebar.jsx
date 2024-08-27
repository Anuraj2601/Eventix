import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsMegaphone } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoCalendarNumberOutline, IoExitOutline, IoVideocamOutline } from 'react-icons/io5';
import { MdSettings } from 'react-icons/md';

import Logo from '../assets/eventix Logo1.png';
import UsersService from '../service/UsersService';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Extract base URL (e.g., /club, /calendar)
  const baseUrl = currentPath.split('/')[1];

  // Function to determine if the item should be selected
  const isSelected = (path) => currentPath.includes(path);

  // Utility function to determine if link should have active style
  const linkClass = (path) => {
    const fullPath = `/${baseUrl}${path}`;
    const isSelected = currentPath.startsWith(fullPath) || currentPath.includes(fullPath);
    return isSelected
    ? 'w-15 h-15 mb-6 text-[#18181b]  rounded-lg hover:shadow hover:bg-[#d946ef] hover:text-black py-2 bg-[#d946ef]  text-black'
    : 'w-15 h-15 mb-6 text-[#d946ef] border-[#d946ef] rounded-lg hover:shadow hover:bg-[#18181b] hover:text-[#d946ef] py-2 bg-gray-900 bg-opacity-30 backdrop-blur-lg shadow-lg shadow-black/50';
   };

  const handleLogout = () => {
    const confirmDelete = window.confirm('Are you sure you want to Logout?');
    if (confirmDelete) {
      UsersService.logout();
    }
  };

  return (
    <aside className="bg-gradient-to-b from-[#3f3f46] to-[#701a75] bg-opacity-10 backdrop-blur-full shadow-lg shadow-black/50   shadow-2xl text-white w-52 h-full p-4 flex flex-col justify-between items-center overflow-y-auto">
      <div className="p-2 flex justify-center ">
        <img src={Logo} alt="logo" className="w-72 h-24 ml-2 mb-4 " />
      </div>

      <div className="flex flex-col items-center space-y-1 flex-grow">
        <ul className="ml-0 text-black font-bold">
          <li className={linkClass('/dashboard')} style={{ boxShadow: '0 0 7px 0 black' }}>
            <Link to={`/${baseUrl}/dashboard`} className="px-3">
              <FaHome className="inline-block w-9 h-9 mt-1 -ml-0.5" />
            </Link>
          </li>
          <li className={linkClass('/calendar')} style={{ boxShadow: '0 0 7px 0 black' }}>
            <Link to={`/${baseUrl}/calendar`} className="px-3">
              <IoCalendarNumberOutline className="inline-block w-9 h-9 -ml-0.5 mt-1" />
            </Link>
          </li>
          <li className={linkClass('/announcement')} style={{ boxShadow: '0 0 7px 0 black' }}>
            <Link to={`/${baseUrl}/announcement`} className="px-3">
              <BsMegaphone className="inline-block w-9 h-9 mt-1 -ml-0.5" />
            </Link>
          </li>
          <li className={linkClass('/club')} style={{ boxShadow: '0 0 7px 0 black' }}>
            <Link to={`/${baseUrl}/club`} className="px-3">
              <FaPeopleGroup className="inline-block w-9 h-9 mt-1 -ml-0.5" />
            </Link>
          </li>
          {(currentPath.startsWith('/admin')  || currentPath.startsWith('/treasurer'))  ? null : (
            <li className={linkClass('/meeting')} style={{ boxShadow: '0 0 7px 0 black' }}>
              <Link to={`/${baseUrl}/meeting`} className="px-3">
                <IoVideocamOutline className="inline-block w-9 h-9 mt-1 -ml-0.5" />
              </Link>
            </li>
          )}
          {(currentPath.startsWith('/admin') || currentPath.startsWith('/treasurer')) && (
            <li className={linkClass('/requests')} style={{ boxShadow: '0 0 7px 0 black' }}>
              <Link to={`/${baseUrl}/requests`} className="px-3">
                <MdSettings className="inline-block w-9 h-9 mt-1 -ml-0.5" />
              </Link>
            </li>
          )}
        </ul>
      </div>

      <ul className="mb-0">
        <li className="w-28 text-[#18181b] border-[#18181b] rounded-lg hover:shadow hover:bg-[#18181b] hover:text-black ">
          <a className="px-3">
            <Link to="/" onClick={handleLogout}>
              <span className=" hover:bg-[#18181b] hover:text-black mr-2 mt-6">Logout</span>
              <IoExitOutline className="inline-block w-6 h-6 mt-0" />
            </Link>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
