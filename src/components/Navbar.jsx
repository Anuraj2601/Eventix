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
    <nav className="bg-neutral-900 shadow-2xl flex items-center justify-between py-1 text-white px-4">
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
          
        </div>
        {/* Image Icons */}
        <div className="flex p-2">
          
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
