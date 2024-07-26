import React from 'react';

const SelectRemove = ({ onEdit, onDelete }) => {
  return (
    <div className="flex space-x-4">
    <button
      onClick={onEdit}
      className="flex items-center p-2 text-[#AEC90A] border-2 border-[#AEC90A] text-lg rounded-full border border-[#AEC90A] hover:text-white hover:border-white custom-card"
    >
      Select
    </button>
    <button
      onClick={onDelete}
      className="flex items-center  p-2 text-white text-lg rounded-full border-white border-2 hover:text-white hover:bg-red-700 custom-card"
    >
      Reject
    </button>
  </div>
  
  );
};

export default SelectRemove;
