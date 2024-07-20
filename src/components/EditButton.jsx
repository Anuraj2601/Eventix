// EditDeleteButton.jsx
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EditButton = ({ onEdit }) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={onEdit}
        className="flex items-center px-6 py-3 text-[#AEC90A] text-lg rounded hover:text-white"
      >
        <FaEdit className="mr-2 text-xl" />
        Edit
      </button>
     
    </div>
  );
};

export default EditButton;
