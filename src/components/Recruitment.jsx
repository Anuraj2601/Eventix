import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

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

  // Update the current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Registered Students</h1>
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
              <p className="text-white"><strong></strong> {entry.year} Year</p>
            </div>
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
                  isInterviewSlotAvailable
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed font-bold'
                    : 'bg-gray-500 text-gray-300 cursor-not-allowed'
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
          </div>
        );
      })}
    </div>
  );
};

export default Recruitment;
