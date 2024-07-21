import React, { useState } from 'react';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { HiChevronDown } from "react-icons/hi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

// Define the menu items for the team selection
const menuItems = [
  { title: "Design Team" },
  { title: "Program Team" },
  { title: "Finance Team" },
  { title: "Marketing Team" },
];

const ClubRegistrationForm = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    fullName: 'Kokulrajh Sivarasa',
    email: 'kokularajh32@gmail.com',
    registerNo: '2021cs100',
    indexNo: '21001006',
    team: '',
    year: '',
    reason: ''
  });

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Handle changes in form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Check if the form is valid
  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '') && selectedDate !== null;
  };

  // Format selected date for display
  const formatSelectedDate = (date) => {
    if (date) {
      return format(date, "MMMM d'th' h:mm a");
    }
    return '';
  };

  return (
    <div className='flex flex-col items-center justify-center relative'>
      <div className='bg-[#AEC90A] text-[#0B0B0B] p-1 rounded-lg font-semibold absolute -top-4'>Club Registration Form</div>
      <div className="bg-[#0B0B0B] flex flex-col items-center justify-center border-2 border-[#AEC90A] rounded-lg w-3/5 py-9">
        <form action="">
          <div className="grid gap-x-10 gap-y-6 mb-6 md:grid-cols-2">
            <div className="flex flex-col gap-3 w-80">
              <label htmlFor="fullName" className="text-white">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                readOnly
                className='block p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] rounded-full text-white'
              />
            </div>
            <div className="flex flex-col gap-3 w-80">
              <label htmlFor="email" className="text-white">Email Address</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                readOnly
                className='block p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] rounded-full text-white'
              />
            </div>
            <div className="flex flex-col gap-3 w-80">
              <label htmlFor="registerNo" className="text-white">Register No</label>
              <input
                type="text"
                id="registerNo"
                name="registerNo"
                value={formData.registerNo}
                readOnly
                className='block p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] rounded-full text-white'
              />
            </div>
            <div className="flex flex-col gap-3 w-80">
              <label htmlFor="indexNo" className="text-white">Index No</label>
              <input
                type="text"
                id="indexNo"
                name="indexNo"
                value={formData.indexNo}
                readOnly
                className='block p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] rounded-full text-white'
              />
            </div>
          </div>
          <div className="grid gap-10 mb-6 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <label htmlFor="team" className="text-white">Select a Team</label>
              <Menu open={openMenu} handler={setOpenMenu} allowHover>
                <MenuHandler>
                  <Button
                    variant="text"
                    className="flex items-center justify-between gap-3 text-base font-normal capitalize tracking-normal border-2 border-[#AEC90A] p-3 rounded-full w-80 text-[#9ca3af]"
                  >
                    {formData.team || "Team"}{" "}
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
                      <a href="#" key={title} onClick={() => setFormData({ ...formData, team: title })}>
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
              <label htmlFor="year" className="text-white">Year of Study</label>
              <Menu open={openMenu2} handler={setOpenMenu2} allowHover>
                <MenuHandler>
                  <Button
                    variant="text"
                    className="flex items-center justify-between gap-3 text-base font-normal capitalize tracking-normal border-2 border-[#AEC90A] p-3 rounded-full w-80 text-[#9ca3af]"
                  >
                    {formData.year || "Year"}{" "}
                    <HiChevronDown 
                      strokeWidth={2.5}
                      className={`h-3.5 w-3.5 transition-transform ${
                        openMenu2 ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </MenuHandler>
                <MenuList className='bg-[#0B0B0B] p-0 border-[#AEC90A]'>
                  <ul className="col-span-4 flex w-80 flex-col gap-1 text-white">
                    <MenuItem className='hover:bg-slate-900 p-2 ' onClick={() => setFormData({ ...formData, year: '1st Year' })}>1st Year</MenuItem>
                    <MenuItem className='hover:bg-slate-900 p-2 ' onClick={() => setFormData({ ...formData, year: '2nd Year' })}>2nd Year</MenuItem>
                    <MenuItem className='hover:bg-slate-900 p-2 ' onClick={() => setFormData({ ...formData, year: '3rd Year' })}>3rd Year</MenuItem>
                    <MenuItem className='hover:bg-slate-900 p-2 ' onClick={() => setFormData({ ...formData, year: '4th Year' })}>4th Year</MenuItem>
                  </ul>
                </MenuList>
              </Menu>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 mb-6">
            <label htmlFor="interviewSlot" className="text-white">Interview Time Slot (2nd July to 22nd July, 2021)</label>
            <DatePicker 
              selected={selectedDate}
              onChange={handleDateChange}
              showTimeSelect
              dateFormat="Pp"
              className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] rounded-full text-white w-full'
              placeholderText="Select a date and time"
            />
          </div>

          <div className="flex flex-col gap-3 mb-6">
            <label htmlFor="reason" className="text-white">Reason for Joining Club</label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className='block p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] rounded-full text-white'
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={!isFormValid()}
              className='bg-[#AEC90A] text-[#0B0B0B] px-5 py-3 rounded-full font-semibold disabled:opacity-50'
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClubRegistrationForm;
