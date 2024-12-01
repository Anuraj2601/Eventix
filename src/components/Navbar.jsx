import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { BsArrowLeftCircle, BsBell } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";
import { IoPersonCircleOutline } from "react-icons/io5";
import NotificationService from "../service/NotificationService";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [notificationCount, setNotificationCount] = useState(0);

  // Function to generate paths under the base path '/student'
  const getLinkPath = (linkType) => {
    return `/student/${linkType}`;
  };

  // Function to check if a link is selected
  const isSelected = (linkType) => {
    return location.pathname.includes(linkType);
  };

  useEffect(() => {
    const fetchUnreadNotificationCount = async () => {
      const userId = localStorage.getItem('session_id');
      const token = localStorage.getItem('token');
      if (userId && token) {
        try {
          const count = await NotificationService.getUnreadNotificationCount(userId, token);
          setNotificationCount(count);

        } catch (err) {
          console.error('Error fetching unread notifications count', err);
        }
      }
    };

    fetchUnreadNotificationCount();
  }, []);

  return (
    <nav className="bg-neutral-900 shadow-2xl flex items-center justify-between py-2 px-4 text-white">
      {/* Left Section: Back Button */}
      <div className="flex items-center">
        <div
          className="mr-4 cursor-pointer hidden sm:block"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeftCircle className="text-[#AEC90A] hover:text-white inline-block w-6 h-6" />
        </div>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        <Link to={getLinkPath("messages")} className="relative">
          <FiMessageSquare
            size={25}
            className={`inline-block ${isSelected("messages")
                ? "text-black bg-[#AEC90A] rounded-full p-1"
                : "text-[#AEC90A] hover:text-white"
              }`}
          />
        </Link>
        <Link to={getLinkPath("notifications")} className="relative">
          <BsBell
            size={25}
            className={`inline-block ${isSelected("notifications")
                ? "text-black bg-[#AEC90A] rounded-full p-1"
                : "text-[#AEC90A] hover:text-white"
              }`}
          />
            {/* Badge for unread notifications */}
            {notificationCount > 0 && (
            <span className="absolute top-0 right-0 inline-block bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Link>
        <Link to={getLinkPath("profile")} className="relative">
          <IoPersonCircleOutline
            size={25}
            className={`inline-block ${isSelected("profile")
                ? "text-black bg-[#AEC90A] rounded-full"
                : "text-[#AEC90A] hover:text-white"
              }`}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
