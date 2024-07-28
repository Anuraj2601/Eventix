import React, { useState } from 'react';
import { FaCheck, FaTimes } from "react-icons/fa"; // Import icons for tick and wrong mark
import { IoMdClose } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import LikeButton from './LikeButton';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import vesakImage from "../assets/vesak.jpg";
import eidImage from "../assets/eid.jpg";
import farewellImage from "../assets/farewell.jpg";
import esalaImage from "../assets/esala.jpg";
import posonImage from "../assets/poson.jpg";
import { useNavigate } from 'react-router-dom';

const Posts = ({ post }) => {
    const location = useLocation(); // Get the current path
    const isPresidentPage = location.pathname.startsWith('/president'); // Check if the path starts with /president
    const isSecretaryPage = location.pathname.startsWith('/secretary'); // Check if the path starts with /secretary

    const showButtons = (isPresidentPage || isSecretaryPage) && post.category === 'pending';

    return (
        <div className="bg-[#0b0b0b] p-10 rounded-2xl mb-4 custom-3d-shadow " style={{ 
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
          }}>
            <div className="flex flex-row items-center justify-between mb-6">
                <div className="flex items-center gap-2 custom-card">
                    <img src={post.userImage} alt="" className='w-11 h-11 rounded-full border-2 border-[#AEC90A]' />
                    <div className="flex flex-col">
                        <p>{post.userName}</p>
                        <p className="text-[#AEC90A]">{post.position}</p>
                    </div>
                </div>
                {showButtons && (
                    <div className="flex items-center gap-4">
                        <FaCheck className='text-[#AEC90A] custom-card' size={30} />
                        <FaTimes className='text-red-500 custom-card' size={30} />
                    </div>
                )}
            </div>
            <div className="flex flex-col w-full mb-4">
                <p>
                    {post.caption}
                    {post.link && <a href={post.link} className='text-[#AEC90A] underline' target="_blank" rel="noopener noreferrer">{post.link}</a>}
                </p>
                {post.image && <img src={post.image} alt="" className='w-auto h-100 object-cover mt-3 ' />}
                <LikeButton initialLikes={320} className="absolute bottom-4 right-4 custom-card" />
            </div>
        </div>
    );
};

const NewsFeed = ({ posts }) => {
    const location = useLocation(); // Get the current path
    const isMemberPage = location.pathname.startsWith('/member'); // Check if the path starts with /member
    const isPresidentPage = location.pathname.startsWith('/president'); // Check if the path starts with /president
    const isSecretaryPage = location.pathname.startsWith('/secretary'); // Check if the path starts with /secretary

    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();
    
    const events = [
        {
            joinLink: "/club/new-post",
        }
    ];

    const navigateToForm = (link) => {
        navigate(link);
    };

    const categorizePosts = (posts, category) => {
        return posts.filter(post => post.category === category);
    };

    const renderPosts = (filteredPosts) => {
        return filteredPosts.map((post, index) => (
            <Posts key={index} post={post} />
        ));
    };

    return (
        <div className="bg-neutral-900 text-white min-h-screen relative">
            <div className='relative'>
                {(isMemberPage || isPresidentPage || isSecretaryPage) && (
                    <div className='flex justify-end mb-2'>
                        {events.map((event, index) => (
                            <div key={index} className="w-full rounded-full p-2 flex flex-col mb-4 -mt-8" style={{ backgroundColor: '#171717' }}>
                                <button
                                    onClick={() => navigateToForm(event.joinLink)}
                                    className="bg-[#AEC90A] text-black flex items-center justify-center rounded-full hover:bg-[#AEC90A] hover:text-black p-2 absolute top-4 right-2 z-10"
                                >
                                    <MdAdd size={24} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {isPresidentPage || isSecretaryPage ? (
                    <div>
                        <h2 className="text-2xl mb-4">Pending</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                            {renderPosts(categorizePosts(posts, 'pending'))}
                        </div>
                        <h2 className="text-2xl mb-4">Approved</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                            {renderPosts(categorizePosts(posts, 'approved'))}
                        </div>
                        <h2 className="text-2xl mb-4">Rejected</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                            {renderPosts(categorizePosts(posts, 'rejected'))}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                        {posts.map((post, index) => (
                            <Posts key={index} post={post} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const App = () => {
    const samplePosts = [
        {
            position: 'Secretary',
            userName: 'Jane Smith',
            userImage: "https://randomuser.me/api/portraits/men/9.jpg",
            caption: 'Embracing the light of wisdom and compassion on this Vesak Full Moon Poya Day. May peace and enlightenment shine upon us all. Happy Vesak!',
            image: vesakImage,
            category: 'pending'
        },
        {
            position: 'President',
            userName: 'Veron',
            userImage: "https://randomuser.me/api/portraits/men/2.jpg",
            caption: 'On this blessed day of Eid-al-Adha, may our hearts be filled with peace, harmony, and contentment. Wishing you and your loved ones a joyous Eid filled with cherished moments and memories. Eid Mubarak!',
            image: eidImage,
            category: 'approved'
        }, 
        {
            position: 'President',
            userName: 'Veron',
            userImage: "https://randomuser.me/api/portraits/men/2.jpg",
            caption: '🌟 A big thank you to our amazing outgoing leaders for your dedication and hard work! You’ve set the bar high and inspired us all. 🎉 Welcome to our new Executive Committee! We’re excited to innovate, collaborate, and achieve new milestones together. Here’s to a year full of success and endless possibilities! 🚀✨',
            image: farewellImage,
            category: 'rejected'
        },
        {
            position: 'Secretary',
            userName: 'Jane Smith',
            userImage: "https://randomuser.me/api/portraits/men/9.jpg",
            caption: 'The Esala Full Moon Poya Day signifies the commemoration of the First Sermon by the Buddha and celebrates the arrival of the Tooth Relic in Sri Lanka. May the blessings of this years Esala Poya bring peace and prosperity to our motherland. Wishing You a Blessed & Peaceful Esala Poya Day!',
            image: esalaImage,
            category: 'approved'
        },
        {
            position: 'Secretary',
            userName: 'Jane Smith',
            userImage: "https://randomuser.me/api/portraits/men/9.jpg",
            caption: 'On this sacred Poson Full Moon Poya Day, we pay homage to the significant moment when Arahat Maha Mahinda Thera brought the teachings of Buddhism to our beloved Sri Lanka. May the blessings of this auspicious day guide us towards greater wisdom, unity, and peace. Wishing you a blissful Poson Poya Day, filled with peace, harmony, and spiritual growth!',
            image: posonImage,
            category: 'rejected'
        },
        // Add more posts here
    ];

    return (
        <NewsFeed posts={samplePosts} />
    );
};

export default App;
