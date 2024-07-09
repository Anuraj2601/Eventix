// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { BsArrowLeftCircle, BsBell } from "react-icons/bs";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-neutral-900 p-6 shadow-2xl flex items-center justify-between py-2 text-white px-4">
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
            className="w-64 h-9 bg-neutral-950 text-white rounded-full py-1 px-3 focus:ring focus:border-[#AEC90A] border-2 border-[#AEC90A] text-center"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#AEC90A]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#a3e635"
              className="size-5"
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
          <a href="" className="px-3">
            <MdInfoOutline className="text-[#AEC90A] hover:text-white inline-block w-6 h-6" />
          </a>
          <a href="" className="px-3">
            <MdOutlineEmail className="text-[#AEC90A] hover:text-white inline-block w-6 h-6" />
          </a>
          <a href="" className="px-3">
            <BsBell className="text-[#AEC90A] hover:text-white inline-block w-6 h-6" />
          </a>
          <a href="" className="px-3">
            <IoPersonCircleOutline className="text-[#AEC90A] hover:text-white inline-block w-6 h-6" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
