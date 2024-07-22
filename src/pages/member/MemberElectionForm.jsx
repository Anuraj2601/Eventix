import React, { useState} from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';


import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
} from "@material-tailwind/react";
// import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { HiChevronDown } from "react-icons/hi";

const menuItems = [
  {
    title: "Design Team",
  },
  {
    title: "Program Team",
  },
  {
    title: "Finance Team",
  },
];

const MemberElectionForm = () => {

  const [openMenu, setOpenMenu] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);

  return (
    <>
      <div className="fixed inset-0 flex">
        <Sidebar className="flex-shrink-0" />
        <div className="flex flex-col flex-1">
          <Navbar className="sticky top-0 z-10 p-4" />
          <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-hidden">

    <div className='flex flex-col items-center justify-center relative mt-10'>
      <div className='bg-[#AEC90A] text-[#0B0B0B] p-1 rounded-lg font-semibold absolute -top-4'>Apply as a candidate for the election of board of term 24/25</div>
      <div className="bg-[#0B0B0B] flex flex-col items-center justify-center border-2 border-[#AEC90A] rounded-xl w-3/5 py-9">
        
        <form action="">
          
          <div className="grid gap-10 mb-6 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              
              <label htmlFor="" className="text-white">The team you are from *</label>
              <Menu open={openMenu} handler={setOpenMenu} allowHover>
                <MenuHandler>
                  <Button
                    variant="text"
                    className="flex items-center justify-between gap-3 text-base font-normal capitalize tracking-normal border-2 border-[#AEC90A] p-3 rounded-none w-80 text-[#9ca3af]"
                  >
                    Team{" "}
                    <HiChevronDown 
                      strokeWidth={2.5}
                      className={`h-3.5 w-3.5 transition-transform ${
                        openMenu ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </MenuHandler>
                <MenuList className='bg-[#0B0B0B] p-0 border-[#AEC90A]'>
                  <ul className="col-span-4 flex w-80 flex-col gap-1 text-white">
                    {menuItems.map(({ title }) => (
                      <a href="#" key={title}>
                        <MenuItem className='hover:bg-slate-900 p-2 '>
                          
                            {title}
                     
                        </MenuItem>
                      </a>
                    ))}
                  </ul>
                </MenuList>
              </Menu>

            </div>
            <div className="flex flex-col gap-3">
             
              <label htmlFor="" className="text-white">Year of Study *</label>
              <Menu open={openMenu2} handler={setOpenMenu2} allowHover>
                <MenuHandler>
                  <Button
                    variant="text"
                    className="flex items-center justify-between gap-3 text-base font-normal capitalize tracking-normal border-2 border-[#AEC90A] p-3 rounded-none w-80 text-[#9ca3af]"
                  >
                    Year{" "}
                    <HiChevronDown 
                      strokeWidth={2.5}
                      className={`h-3.5 w-3.5 transition-transform ${
                        openMenu2 ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </MenuHandler>
                <MenuList className='bg-[#0B0B0B] p-0 border-[#AEC90A]'>
                  <ul className="col-span-4 flex w-80 flex-col gap-1 text-white ">
                    <MenuItem className='hover:bg-slate-900 p-2 '>1st Year</MenuItem>
                    <MenuItem className='hover:bg-slate-900 p-2 '>2nd Year</MenuItem>
                    <MenuItem className='hover:bg-slate-900 p-2 '>3rd Year</MenuItem>
                    <MenuItem className='hover:bg-slate-900 p-2 '>4th Year</MenuItem>
                  </ul>
                </MenuList>
              </Menu>
            </div>

            

          </div>
          <label htmlFor="" className="text-white">The board position you would like to apply *</label>
          <div className="flex mt-5">
            <input type="text" placeholder='secretary' className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full h-full' />
          </div>
          <div className="flex mt-9">
            <input type="text" placeholder='Why You looking forward this Club ?...' className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full h-full' />
          </div>
          <div className="flex items-center justify-center mt-6 gap-4">
            <Button className='border-2 border-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#AEC90A]'>Clear Form</Button>
            <Button className='bg-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#0B0B0B]'>Register</Button>
          </div>

        </form>

      </div>
     
    </div>
    </div>
        </div>
      </div>
    </>
  )
}

export default MemberElectionForm;
