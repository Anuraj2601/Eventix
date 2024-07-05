// src/components/Sidebar.jsx
import React from 'react';
import { BsMegaphone } from 'react-icons/bs'
import { FaCalendar, FaHome } from 'react-icons/fa'
import { FaPeopleGroup } from 'react-icons/fa6'
import { IoCalendarNumberOutline, IoExitOutline, IoVideocamOutline } from 'react-icons/io5'
import Logo from '../assets/eventix Logo1.png'


const Sidebar = () => {
  return (
    <aside className="bg-stone-950 shadow-2xl text-white w-52 h-full p-4 flex flex-col justify-center items-center">
      <div className="p-3 flex items-center justify-center">
        <img src={Logo} alt="logo" className="w-32 h-24 ml-3 mb-5 mr-auto" />
      </div>
      <div className="flex flex-col items-center space-y-4 flex-grow">
      {/* <div className="bg-black rounded-lg p-3 shadow-md flex items-center justify-center w-16 h-16"  style={{ boxShadow: '0 0 10px #a3e635' }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#a3e635" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

</div>

        <div className="bg-black rounded-lg p-3 shadow-md flex items-center justify-center w-16 h-16"   style={{ boxShadow: '0 0 10px #a3e635' }}
>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#a3e635" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
</svg>
        </div>
        <div className="bg-black rounded-lg p-3 shadow-md flex items-center justify-center w-16 h-16"  style={{ boxShadow: '0 0 10px #a3e635' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#a3e635" className="size-6">
  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
  <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
</svg>
        </div>
        <div className="bg-black rounded-lg p-3 shadow-md flex items-center justify-center w-16 h-16"  style={{ boxShadow: '0 0 10px #a3e635' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#a3e635" className="size-6">
  <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
  <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
</svg>
        </div>
        <div className="bg-black rounded-lg p-3 shadow-md flex items-center justify-center w-16 h-16"  style={{ boxShadow: '0 0 10px #a3e635' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#a3e635" className="size-6">
  <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
</svg>
        </div> */}
        <ul className='mt-4 ml-0 text-black font-bold'>
            <li className='w-15 h-15 mb-6 border-2 border-[#AEC90A] text-[#AEC90A]  rounded-lg hover:shadow hover:bg-[#AEC90A] hover:text-black py-2' /* style={{ boxShadow: '0 0 10px #a3e635' }} */>
                <a href="" className='px-3'>
                    <FaHome className='inline-block w-9 h-9 mt-1 -ml-0.5'></FaHome>
                    {/* Home */}
                </a>
            </li>
            <li className='w-15 h-15 mb-6 border-2  text-[#AEC90A] border-[#AEC90A] rounded-lg hover:shadow hover:bg-[#AEC90A] hover:text-black py-2' /* style={{ boxShadow: '0 0 10px #a3e635' }} */>
                <a href="" className='px-3'>
                    <IoCalendarNumberOutline className='inline-block w-9 h-9 -ml-0.5 mt-1'></IoCalendarNumberOutline>
                    {/* Calendar */}
                </a>
            </li>
            <li className='w-15 h-15 mb-6 border-2  text-[#AEC90A] border-[#AEC90A] rounded-lg hover:shadow hover:bg-[#AEC90A] hover:text-black py-2' /* style={{ boxShadow: '0 0 10px #a3e635' }} */>
                <a href="" className='px-3'>
                    <BsMegaphone className='inline-block w-9 h-9 mt-1 -ml-0.5'></BsMegaphone>
                    {/* Announcement */}
                </a>
            </li>
            <li className='w-15 h-15 mb-6 border-2  text-[#AEC90A] border-[#AEC90A] rounded-lg hover:shadow hover:bg-[#AEC90A] hover:text-black py-2' /* style={{ boxShadow: '0 0 10px #a3e635' }} */>
                <a href="" className='px-3'>
                    <FaPeopleGroup className='inline-block w-9 h-9 mt-1 -ml-0.5'></FaPeopleGroup>
                    {/* Clubs */}
                </a>
            </li>
            <li className='w-15 h-15 mb-6 border-2 text-[#AEC90A] border-[#AEC90A] rounded-lg hover:shadow hover:bg-[#AEC90A] hover:text-black py-2'/* style={{ boxShadow: '0 0 10px #a3e635' }} */>
                <a href="" className='px-3'>
                    <IoVideocamOutline className='inline-block w-9 h-9 mt-1 -ml-0.5'></IoVideocamOutline>
                    {/* Meeting */}
                </a>
            </li>
            
        </ul>
      </div>
     {/*  <div className="p-3 flex items-center justify-center">
        Logout 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#a3e635" className="size-7">
  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
</svg>
      </div> */}
      <ul className='mt-10 ml-0 text-black'>
        <li className='w-28 text-[#AEC90A] border-[#AEC90A] rounded-lg hover:shadow hover:bg-[#AEC90A] hover:text-black py-2'>
                <a href="" className='px-3'>
                    <span className='text-end mr-2 mt-6'>Logout</span>
                    <IoExitOutline className='inline-block w-6 h-6 mt-0 '></IoExitOutline>
                    {/* Meeting */}
                </a>
            </li>
        </ul>
    </aside>
    
  );
};

export default Sidebar;
