import React, { useState } from 'react';

const AnnouncementFormModal = ({ showModal, closeModal, saveAnnouncement ,unionClubId}) => {
  const [announcement, setAnnouncement] = useState({
    announcement_id: '',
    content: '',
    date_posted: '',
    title: '',
    type: 'PUBLIC', // default value for type
    club_id: 'unionClubId',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement({ ...announcement, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveAnnouncement(announcement); // Pass the data to the parent or API
  };

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">Add Announcement</h2>
          <form onSubmit={handleSubmit}>
            {/* Announcement Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={announcement.title}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Announcement Content */}
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                id="content"
                name="content"
                value={announcement.content}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Announcement Date Posted */}
            <div className="mb-4">
              <label htmlFor="date_posted" className="block text-sm font-medium text-gray-700">Date Posted</label>
              <input
                type="datetime-local"
                id="date_posted"
                name="date_posted"
                value={announcement.date_posted}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Announcement Type */}
            <div className="mb-4">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
              <select
                id="type"
                name="type"
                value={announcement.type}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                required
              >
                <option value="ONLY_MEMBERS">Only Members</option>
                <option value="PUBLIC">Public</option>
              </select>
            </div>

            {/* Club ID */}
            <div className="mb-4">
              <label htmlFor="club_id" className="block text-sm font-medium text-gray-700">Club ID</label>
              <input
                type="number"
                id="club_id"
                name="club_id"
                value={announcement.club_id}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-2 px-4 py-2 bg-gray-300 text-black rounded-md"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save Announcement
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AnnouncementFormModal;
