import React from 'react';

const Board = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full mt-6 overflow-auto bg-black p-5 rounded-lg">
      <div className="text-white text-3xl ">Board of Term 23/24</div>
      <div className="flex justify-center gap-20 p-10">
        {/* President */}
        <div className="flex flex-col items-center text-center">
          <img
            className="h-64 w-64 md:h-48 md:w-48 rounded-full object-cover object-center"
            src="https://randomuser.me/api/portraits/men/78.jpg"
            alt="President"
          />
          <div className="mt-2">
            <div className="text-lg font-medium text-[#AEC90A]">President</div>
            <div className="text-white">Kokul</div>
            <p className="text-gray-300 mt-2">
              "Leading our club has been an incredible journey. I am grateful for the opportunity to contribute and work with such a dedicated team. My goal is to inspire and drive positive change within our community."
            </p>
          </div>
        </div>
        {/* Secretary */}
        <div className="flex flex-col items-center text-center">
          <img
            className="h-64 w-64 md:h-48 md:w-48 rounded-full object-cover object-center"
            src="https://randomuser.me/api/portraits/men/89.jpg"
            alt="Secretary"
          />
          <div className="mt-2">
            <div className="text-lg font-medium text-[#AEC90A]">Secretary</div>
            <div className="text-white">Lori</div>
            <p className="text-gray-300 mt-2">
              "Being the Secretary has allowed me to utilize my organizational skills to ensure everything runs smoothly. I’m excited about the year ahead and look forward to supporting our members and events."
            </p>
          </div>
        </div>
        {/* Treasurer */}
        <div className="flex flex-col items-center text-center">
          <img
            className="h-64 w-64 md:h-48 md:w-48 rounded-full object-cover object-center"
            src="https://randomuser.me/api/portraits/men/30.jpg"
            alt="Treasurer"
          />
          <div className="mt-2">
            <div className="text-lg font-medium text-[#AEC90A]">Treasurer</div>
            <div className="text-white">Kletzer</div>
            <p className="text-gray-300 mt-2">
              "Managing the finances of our club is both a challenge and a privilege. I am committed to maintaining transparency and ensuring that our funds are used effectively to support our initiatives."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
