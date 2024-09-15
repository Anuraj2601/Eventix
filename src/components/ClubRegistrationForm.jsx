import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // to extract URL params and navigate
import { submitRegistration } from '../service/registrationService'; // Import the service
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
  const { clubId } = useParams(); // Extract clubId from URL
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    clubId: clubId || '', // Initialize with clubId from URL or empty string
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      alert('Please fill in all fields and select a date.');
      return;
    }

    const registrationData = {
      ...formData,
      interviewSlot: format(selectedDate, 'yyyy-MM-dd HH:mm:ss'), // Format the date for the backend
    };

    try {
      const result = await submitRegistration(registrationData);
      alert('Registration successful!');
      navigate(`/success-page/${result.registrationId}`); // Navigate to success page after submission
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
              <label htmlFor="clubId" className="text-white">Club ID</label>
              <input
                type="text"
                name="clubId"
                value={formData.clubId}
                onChange={handleChange}
                className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] rounded-full text-white"
                placeholder="Enter Club ID"
                readOnly // Make this field read-only since clubId is extracted from the URL
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
                      className={`h-3.5 w-3.5 transition-transform ${
                        openMenu ? "rotate-180" : ""
                      }`}
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
                    <MenuItem className='hover:bg-slate-900 p-2' onClick={() => setFormData({ ...formData, year: '1st Year' })}>1st Year</MenuItem>
                    <MenuItem className='hover:bg-slate-900 p-2' onClick={() => setFormData({ ...formData, year: '2nd Year' })}>2nd Year</MenuItem>
                    <MenuItem className='hover:bg-slate-900 p-2' onClick={() => setFormData({ ...formData, year: '3rd Year' })}>3rd Year</MenuItem>
                    <MenuItem className='hover:bg-slate-900 p-2' onClick={() => setFormData({ ...formData, year: '4th Year' })}>4th Year</MenuItem>
                  </ul>
                </MenuList>
              </Menu>
            </div>

            {/* Reason field */}
            <div className="flex flex-col gap-3">
              <label htmlFor="reason" className="text-white">Reason for Joining</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] rounded-lg text-white"
                placeholder="Enter your reason for joining"
                rows="4"
              />
            </div>
          </div>

          {/* Interview Date and Time */}
          <div className="flex flex-col gap-3 mb-6">
            <label htmlFor="interviewSlot" className="text-white">Select Interview Time Slot</label>
            <DatePicker 
              selected={selectedDate}
              onChange={handleDateChange}
              showTimeSelect
              dateFormat="Pp"
              className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] rounded-full text-white'
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`bg-[#AEC90A] p-3 rounded-full text-black font-semibold w-80 ${
              !isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!isFormValid()}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClubRegistrationForm;
