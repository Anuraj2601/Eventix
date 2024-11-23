import React from 'react';
import kokul from '../assets/kokul.png';

const Board = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full mt-6 overflow-auto bg-[#1E1E1E] p-5 rounded-xl"> {/* Adjusted mt-12 for top margin */}
      <div className="text-white text-3xl  mb-15 ">Board of term 23/24</div>
      <div className="flex justify-center gap-20 p-20">
        <div className="flex flex-col items-center text-center">
        <img
          className="h-64 w-64 md:h-48 md:w-48 rounded-lg object-cover object-center"
          src={kokul}
          alt="nature image"
        />


          <div className="mt-2">
            <div className="text-lg font-medium text-[#AEC90A]">President</div>
            <div className='text-white'>Kokul</div>
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
        <img
          className="h-64 w-64 md:h-48 md:w-48 rounded-lg object-cover object-center"
          src={kokul}
          alt="nature image"
        />

          <div className="mt-2">
            <div className="text-lg font-medium text-[#AEC90A]">Secretary</div>
            <div className='text-white'>Lori</div>
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
        <img
          className="h-64 w-64 md:h-48 md:w-48 rounded-lg object-cover object-center"
          src={kokul}
          alt="nature image"
        />

          <div className="mt-2">
            <div className="text-lg font-medium text-[#AEC90A]">Treasurer</div>
            <div className='text-white'>Kletzer</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
