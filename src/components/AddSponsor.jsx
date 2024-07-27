import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import Sidebar from './Sidebar';  // Ensure you import Sidebar
import Navbar from './Navbar';    // Ensure you import Navbar
import SponsorsService from '../service/SponsorsService';

const AddSponsor = () => {
  const navigate = useNavigate();

  const [sponsorName, setSponsorName] = useState('');
  const [sponsorDescription, setSponsorDescription] = useState('');
  const [sponsorType, setSponsorType] = useState('');
  const [amount, setAmount] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [proofFile, setProofFile] = useState(null);
  const [errors, setErrors] = useState('');

  const handleFileChange = (e) => {
    setProofFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); 
    const formData = new FormData();

    formData.append('data', new Blob([JSON.stringify({
      sponsorName,
      sponsorDescription,
      sponsorType,
      amount,
      contactPerson,
      contactEmail
    })], { type: 'application/json' }));

    if (proofFile) {
      formData.append('file', proofFile);
    }


    try {
      const response = await SponsorsService.addSponsor(
        sponsorName,
        sponsorDescription,
        sponsorType,
        amount,
        contactPerson,
        contactEmail,
        proofFile,
        token
      );

     
      alert('Sponsor added successfully');
      console.log('Sponsor added:', response);
      navigate('/');

    } catch(error) {
      console.error("Error Adding Sponsor:", error);
      
      const errorMessages = error.response ? error.response.data.errors : { global: error.message };
      setErrors(errorMessages);
      setTimeout(() => setErrors({}), 5000);
    }
    
   
  };

  return (
    <div className="fixed inset-0 flex">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1 bg-neutral-900 text-white">
        <Navbar className="sticky top-0 z-10 p-4" />
        <div className="flex-1 overflow-y-auto p-10 ml-10 mr-20">
          <h2 className="text-2xl font-bold mb-4">Add New Sponsor</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="sponsorName" className="text-lg font-semibold">Sponsor Name</label>
              <input
                type="text"
                id="sponsorName"
                value={sponsorName}
                onChange={(e) => setSponsorName(e.target.value)}
                className="p-2 bg-black text-white rounded"
                placeholder="Enter sponsor name"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="proofFile" className="text-lg font-semibold">Company Logo</label>
              <input
                type="file"
                id="proofFile"
                accept="image/*" // Accept only image files
                onChange={handleFileChange}
                className="p-2 bg-black text-white rounded"
                required
            />
            {proofFile && (
                <div className="mt-2">
                    <p className="text-white">Selected file: {proofFile.name}</p>
                    <img 
                        src={URL.createObjectURL(proofFile)} 
                        alt="Preview" 
                        className="mt-2 w-32 h-32 object-cover rounded" 
                    />
                </div>
            )}
            </div>
            
            <div className="flex flex-col space-y-2">
              <label htmlFor="sponsorDescription" className="text-lg font-semibold">Sponsor Description</label>
              <textarea
                id="sponsorDescription"
                value={sponsorDescription}
                onChange={(e) => setSponsorDescription(e.target.value)}
                className="p-2 bg-black text-white rounded"
                placeholder="Enter a description of the sponsor"
                rows="4"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="sponsorType" className="text-lg font-semibold">Sponsor Type</label>
              <select
                id="sponsorType"
                value={sponsorType}
                onChange={(e) => setSponsorType(e.target.value)}
                className="p-2 bg-black text-white rounded"
                required
              >
                <option value="">Select sponsor type</option>
                <option value="PLATINUM">Platinum</option>
                <option value="GOLD">Gold</option>
                <option value="SILVER">Silver</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="amount" className="text-lg font-semibold">Amount</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-2 bg-black text-white rounded"
                placeholder="Enter amount"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="contactPerson" className="text-lg font-semibold">Contact Person</label>
              <input
                type="text"
                id="contactPerson"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="p-2 bg-black text-white rounded"
                placeholder="Enter contact person's name"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="contactEmail" className="text-lg font-semibold">Contact Email</label>
              <input
                type="email"
                id="contactEmail"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="p-2 bg-black text-white rounded"
                placeholder="Enter contact email"
                required
              />
            </div>

            

            <div className="flex justify-center items-center space-x-5">
             
              <Link to="/sponsors" className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-[#AEC90A] text-white p-2 rounded hover:bg-gray-600"              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSponsor;
