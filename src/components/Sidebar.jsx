import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsMegaphone } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoCalendarNumberOutline, IoExitOutline, IoVideocamOutline } from 'react-icons/io5';
import { MdSettings } from 'react-icons/md';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

import Logo from '../assets/eventix Logo1.png';
import UsersService from '../service/UsersService';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  // Extract base URL (e.g., /club, /calendar)
  const baseUrl = currentPath.split('/')[1];

  // Function to determine if the item should be selected
  const isSelected = (path) => currentPath.includes(path);

  // Utility function to determine if link should have active style
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
      UsersService.logout();
    }
  };

  return (
    <div>
      <div className="md:hidden flex justify-between items-center p-4 bg-stone-950">
        {/* <img src={Logo} alt="logo" className="w- h-auto" /> */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
        </button>
      </div>

      <aside className={`bg-stone-950 shadow-2xl text-white w-52 h-full p-4 flex flex-col justify-between items-center overflow-y-auto ${isOpen ? 'block' : 'hidden'} md:flex`}>
      <div className="p-2 flex justify-center ">
        <img src={Logo} alt="logo" className="w-70 h-24 ml-2 mb-4 " />
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
          {(currentPath.startsWith('/admin')  || currentPath.startsWith('/treasurer'))  ? null : (
            <li className={linkClass('/meeting')} style={{ boxShadow: '0 0 7px 0 #a3e635' }}>
              <Link to={`/${baseUrl}/meeting`} className="px-3">
                <IoVideocamOutline className="inline-block w-9 h-9 mt-1 -ml-0.5" />
              </Link>
            </li>
          )}
          {(currentPath.startsWith('/admin') || currentPath.startsWith('/treasurer')) && (
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
          <a className="px-3">
            <Link to="/" onClick={handleLogout}>
              <span className=" hover:bg-[#AEC90A] hover:text-black mr-2 mt-6">Logout</span>
              <IoExitOutline className="inline-block w-6 h-6 mt-0" />
            </Link>
          </a>
        </li>
      </ul>
    </aside>
    </div>
  );
};

export default Sidebar;
