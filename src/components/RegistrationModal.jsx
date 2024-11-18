import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // Import the white cross icon

const RegistrationModal = ({ event, isOpen, onClose }) => {
  const [mobile, setMobile] = useState('');
  const [reason, setReason] = useState('');
  const [isMobileValid, setIsMobileValid] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    if (!/^(07\d{8})$/.test(mobile)) {
      setIsMobileValid(false);
      return;
    }
    setIsMobileValid(true);
    onClose();
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);
    setIsMobileValid(/^(07\d{8})$/.test(value));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div className="bg-black p-6 rounded-md shadow-md border-[#AEC90A] w-96">
      <div className="relative w-full h-full">
  <button
    type="button"
    className="absolute top-0 right-2 px-4 py-2 text-white  rounded-md"
    onClick={onClose}
  >
    <FaTimes size={20} />
  </button>
</div>
<h2 className="text-xl font-bold mb-4">
    {event.name ? `Register for ${event.name}` : 'Register Now!'}
</h2>
        <form onSubmit={handleSubmit}>
       

          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              value="John Doe" // Replace with the actual user name
              className="w-full px-3 py-2 border-[#AEC90A] rounded-md bg-black text-white"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Student Email
            </label>
            <input
              type="email"
              value="2021is013@stu.ucsc.cmb.ac.lk" // Replace with the actual user email
              className="w-full px-3 py-2 border-[#AEC90A] rounded-md bg-black text-white"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Mobile No
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={handleMobileChange}
              className="w-full px-3 py-2 border-[#AEC90A] rounded-md  bg-black"
              required
            />
            {!isMobileValid && (
              <p className="text-red-500 text-sm mt-1">Invalid mobile number format. It should start with 07 and have 10 digits.</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Reason to Join
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-32 px-3 py-2 border-[#AEC90A] rounded-md bg-black"
              required
            />
          </div>
          <div className="flex justify-end">
            
            <button
              type="submit"
              className="px-4 py-2    bg-[#AEC90A] text-black rounded-md"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
