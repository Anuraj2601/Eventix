import React from "react";

const DialogBox = ({ isOpen, onClose, title, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="bg-black p-6 rounded-md shadow-md border-2 border-opacity-40 border-[#AEC90A] w-[400px]">
        <h3 className="text-white text-lg font-bold">{title}</h3>
        <p className="text-white mt-2">{message}</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-gray-500 rounded-md"
          >
            Close
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-white bg-[#AEC90A] rounded-md"
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
