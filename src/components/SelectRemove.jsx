import React from 'react';

const SelectRemove = ({ onEdit, onDelete }) => {
  return (
    <div className="flex space-x-4">
    <button
      onClick={onEdit}
      className="flex items-center px-6 py-3 text-[#AEC90A] text-lg rounded border border-[#AEC90A] hover:text-white hover:border-white"
    >
      Select
    </button>
    <button
      onClick={onDelete}
      className="flex items-center px-6 py-3 text-white text-lg rounded border border-white hover:text-red-700 hover:border-red-700"
    >
      Remove
    </button>
  </div>
  
  );
};

export default SelectRemove;
