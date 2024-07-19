import React from 'react';

const SelectRemove = ({ onEdit, onDelete }) => {
  return (
    <div className="flex space-x-4">
    <button
      onClick={onEdit}
      className="flex items-center p-2 text-black  bg-[#AEC90A] text-lg rounded-lg border border-[#AEC90A] hover:text-white hover:border-white"
    >
      Select
    </button>
    <button
      onClick={onDelete}
      className="flex items-center  p-2 text-black text-lg rounded-lg bg-white hover:text-white hover:bg-red-700"
    >
      Reject
    </button>
  </div>
  
  );
};

export default SelectRemove;
