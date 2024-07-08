import React from 'react'
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

const ClubRegistrationForm = () => {

  const [openMenu, setOpenMenu] = React.useState(false);

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='bg-[#AEC90A] text-[#0B0B0B] p-1 rounded-lg '>Club Registration Form</div>
      <div className="bg-[#0B0B0B] flex flex-col items-center justify-center border-2 border-[#AEC90A] rounded-xl w-3/4 p-6">
        
        <form action="">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <label htmlFor="">Full Name</label>
              <input type="text" placeholder='Kokulrajh Sivarasa' className='block p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] w-80'/>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="">Email Address</label>
              <input type="text" placeholder='kokularajh32@gmail.com' className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'/>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="">Register No</label>
              <input type="text" placeholder='2021cs100' className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'/>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="">Index No</label>
              <input type="text" placeholder='21001006' className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'/>
            </div>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <label htmlFor="">Select a Team</label>
              <Menu open={openMenu} handler={setOpenMenu} allowHover>
                <MenuHandler>
                  <Button
                    variant="text"
                    className="flex items-center gap-3 text-base font-normal capitalize tracking-normal border-2 border-[#AEC90A] p-3"
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
                <MenuList >
                  <ul className="col-span-4 flex w-full flex-col gap-1">
                    {menuItems.map(({ title }) => (
                      <a href="#" key={title}>
                        <MenuItem>
                          <Typography variant="h6" color="blue-gray" className="mb-1">
                            {title}
                          </Typography>
                        </MenuItem>
                      </a>
                    ))}
                  </ul>
                </MenuList>
              </Menu>

            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="">Year of Study</label>
              <Menu>
                <MenuHandler>
                  <Button className='border-2 border-[#AEC90A] font-medium'>Year <HiChevronDown  strokeWidth={2.5}
                      className={`h-3.5 w-3.5 transition-transform ${
                      openMenu ? "rotate-180" : ""
                      }`}/></Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem>1st Year</MenuItem>
                  <MenuItem>2nd Year</MenuItem>
                  <MenuItem>3rd Year</MenuItem>
                  <MenuItem>4th Year</MenuItem>
                </MenuList>
              </Menu>
            </div>

            

          </div>
          <div className="menu-footer">
            <input type="text" placeholder='Why You looking forward this CLub ?...' className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] w-full' />
          </div>
          <div className="button-container">
            <Button>Clear Form</Button>
            <Button className='bg-[#AEC90A]'>Register</Button>
          </div>

        </form>

      </div>
     
    </div>
  )
}

export default ClubRegistrationForm