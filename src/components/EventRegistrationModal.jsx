import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";
import { HiChevronDown } from "react-icons/hi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { getUserEmailFromToken } from '../utils/utils'; // Ensure this function is correctly implemented
import RegistrationService from '../service/registrationService';
import { Typography } from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";  // Cross icon from react-icons
import EventRegistrationService from '../service/EventRegistrationService';

const menuItems = [
  { title: "Design Team" },
  { title: "Program Team" },
  { title: "Finance Team" },
  { title: "Marketing Team" },
];

const EventRegistrationModal = ({clubId, eventDetails, event, isOpen, onClose }) => {
  const { club_id } = useParams();
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    club_id: clubId || '',
    email: '',
    mobile: '',
    reason: '',
  
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 // console.log('club id in event reg', clubId);
 //console.log('event details in event reg', eventDetails);

  useEffect(() => {
    if (event && event.club_id) {
      setFormData((prevState) => ({
        ...prevState,
        club_id: event.club_id,  // Populate club_id with the event's club_id
      }));
    }
  }, [event]);

  
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const email = getUserEmailFromToken(); // Utility function to fetch user email from token
        setFormData(prevState => ({ ...prevState, email }));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserEmail();
  }, [club_id]);

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   setFormData(prevState => ({
  //     ...prevState,
  //     interviewSlot: date ? format(date, "yyyy-MM-dd'T'HH:mm:ss") : ''
  //   }));
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMenuItemClick = (title) => {
    setFormData(prevState => ({ ...prevState, team: title }));
    setOpenMenu(false);
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '') ;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const missingFields = [];

    // Check if each field is empty or not selected
    if (!formData.email || formData.email.trim() === '') {
        missingFields.push('Email');
    }

    if (!formData.mobile || formData.mobile.trim() === '') {
      missingFields.push('Mobile Number');
    }else if (!/^\d{10}$/.test(formData.mobile)) { // Validate mobile number has exactly 10 digits
      alert('Mobile number must be exactly 10 digits.');
      return;
    }


    if (!formData.reason || formData.reason.trim() === '') {
        missingFields.push('Reason');
    }

    // if (!selectedDate) {
    //     missingFields.push('Interview Slot');
    // }

    if (missingFields.length > 0) {
        alert(`Please fill in the following fields: ${missingFields.join(', ')}`);
        return;
    }

    const token = localStorage.getItem('token');
    const session_id = localStorage.getItem('session_id');
    //console.log("session id in event reg", session_id);

    if (!token) {
        alert('User not authenticated.');
        return;
    }

    try {
        setLoading(true);
        await EventRegistrationService.saveEventRegistration(
            formData.email,
            formData.mobile,
            formData.reason,
            false,
            formData.club_id,
            eventDetails.event_id,
            session_id,
            token
        );
        alert('Registration successful!');
        onClose(); // Close the modal after submission
    } catch (error) {
        const errorMessage = error.message || 'Failed to submit the form.';
        console.error(errorMessage);
        alert(errorMessage);
    } finally {
        setLoading(false);
    }
};


  if (!isOpen) return null; // If modal is not open, return nothing

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="bg-black p-6 rounded-md shadow-md  border-2 border-opacity-40 border-[#AEC90A] w-[600px] z-[99999] mt-10">
        <div className="relative w-full h-full text-white">
          <button
            type="button"
            className="absolute top-0 right-2 px-4 py-2 text-white rounded-md"
            onClick={onClose}
          >
             <AiOutlineClose />
          </button>
        </div>
        <h2 className="text-xl text-white font-bold mb-4 text-center">
          {eventDetails.name ? `Register for ${eventDetails.name}` : 'Register Now!'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-x-10 gap-y-6 mb-6 md:grid-cols-2 text-white">
            <input
              type="number"
              name="club_id"
              value={formData.club_id}
              className="w-full h-16 bg-black text-white p-2 rounded-2xl"
              style={{
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)',
                display: 'none',
              }}              placeholder={eventDetails.clubId}
              readOnly
            />

            {/* <div className="flex flex-col gap-3 w-full">
              <input
                type="email"
                name="email"
                value={formData.email}
                className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                style={{
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)',
                  display: 'none',
                }}                placeholder="Email"
                readOnly
              />
            </div> */}
          </div>

          <div className="grid gap-10 mb-6 md:grid-cols-2">
            {/* Team menu */}
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="block mb-2 text-[#AEC90A]">Email</label>
              {/* <Menu open={openMenu} handler={setOpenMenu} allowHover className='border-[#AEC90A] border-2'>
                <MenuHandler>
                  <Button
                    variant="text"
                    className="w-full h-16 bg-black text-white p-2 rounded-2xl  border-white"
                    style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
                  >
                    {formData.team || "Click here to Select a Team"}{" "}
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
              </Menu> */}
              <input
                type="email"
                name="email"
                value={formData.email}
                className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}               
                placeholder="Email"
                readOnly
              />
            </div>

            {/* Interview Slot */}
            <div className="flex flex-col gap-3">
              <label htmlFor="mobile" className="block mb-2 text-[#AEC90A]">Mobile Number</label>
              {/* <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
                placeholderText="Pick a date"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                withPortal
              /> */}
              <input
                type="number"
                id='mobile'
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
                              placeholder='0751671824'
                
                />

            </div>
          </div>

          {/* Reason field */}
          <div className="flex flex-col mb-6 gap-3">
            <label htmlFor="reason" className="block mb-2 text-[#AEC90A]">Reason for participate in the event</label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="4"
              className="w-full h-16 bg-black text-white p-2 rounded-2xl"
              style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
              placeholder="Enter the reason you want to join this event"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="text-white px-6 py-2 rounded-md text-xl font-medium"
              style={{
                backgroundColor: '#AEC90A',
                transition: 'all 0.3s ease-in-out',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)'
              }}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventRegistrationModal;
