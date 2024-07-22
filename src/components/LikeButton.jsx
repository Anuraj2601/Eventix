import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const LikeButton = ({ initialLikes = Math.floor(Math.random() * 100), className = '' }) => { // Generate random initial likes
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
  };

  return (
    <div className={`flex items-center ${className}`}>
      {isLiked ? (
        <FaHeart
          onClick={handleLike}
          style={{
            cursor: 'pointer',
            color: 'red',
            fontSize: '24px', // Adjust size as needed
            transition: 'color 0.3s ease',
          }}
        />
      ) : (
        <FaRegHeart
          onClick={handleLike}
          style={{
            cursor: 'pointer',
            color: 'gray',
            fontSize: '24px', // Adjust size as needed
            transition: 'color 0.3s ease',
          }}
        />
      )}
      <div className="ml-2 flex items-center">
        <span className="text-white">{likes}</span> {/* Display number of likes */}
        <span className="ml-2 text-white">Likes</span> {/* Label text */}
      </div>
    </div>
  );
};

export default LikeButton;
