import React from 'react';

const SelectRemove = ({ onEdit, onDelete }) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={onEdit}
        className="flex items-center px-6 py-3 text-[#AEC90A] text-lg rounded hover:text-white"
      >
        Select
      </button>
      <button
        onClick={onDelete}
        className="flex items-center px-6 py-3 text-white text-lg rounded hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
};

export default SelectRemove;
