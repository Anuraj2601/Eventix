import React, { useState } from 'react';
import ieeePast2 from '../assets/events/reid2.jpg'; // Example image

const feedbackItems = [
  { 
    id: 2, 
    name: "IEEE Day", 
    image: ieeePast2, 
    details: "Your voice matters! Share your experience with our event IEEE Day which was held on 04.06.2024 by IEEE Club.", 
    likes: Math.floor(Math.random() * 100) 
  },
];

const Feedback = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [emojiRatings, setEmojiRatings] = useState({
    2: { '😊': 12, '😡': 5, '👍': 22 } // Initial emoji counts
  });

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    alert('Feedback submitted!');
    setFeedback(""); // Clear feedback
    setIsFormVisible(false); // Hide form after submission
  };

  const handleEmojiClick = (itemId, emoji) => {
    setEmojiRatings(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [emoji]: (prev[itemId][emoji] || 0) + 1
      }
    }));
  };

  return (
    <div className="relative h-[380px] overflow-hidden">
      <h2 className="text-white text-sm font-bold -mt-1 ml-0 z-1">Feedback</h2>
      <div className="flex flex-wrap h-full p-2">
        {feedbackItems.map(item => (
          <div
            key={item.id}
            className="w-full flex items-start mb-4 p-1"
            onClick={() => setSelectedFeedback(item)}
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-40 h-40 object-cover rounded-lg"
              style={{ 
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
              }}
            />
            <div className="w-full px-2 ml-0 h-40 flex flex-col justify-between rounded-2xl bg-neutral-800 shadow-lg">
              {isFormVisible ? (
                <div className="feedback-form bg-neutral-800 p-2 rounded-lg">
                  <p className="text-white text-lg font-bold mb-2">We welcome your feedback!</p>
                  <textarea
                    value={feedback}
                    onChange={handleFeedbackChange}
                    className="w-full bg-neutral-900 h-10 text-white rounded-md mb-4"
                    placeholder="Share your thoughts..."
                    rows="3"
                  />
                  <button
                    onClick={handleSubmit}
                    className="w-auto p-2 bg-[#AEC90A] text-black rounded-lg"
                  >
                    Submit Feedback
                  </button>
                </div>
              ) : (
                <div className="flex flex-col h-full ml-2">
                  <div>
                    <h3 className="text-white text-xl font-bold mb-2 py-2">{item.name} &nbsp; &nbsp; &nbsp; &nbsp;
                      <span className="text-yellow-400 cursor-pointer mr-4" onClick={() => handleEmojiClick(item.id, '😊')}>😊 {emojiRatings[item.id]?.['😊'] || 0}</span>
                      <span className="text-red-400 cursor-pointer mr-4" onClick={() => handleEmojiClick(item.id, '😡')}>😡 {emojiRatings[item.id]?.['😡'] || 0}</span>
                      <span className="text-green-400 cursor-pointer mr-4" onClick={() => handleEmojiClick(item.id, '👍')}>👍 {emojiRatings[item.id]?.['👍'] || 0}</span>
                    </h3>
                    <p className="text-gray-400 mb-2">{item.details}
                      <button
                        onClick={() => setIsFormVisible(true)}
                        className="ml-4 mt-2 py-1 px-3 bg-[#AEC90A] text-black rounded-lg"
                      >
                        Give Feedback
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
