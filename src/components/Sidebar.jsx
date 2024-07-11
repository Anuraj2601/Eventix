// src/components/Sidebar.jsx
/* import React from 'react'; */

import { useLocation } from 'react-router-dom';
import { BsMegaphone } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoCalendarNumberOutline, IoExitOutline, IoVideocamOutline } from 'react-icons/io5';

import Logo from '../assets/eventix Logo1.png.jpg';



const Sidebar = () => {
  const location = useLocation();

  // Utility function to determine if link should have active style
  const linkClass = (path) => {
    return location.pathname.startsWith(path) ? 'w-15 h-15 mb-6 text-[#AEC90A] border-[#AEC90A] rounded-lg hover:shadow hover:bg-[#AEC90A] hover:text-black py-2 bg-[#AEC90A] text-black' : 'w-15 h-15 mb-6 text-[#AEC90A] border-[#AEC90A] rounded-lg hover:shadow hover:bg-[#AEC90A] hover:text-black py-2';
  };

  return (
    <>
    <aside className="bg-stone-950 shadow-2xl text-white w-52 h-full p-4 flex flex-col justify-center items-center">
    <div className="p-3 flex justify-center">
  <img src={Logo} alt="logo" className="w-96 h-24 mb-5 ml-10" />
</div>



      <div className="flex flex-col items-center space-y-4 flex-grow">
      <ul className='mt-4 ml-0 text-black font-bold'>
      {/* <div className="bg-black rounded-lg p-3 shadow-md flex items-center justify-center w-16 h-16"  style={{ boxShadow: '0 0 10px #a3e635' }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#a3e635" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

        


           {/*  <li className='w-15 h-15 mb-6 border-2 border-[#AEC90A] text-[#AEC90A]  rounded-lg hover:shadow hover:bg-[#AEC90A] hover:text-black py-2' >
                <a href="" className='px-3'>
                    <FaHome className='inline-block w-9 h-9 mt-1 -ml-0.5'></FaHome>
                    
                </a>
            </li>
            <li className='w-15 h-15 mb-6 border-2  text-[#AEC90A] border-[#AEC90A] rounded-lg hover:shadow hover:bg-[#AEC90A] hover:text-black py-2' >
                <a href="" className='px-3'>
                    <IoCalendarNumberOutline className='inline-block w-9 h-9 -ml-0.5 mt-1'></IoCalendarNumberOutline>
                   
                </a>
            </li>
            <li className='w-15 h-15 mb-6 border-2  text-[#AEC90A] border-[#AEC90A] rounded-lg hover:shadow hover:bg-[#AEC90A] hover:text-black py-2' >
                <a href="" className='px-3'>
                    <BsMegaphone className='inline-block w-9 h-9 mt-1 -ml-0.5'></BsMegaphone>
                    
                </a>
            </li>
            <li className='w-15 h-15 mb-6 border-2  text-[#AEC90A] border-[#AEC90A] rounded-lg hover:shadow hover:bg-[#AEC90A] hover:text-black py-2' >
                <a href="" className='px-3'>
                    <FaPeopleGroup className='inline-block w-9 h-9 mt-1 -ml-0.5'></FaPeopleGroup>
                   
                </a>
            </li>
            <li className='w-15 h-15 mb-6 border-2 text-[#AEC90A] border-[#AEC90A] rounded-lg hover:shadow hover:bg-[#AEC90A] hover:text-black py-2'>
                <a href="" className='px-3'>
                    <IoVideocamOutline className='inline-block w-9 h-9 mt-1 -ml-0.5'></IoVideocamOutline>
                   
                </a>
            </li> */}
            


          <li className={linkClass('/Dashboard')} style={{ boxShadow: '0 0 10px #a3e635' }}>
            <a href="/Dashboard" className='px-3'>
              <FaHome className='inline-block w-9 h-9 mt-1 -ml-0.5' />
            </a>
          </li>
          <li className={linkClass('/calendar')} style={{ boxShadow: '0 0 10px #a3e635' }}>
            <a href="/calendar" className='px-3'>
              <IoCalendarNumberOutline className='inline-block w-9 h-9 -ml-0.5 mt-1' />
            </a>
          </li>
          <li className={linkClass('/announcement')} style={{ boxShadow: '0 0 10px #a3e635' }}>
            <a href="/announcement" className='px-3'>
              <BsMegaphone className='inline-block w-9 h-9 mt-1 -ml-0.5' />
            </a>
          </li>
          <li className={linkClass('/club')} style={{ boxShadow: '0 0 10px #a3e635' }}>
            <a href="/club" className='px-3'>
              <FaPeopleGroup className='inline-block w-9 h-9 mt-1 -ml-0.5' />
            </a>
          </li>
          <li className={linkClass('/meeting')} style={{ boxShadow: '0 0 10px #a3e635' }}>
            <a href="/meeting" className='px-3'>
              <IoVideocamOutline className='inline-block w-9 h-9 mt-1 -ml-0.5' />
            </a>
          </li>

        </ul>
      </div>
      <ul className='mt-10 ml-0 text-black'>
        <li className='w-28 text-[#AEC90A] border-[#AEC90A] rounded-lg hover:shadow hover:bg-[#AEC90A] hover:text-black py-2'>
          <a href="/logout" className='px-3'>
            <span className='text-end mr-2 mt-6'>Logout</span>
            <IoExitOutline className='inline-block w-6 h-6 mt-0' />
          </a>
        </li>
      </ul>

    </aside>

    </>
  );
};

export default Sidebar;
