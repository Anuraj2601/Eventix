import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ onClose, children }) => {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-white text-black bg-opacity-70">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full relative  text-black">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
