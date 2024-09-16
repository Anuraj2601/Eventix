import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // to extract URL params and navigate
import registrationService from '../service/registrationService'; // Import the registration service
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

const menuItems = [
  { title: "Design Team" },
  { title: "Program Team" },
  { title: "Finance Team" },
  { title: "Marketing Team" },
];

const ClubRegistrationForm = () => {
  const { club_id } = useParams(); // Extract club_id from URL
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    club_id: club_id || '', // Initialize with club_id from URL or empty string
    fullName: '',
    email: '',
    registerNo: '',
    indexNo: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isFormValid()) {
      alert('Please fill in all fields and select a date.');
      return;
    }
  
    const registrationData = {
      ...formData,
      interviewSlot: format(selectedDate, 'yyyy-MM-dd HH:mm:ss'), // Format the date
    };
  
    const token = localStorage.getItem('token'); // Retrieve token
  
    try {
      const result = await registrationService.saveRegistration(registrationData, token); // Use the registration service
      alert('Registration successful!');
      navigate(`/success-page/${result.registrationId}`);
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Failed to submit the form.');
    }
  };
  
  return (
    <div className='flex flex-col items-center justify-center relative'>
      <div className='bg-[#AEC90A] text-[#0B0B0B] p-1 rounded-lg font-semibold absolute -top-4'>
        Club Registration Form
      </div>
      <div className="bg-[#0B0B0B] flex flex-col items-center justify-center border-2 border-[#AEC90A] rounded-lg w-3/5 py-9">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-x-10 gap-y-6 mb-6 md:grid-cols-2">
            {/* Club ID field */}
            <div className="flex flex-col gap-3">
              <label htmlFor="club_id" className="text-white">Club ID</label>
              <input
                type="text"
                name="club_id"
                value={formData.club_id}
                onChange={handleChange}
                className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] rounded-full text-white"
                placeholder="Enter Club ID"
                readOnly // Make this field read-only since club_id is extracted from the URL
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="fullName" className="text-white">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] rounded-full text-white"
                placeholder="Enter your full name"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-white">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] rounded-full text-white"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="registerNo" className="text-white">Register No</label>
              <input
                type="text"
                name="registerNo"
                value={formData.registerNo}
                onChange={handleChange}
                className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] rounded-full text-white"
                placeholder="Enter your register number"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="indexNo" className="text-white">Index No</label>
              <input
                type="text"
                name="indexNo"
                value={formData.indexNo}
                onChange={handleChange}
                className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] rounded-full text-white"
                placeholder="Enter your index number"
              />
            </div>
          </div>

          <div className="grid gap-10 mb-6 md:grid-cols-2">
            {/* Team menu */}
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
                      className={`h-3.5 w-3.5 transition-transform ${openMenu ? "rotate-180" : ""}`}
                    />
                  </Button>
                </MenuHandler>
                <MenuList className='bg-[#0B0B0B] p-0 border-[#AEC90A]'>
                  <ul className="col-span-4 flex w-80 flex-col gap-1 text-white">
                    {menuItems.map(({ title }) => (
                      <MenuItem key={title} className='hover:bg-slate-900 p-2' onClick={() => setFormData({ ...formData, team: title })}>
                        {title}
                      </MenuItem>
                    ))}
                  </ul>
                </MenuList>
              </Menu>
            </div>

            {/* Year of Study menu */}
            <div className="flex flex-col gap-3">
              <label htmlFor="year" className="text-white">Select Year of Study</label>
              <Menu open={openMenu2} handler={setOpenMenu2} allowHover>
                <MenuHandler>
                  <Button
                    variant="text"
                    className="flex items-center justify-between gap-3 text-base font-normal capitalize tracking-normal border-2 border-[#AEC90A] p-3 rounded-full w-80 text-[#9ca3af]"
                  >
                    {formData.year || "Year"}{" "}
                    <HiChevronDown 
                      strokeWidth={2.5}
                      className={`h-3.5 w-3.5 transition-transform ${openMenu2 ? "rotate-180" : ""}`}
                    />
                  </Button>
                </MenuHandler>
                <MenuList className='bg-[#0B0B0B] p-0 border-[#AEC90A]'>
                  <ul className="col-span-4 flex w-80 flex-col gap-1 text-white">
                    {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((title) => (
                      <MenuItem key={title} className='hover:bg-slate-900 p-2' onClick={() => setFormData({ ...formData, year: title })}>
                        {title}
                      </MenuItem>
                    ))}
                  </ul>
                </MenuList>
              </Menu>
            </div>
          </div>

          {/* Reason for Joining */}
          <div className="flex flex-col mb-6 gap-3">
            <label htmlFor="reason" className="text-white">Why do you want to join this club?</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] rounded-lg text-white resize-none"
              placeholder="Explain your reason here"
              rows="3"
            />
          </div>

          {/* Date and time picker */}
          <div className="flex flex-col gap-3 mb-6">
            <label htmlFor="interviewSlot" className="text-white">Select Interview Slot</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              showTimeSelect
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] rounded-full text-white"
              placeholderText="Choose interview time"
            />
          </div>

          {/* Submit button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="py-3 px-6 bg-[#AEC90A] text-[#0B0B0B] rounded-full font-semibold"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClubRegistrationForm;
