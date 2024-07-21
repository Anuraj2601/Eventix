import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaEdit } from 'react-icons/fa';
import CustomSwitch from './Customswitch'; // Ensure you have this component or replace with your switch
import { useLocation } from 'react-router-dom'; // For detecting current path

// Sample data
const sampleData = [
  {
    id: 1,
    fullName: 'Kokulrajh Sivarasa',
    email: 'kokularajh32@gmail.com',
    registerNo: '2021cs100',
    indexNo: '21001006',
    team: 'Design Team',
    year: '3rd',
    reason: 'Passionate about design and creative problem-solving.',
    interviewSlot: new Date('2024-07-15T14:00:00'),
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    fullName: 'Jane Doe',
    email: 'janedoe@example.com',
    registerNo: '2022cs200',
    indexNo: '22002007',
    team: 'Marketing Team',
    year: '2nd',
    reason: 'Interested in marketing and team collaboration.',
    interviewSlot: new Date('2024-07-16T10:00:00'),
    image: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  // Add more sample entries as needed
];

const Recruitment = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date('2024-07-01'));
  const [endDate, setEndDate] = useState(new Date('2024-07-31'));
  const [editing, setEditing] = useState(false);
  
  const location = useLocation();
  const isStudentPage = location.pathname.startsWith('/student'); // Check if the path starts with /student

  // Update the current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSwitchChange = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handleDeleteRegistration = (id) => {
    // Add your delete logic here
    console.log(`Delete registration with ID: ${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      {isStudentPage ? (
        <>
          <div className="flex justify-end mb-4">
            <button className="bg-gray-500 text-gray-300 cursor-not-allowed px-4 py-2 rounded-full">Register Now</button>
          </div>
          <div className="bg-black p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <span className="text-white">Next Recruitment Open Duration</span>
            <div className="flex items-center space-x-4">
              <span>{`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center">
            <div className="bg-black p-4 rounded-lg shadow-lg flex items-center space-x-4">
              <span className="text-white">Open Club Recruitment</span>
              <CustomSwitch className="mr-3" isOn={isOpen} handleToggle={handleSwitchChange} />
              <span className="text-white">Scheduled Interview Duration</span>

              <div className="relative">
                {editing ? (
                  <div className="flex space-x-4">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => handleDateChange(date, endDate)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      className="p-2 border rounded-full text-white bg-black"
                    />
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => handleDateChange(startDate, date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      className="p-2 border rounded-full text-white bg-black"
                    />
                    <button onClick={() => setEditing(false)} className="px-4 py-2 bg-[#AEC90A] text-white rounded-full">
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <span>{`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}</span>
                    <button onClick={() => setEditing(true)} className="text-[#AEC90A]">
                      <FaEdit />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {sampleData.map((entry) => {
              const isInterviewSlotAvailable = currentTime >= entry.interviewSlot;
              return (
                <div key={entry.id} className="bg-black p-6 rounded-2xl shadow-lg flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={entry.image}
                      alt="Student"
                      className="w-24 h-24 rounded-full object-cover border-2 border-[#AEC90A]"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-[#AEC90A]">{entry.fullName}</p>
                    <p className="text-white"><strong>Email:</strong> {entry.email}</p>
                    <p className="text-white"><strong>Reg No:</strong> {entry.registerNo}</p>
                    <p className="text-white"><strong>Applying to:</strong> {entry.team}</p>
                    <p className="text-white"><strong>Year:</strong> {entry.year}</p>
                  </div>
                  {!isStudentPage && (
                    <>
                      <div className="w-1/4">
                        <p className="text-white"><strong>Reason:</strong></p>
                        <p className="text-gray-300">{entry.reason}</p>
                      </div>
                      <div className="w-1/4">
                        <p className="text-white"><strong>Interview Slot:</strong></p>
                        <p className="text-gray-300">{entry.interviewSlot ? format(entry.interviewSlot, "MMMM d, yyyy h:mm a") : 'Not Scheduled'}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          disabled={!isInterviewSlotAvailable}
                          className={`px-4 py-2 rounded-full shadow-lg ${
                            !isInterviewSlotAvailable
                              ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                              : 'bg-gray-500 text-black font-bold cursor-not-allowed'
                          }`}
                        >
                          Interview
                        </button>
                        <button
                          disabled={!isInterviewSlotAvailable}
                          className={`px-4 py-2 bg-gray-500 text-gray-300 cursor-not-allowed hover:bg-gray-700 rounded-full ${
                            !isInterviewSlotAvailable ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : ''
                          }`}
                        >
                          Select
                        </button>
                        <button
                          disabled={!isInterviewSlotAvailable}
                          className={`px-4 py-2 bg-gray-500 text-gray-300 cursor-not-allowed hover:bg-gray-700 rounded-full ${
                            !isInterviewSlotAvailable ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : ''
                          }`}
                        >
                          Reject
                        </button>
                      </div>
                    </>
                  )}
                  {isStudentPage && (
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => handleDeleteRegistration(entry.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-700"
                      >
                        Delete Registration
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Recruitment;
