import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaEdit } from "react-icons/fa"; // Import edit icon

const Proposal = () => {
    const { state } = useLocation();
    const { eventDetails } = state || {};

    return (
        <div className="p-10">
            <h2 className="text-2xl font-bold mb-4">Event Proposal</h2>
            <form className="space-y-4">
                <div className="flex items-center">
                    <label className="w-32 font-medium text-white">Event Name:</label>
                    <input
                        type="text"
                        value={eventDetails?.name || ''}
                        className="bg-neutral-900 text-white border rounded p-2 w-full"
                        readOnly
                    />
                    <FaEdit className="ml-2 cursor-pointer text-white" />
                </div>
                <div className="flex items-center">
                    <label className="w-32 font-medium text-white">Event Date:</label>
                    <input
                        type="text"
                        value={eventDetails?.date || ''}
                        className="bg-neutral-900 text-white border rounded p-2 w-full"
                        readOnly
                    />
                    <FaEdit className="ml-2 cursor-pointer text-white" />
                </div>
                <div className="flex items-center">
                    <label className="w-32 font-medium text-white">Club Name:</label>
                    <input
                        type="text"
                        value={eventDetails?.clubName || ''}
                        className="bg-neutral-900 text-white border rounded p-2 w-full"
                        readOnly
                    />
                    <FaEdit className="ml-2 cursor-pointer text-white" />
                </div>
                <div className="flex items-center">
                    <label className="w-32 font-medium text-white">Venue:</label>
                    <input
                        type="text"
                        value="S1O4 hall" // Placeholder for venue
                        className="bg-neutral-900 text-white border rounded p-2 w-full"
                        readOnly
                    />
                    <FaEdit className="ml-2 cursor-pointer text-white" />
                </div>
                <div className="flex items-center">
                    <label className="w-32 font-medium text-white">Club Image URL:</label>
                    <input
                        type="text"
                        value={eventDetails?.clubImage || ''}
                        className="bg-neutral-900 text-white border rounded p-2 w-full"
                        readOnly
                    />
                    <FaEdit className="ml-2 cursor-pointer text-white" />
                </div>
                <div className="flex items-center">
                    <label className="w-32 font-medium text-white">Event Image URL:</label>
                    <input
                        type="text"
                        value={eventDetails?.image || ''}
                        className="bg-neutral-900 text-white border rounded p-2 w-full"
                        readOnly
                    />
                    <FaEdit className="ml-2 cursor-pointer text-white" />
                </div>
                {/* Additional Input Areas */}
                <div className="flex items-center">
                    <label className="w-32 font-medium text-white">Budget:</label>
                    <input
                        type="text"
                        placeholder="Enter budget"
                        className="bg-neutral-900 text-white border rounded p-2 w-full"
                    />
                </div>
                <div className="flex items-center">
                    <label className="w-32 font-medium text-white">Purpose:</label>
                    <input
                        type="text"
                        placeholder="Enter purpose"
                        className="bg-neutral-900 text-white border rounded p-2 w-full"
                    />
                </div>
                <div className="flex items-center">
                    <label className="w-32 font-medium text-white">Benefits to UCSC:</label>
                    <input
                        type="text"
                        placeholder="Enter benefits"
                        className="bg-neutral-900 text-white border rounded p-2 w-full"
                    />
                </div>
                <div className="flex justify-center items-center mt-4">
                    <button
                        type="button"
                        className="bg-[#AEC90A] text-white px-4 py-2 rounded-lg"
                        onClick={() => alert('Request sent for approval')}
                    >
                        Send Request for Approval
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Proposal;
