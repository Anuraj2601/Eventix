import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "../assets/logo.png";
import { navItems } from "../constants";
import Login from "./login";
import SignUp from "./Signup";
import { Link } from "react-router-dom";


const LandingNav = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80 font-medium">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-auto w-[130px] mr-2" src={Logo} alt="Logo" />
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12 font-normal tracking-wider">
            {navItems.map((item, index) => (
              <li key={index} className="relative group">
                <a href={item.href} className={`hover:text-secondary ${activeItem === item.label ? "text-secondary" : ""}`}
                  onClick={() => setActiveItem(item.label)}>
                  {item.label}
                </a>
                <span className={`absolute left-1/2 transform -translate-x-1/2 -bottom-3 w-2 h-2 bg-secondary rounded-full transition-opacity ${activeItem === item.label ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                ></span>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-5 items-center font-light">
            <a
              href={Login}
              className="relative overflow-hidden w-24 h-10 flex items-center justify-center text-secondary border border-primary rounded-md font-medium transition duration-500 ease-in-out group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary w-full h-full transform -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0"></span>
              <span className="relative z-10 group-hover:text-gray-900 text-[14px] font-semibold"><Link to="/login">Login</Link></span>
            </a>
            <a
              href={SignUp}
              className="bg-gradient-to-r from-primary to-secondary w-24 h-10 rounded-md flex items-center justify-center text-gray-900 text-[14px] font-semibold"
            ><Link to="/Signup">SignUp</Link>
            </a>
          </div>

          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden text-base font-normal">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6 py-5">
              <a href="#" className="py-2 px-3 border rounded-md w-26 h-10">
                Login
              </a>
              <a
                href="#" className="py-2 px-3 rounded-md bg-gradient-to-r from-primary to-secondary w-22 h-10">
                SignUp
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LandingNav;
