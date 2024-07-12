// EditDeleteButton.jsx
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EditDeleteButton = ({ onEdit, onDelete }) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={onEdit}
        className="flex items-center px-6 py-3 text-[#AEC90A] text-lg rounded hover:text-white"
      >
        <FaEdit className="mr-2 text-xl" />
        Edit
      </button>
      <button
        onClick={onDelete}
        className="flex items-center px-6 py-3 text-[#dc2626] text-lg rounded hover:text-red-700"
      >
        <FaTrash className="mr-2 text-xl" />
        Delete
      </button>
    </div>
  );
};

export default EditDeleteButton;
