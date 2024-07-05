import React from 'react';
import kokul from '../assets/kokul.png';

const Board = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full mt-6 overflow-auto"> {/* Adjusted mt-12 for top margin */}
      <div className="text-white text-3xl font-bold mb-10">Board of term 23/24</div>
      <div className="flex justify-center gap-10">
        <div className="flex flex-col items-center text-center">
          <img
            className="h-96 w-96 md:h-72 md:w-72 rounded-full object-cover object-center"
            src={kokul}
            alt="nature image"
          />
          <div className="mt-2">
            <div className="text-lg font-bold text-[#AEC90A]">President</div>
            <div>Kokul</div>
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <img
            className="h-96 w-96 md:h-72 md:w-72 rounded-full object-cover object-center"
            src={kokul}
            alt="nature image"
          />
          <div className="mt-2">
            <div className="text-lg font-bold text-[#AEC90A]">Secretary</div>
            <div>Lori</div>
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <img
            className="h-96 w-96 md:h-72 md:w-72 rounded-full object-cover object-center"
            src={kokul}
            alt="nature image"
          />
          <div className="mt-2">
            <div className="text-lg font-bold text-[#AEC90A]">Treasurer</div>
            <div>Kletzer</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
