import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";
import { HiChevronDown } from "react-icons/hi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { getUserEmailFromToken } from '../utils/utils'; // Ensure this function is correctly implemented
import RegistrationService from '../service/registrationService';

const menuItems = [
  { title: "Design Team" },
  { title: "Program Team" },
  { title: "Finance Team" },
  { title: "Marketing Team" },
];

const ClubRegistrationForm = () => {
  const { club_id } = useParams();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    club_id: club_id || '',
    email: '',
    team: '',
    reason: '',
    interviewSlot: '',
    position: 'student', // Default value for position
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const email = getUserEmailFromToken(); // Utility function to fetch user email from token
        setFormData(prevState => ({ ...prevState, email }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserEmail();
  }, [club_id]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData(prevState => ({
      ...prevState,
      interviewSlot: date ? format(date, "yyyy-MM-dd'T'HH:mm:ss") : ''
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMenuItemClick = (title) => {
    setFormData(prevState => ({ ...prevState, team: title }));
    setOpenMenu(false);
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '') && selectedDate !== null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert('Please fill in all fields and select a date.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not authenticated.');
      return;
    }

    // Log the token for debugging
    console.log('Submitting with token:', token);

    try {
      await RegistrationService.saveRegistration(
        formData.email,
        formData.club_id,
        formData.team,
        formData.interviewSlot,
        formData.reason,
        formData.position, // Include position in the request
        token
      );
      alert('Registration successful!');
      navigate(`/student/club`);
    } catch (error) {
      const errorMessage = error.message || 'Failed to submit the form.';
      alert(errorMessage);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
                type="number"
                name="club_id"
                value={formData.club_id}
                className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] rounded-full text-white"
                placeholder="Club ID"
                readOnly
              />
            </div>

            {/* Email field */}
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-white">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] rounded-full text-white"
                placeholder="Email"
                readOnly
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
                      <MenuItem
                        key={title}
                        className='hover:bg-slate-900 p-2'
                        onClick={() => handleMenuItemClick(title)}
                      >
                        {title}
                      </MenuItem>
                    ))}
                  </ul>
                </MenuList>
              </Menu>
            </div>

            {/* Interview Slot */}
            <div className="flex flex-col gap-3">
              <label htmlFor="interviewSlot" className="text-white">Select Interview Slot</label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                className="w-80 text-white rounded-full border-2 border-[#AEC90A] bg-[#0B0B0B] p-3"
                placeholderText="Pick a date"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                withPortal
              />
            </div>
          </div>

          {/* Reason field */}
          <div className="flex flex-col mb-6 gap-3">
            <label htmlFor="reason" className="text-white">Reason</label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="4"
              className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] rounded-lg text-white"
              placeholder="Enter the reason you want to join this club"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="p-3 w-80 bg-[#AEC90A] text-white rounded-full hover:bg-[#9ca3af]"
              disabled={!isFormValid()}
            >
              {loading ? 'Loading...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClubRegistrationForm;
