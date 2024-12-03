import React from "react";

const DialogBox = ({ isOpen, title, message, onClose, onConfirm }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded shadow-md w-96">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <p>{message}</p>
          <div className="mt-4 flex justify-end space-x-2">
           
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
export default DialogBox;
