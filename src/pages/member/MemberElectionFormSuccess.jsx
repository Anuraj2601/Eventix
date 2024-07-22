

import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { HiChevronDown } from "react-icons/hi";

const menuItems = [
  {
    title: "mon 7-8 pm",
  },
  {
    title: "mon 9-10 pm",
  },
  {
    title: "tue 7-8 pm",
  },
  {
    title: "tue 9-10 pm",
  },
];

const MemberElectionFormSuccess = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
    <div className="fixed inset-0 flex">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1">
        <Navbar className="sticky top-0 z-10 p-4" />
        <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-hidden">
    <div className='flex flex-col items-center justify-center relative mt-20 px-4 md:px-8 lg:px-16'>
      <div className='bg-[#AEC90A] text-[#0B0B0B] p-1 rounded-lg font-semibold absolute -top-4'>Congratulations!!!</div>
      <div className="bg-[#0B0B0B] flex flex-col items-center justify-center border-2 border-[#AEC90A] rounded-xl w-full max-w-2xl py-10">
        <form action="">
          <div className="flex flex-col items-center">
            <p className="text-white">You are selected to be one of the top 7 candidates</p>
            <p className="text-white mb-8 text-sm font-normal">Please select your available time slot for your interview of the next level selection</p>
            <Menu open={openMenu} handler={setOpenMenu} allowHover>
              <MenuHandler>
                <Button
                  variant="text"
                  className="flex items-center justify-between gap-3 text-base font-normal capitalize tracking-normal border-2 border-[#AEC90A] p-3 rounded-none w-80 text-[#9ca3af]"
                >
                  Select a time slot{" "}
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
          <div className="flex items-center justify-center mt-6 gap-4">
            <Button className='bg-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#0B0B0B]'>Save</Button>
          </div>
        </form>
      </div>
    </div>
    </div>
        </div>
      </div>
    </>

  );
}

export default MemberElectionFormSuccess;

