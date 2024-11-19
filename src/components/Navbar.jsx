import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { BsArrowLeftCircle, BsBell } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";
import { IoPersonCircleOutline } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to generate paths under the base path '/student'
  const getLinkPath = (linkType) => {
    return `/student/${linkType}`;
  };

  // Function to check if a link is selected
  const isSelected = (linkType) => {
    return location.pathname.includes(linkType);
  };

  return (
    <nav className="bg-neutral-900 shadow-2xl flex items-center justify-between py-1 text-white px-4">
      {/* Left Section: Back Button */}
      <div className="flex items-center">
        <div className="mr-4 cursor-pointer" onClick={() => navigate(-1)}>
          <BsArrowLeftCircle className="text-[#AEC90A] hover:text-white inline-block w-6 h-6" />
        </div>
      </div>

      {/* Right Section: Image Icons */}
      <div className="flex items-center">
        <div className="flex p-2">
          <Link to={getLinkPath("messages")} className="px-3">
            <FiMessageSquare
              size={25}
              className={`inline-block ${
                isSelected("messages") ? "text-black bg-[#AEC90A] rounded-full p-1" : "text-[#AEC90A] hover:text-white"
              }`}
            />
          </Link>
          <Link to={getLinkPath("notifications")} className="px-3">
            <BsBell
              size={25}
              className={`inline-block ${
                isSelected("notifications") ? "text-black bg-[#AEC90A] rounded-full p-1" : "text-[#AEC90A] hover:text-white"
              }`}
            />
          </Link>
          <Link to={getLinkPath("profile")} className="px-3">
            <IoPersonCircleOutline
              size={25}
              className={`inline-block ${
                isSelected("profile") ? "text-black bg-[#AEC90A] rounded-full" : "text-[#AEC90A] hover:text-white"
              }`}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
