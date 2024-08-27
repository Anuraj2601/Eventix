import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { BsArrowLeftCircle, BsBell } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";
import { BiHelpCircle } from "react-icons/bi";


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getBasePath = () => {
    const pathParts = location.pathname.split('/');
    return pathParts.length > 1 ? `/${pathParts[1]}` : '';
  };

  const getLinkPath = (basePath, linkType) => {
    return `${basePath}/${linkType}`;
  };

  const isSelected = (linkType) => {
    return location.pathname.includes(linkType);
  };

  const basePath = getBasePath();

  return (
    <nav className="bg-[#27272a] shadow-2xl flex items-center justify-between py-1 text-white px-4">
      {/* Left Section: Back Button */}
      <div className="flex items-center">
        <div className="mr-4 cursor-pointer" onClick={() => navigate(-1)}>
          <BsArrowLeftCircle className="text-[#AEC90A] hover:text-white inline-block w-6 h-6" />
        </div>
      </div>

      {/* Right Section: Image Icons and Search Box */}
      <div className="flex items-center">
        {/* Centered Search Box */}
        <div className="relative mr-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 h-9 bg-neutral-900 text-white rounded-full py-1 px-3 focus:ring focus:border-[#AEC90A] border-[#AEC90A] text-center"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#AEC90A]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.3}
              stroke="#AEC90A"
              className="size-5"
              style={{ opacity: 0.7 }}
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {/* Image Icons */}
        <div className="flex">
          <Link to={getLinkPath(basePath, 'inquiry')} className="px-3">
            <BiHelpCircle size={25} className={`inline-block  ${isSelected('inquiry') ? 'text-black bg-[#AEC90A]  rounded-full ' : 'text-[#AEC90A] hover:text-white'}`} />
          </Link>
          <Link to={getLinkPath(basePath, 'messages')} className="px-3">
            <FiMessageSquare size={25} className={`inline-block  ${isSelected('message') ? 'text-black bg-[#AEC90A]  rounded-full p-1' : 'text-[#AEC90A] hover:text-white'}`} />
          </Link>
          <Link to={getLinkPath(basePath, 'notifications')} className="px-3">
            <BsBell size={25} className={`inline-block  ${isSelected('notifications') ? 'text-black bg-[#AEC90A]  rounded-full p-1' : 'text-[#AEC90A] hover:text-white'}`} />
          </Link>
          <Link to={getLinkPath(basePath, 'profile')} className="px-3">
            <IoPersonCircleOutline size={25} className={`inline-block  ${isSelected('profile') ? 'text-black bg-[#AEC90A]  rounded-full' : 'text-[#AEC90A] hover:text-white'}`} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
