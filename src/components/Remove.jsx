import React from 'react';

const Remove = ({ onEdit, onDelete }) => {
  return (
    <div className="flex space-x-4">
      
      <button
        onClick={onDelete}
        className="flex items-center px-3 py-3 text-[#dc2626] text-lg rounded hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
};

export default Remove;
