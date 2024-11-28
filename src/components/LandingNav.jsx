import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "../assets/logo.png";
import { navItems } from "../constants";
import { Link } from "react-router-dom";

const LandingNav = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleScroll = (sectionId) => {
    setActiveItem(sectionId); // Update the active state
    const section = document.getElementById(sectionId); // Locate the section
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" }); // Smooth scroll
    }
  };

  const navItems = [
    { label: "Home", href: "#" },
    { label: "Events", href: "#" },
    { label: "Clubs", href: "#" },
    { label: "About-us", href: "#" },
  ];


  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80 font-medium">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-auto w-[130px] ml-28" src={Logo} alt="Logo" />
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12 font-normal tracking-wider">
            {navItems.map((item, index) => (
              <li key={index} className="relative group">
                <button
                  className={`hover:text-[#AEC90A] ${activeItem === item.label ? "text-[#AEC90A]" : "text-white"
                    }`}
                  onClick={() => handleScroll(item.label)}
                >
                  {item.label}
                </button>
                <span
                  className={`absolute left-1/2 transform -translate-x-1/2 -bottom-3 w-2 h-2 bg-[#AEC90A] rounded-full transition-opacity ${activeItem === item.label
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                    }`}
                ></span>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-5 items-center font-light mr-[120px]">
            <a
              href="/login"
              className="relative overflow-hidden w-24 h-10 flex items-center justify-center text-[#AEC90A] border border-primary rounded-md font-medium transition duration-500 ease-in-out group"
            >
              <span className="absolute inset-0 bg-gradient-to-r  from-primary to-[#DDFF00] w-full h-full transform -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0"></span>
              <span className="relative z-10 group-hover:text-gray-900 text-[14px] font-semibold ">
                Login
              </span>
            </a>
            <a
              href="/Signup"
              className="bg-gradient-to-r from-primary to-[#DBFF00] w-24 h-10 rounded-md flex items-center justify-center text-gray-900 text-[14px] font-semibold"
            >
              SignUp
            </a>
          </div>

          <div className="lg:hidden md:flex flex-col justify-end text-white">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-dark-400 border border-radious-25 text-white w-full p-12 flex flex-col justify-center items-center lg:hidden text-base font-normal">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className=" ml-96 py-4">
                  <button
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      handleScroll(item.label);
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LandingNav;
