import React, { useState } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { Button } from "@material-tailwind/react";
import { MdAdd } from "react-icons/md"; // Import a different plus icon
import EditButton from "./EditButton"; // Import your EditDeleteButton component
import { useLocation } from 'react-router-dom'; // Import useLocation
import LikeButton from './LikeButton';


// Import images
import launchImage from '../assets/launch.jpg'; // Adjust path if needed
import reid3Image from '../assets/reid3.jpg';   // Adjust path if needed
import speakerImage from '../assets/speaker.jpg'; // Adjust path if needed

const Posts = ({ post }) => {
    const location = useLocation();
    const isStudentPage = location.pathname.startsWith('/student'); // Check if path starts with /student

    return (
        <div className="flex items-center justify-center mb-4">
            <div className='bg-[#0b0b0b] p-5 w-full rounded-md'>
                <div className="flex flex-row items-center justify-between mb-4">
                    <div className="flex items-center gap-2  custom-card">
                        <img src={post.userImage} alt="" className='w-11 h-11 rounded-full border-2 border-[#AEC90A]' />
                        <div className="flex flex-col">
                            <p>{post.userName}</p>
                            <p className="text-[#AEC90A]">{post.position}</p>
                        </div>
                    </div>
                    {!isStudentPage && (
                        <div className="flex items-center gap-4">
                            <HiOutlineDotsVertical className='text-[#AEC90A]  custom-card' size={30} />
                            <IoMdClose className='text-[#AEC90A]  custom-card' size={30} />
                        </div>
                    )}
                </div>
                <div className="flex flex-col w-full mb-4">
                    <p>
                        {post.caption}
                        {post.link && <a href={post.link} className='text-[#AEC90A] underline  custom-card' target="_blank" rel="noopener noreferrer">{post.link}</a>}
                    </p>                  

                    {post.image && <img src={post.image} alt="" className='border-1 border-[#AEC90A] w-full h-88 object-cover mt-3' />}
                    <LikeButton initialLikes={320} className=" absolute bottom-4 right-4  custom-card" />
                </div>
            </div>
        </div>
    );
};

const NewsFeed = ({ posts }) => {

    

    return (
        <div className="bg-neutral-900 text-white min-h-screen relative">
            <div className='relative'>
                {!window.location.pathname.startsWith('/student') && (
                    <div className='flex justify-end mb-2'>
                        <button
                           
                            className="bg-[#AEC90A] text-black flex items-center justify-center rounded-full hover:bg-[#AEC90A] hover:text-black p-2 absolute -top-3 right-8 z-10  custom-card"
                        >
                            <MdAdd size={24} />
                        </button>
                    </div>
                )}
                {posts.map((post, index) => (
                    <Posts key={index} post={post} />
                ))}
            </div>
        </div>
    );
};

const App = () => {
    // Use imported image variables in your posts
    const samplePosts = [
        {
            position: 'Secretary',
            userName: 'John Doe',
            userImage: "https://randomuser.me/api/portraits/men/3.jpg",
            caption: 'Are you ready to take the next step in your reidExtreme 3.0 journey? The reidExtreme 3.0 is the perfect opportunity for students to explore potential career paths, network with industry professionals, and discover exciting job and internship opportunities',
            image: launchImage,
            link: 'Register now',
        },
        {
            position: 'President',
            userName: 'Veron',
            userImage: "https://randomuser.me/api/portraits/men/2.jpg",
            caption: 'While possessing knowledge is all well and good, if you have not the wisdom to wield it to your advantage, it becomes about as useful as soot. All but removing probability, one should not only be able to calculate every way forward, but should also be well-versed enough to choose the best path.Piqued your interest? Read further here - https://www.britannica.com/science/game-theory Register your team for ReidXtreme by visiting ',
            image: reid3Image,
            link: 'http://reidxtreme.ucscieee.com/',
        }, 
        {
            position: 'OC',
            userName: 'Sarah',
            userImage: "https://randomuser.me/api/portraits/women/7.jpg",
            caption: 'Are you ready to take the next step in your reidExtreme 3.0 journey? The reidExtreme 3.0 is the perfect opportunity for students to explore potential career paths, network with industry professionals, and discover exciting job and internship opportunities',
            image: speakerImage,
            link: 'Register now',
        },
        {
            userName: 'Jane Smith',
            userImage: "https://randomuser.me/api/portraits/men/9.jpg",
            caption: 'Had a great time at the conference today!',
            image: null,
            link: null,
        },
        // Add more posts here
    ];

    return (
        <NewsFeed posts={samplePosts} />
    );
};

export default App;
