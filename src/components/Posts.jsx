import React from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { Button } from "@material-tailwind/react";
import EditDeleteButton from './EditDeleteButton';


const Posts = ({ post }) => {
    return (
        <div className="flex items-center justify-center  mb-4">
            <div className='bg-[#0b0b0b] p-5 w-full rounded-md'>
                <div className="flex flex-row items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <img src={post.userImage} alt="" className='w-11 h-11 rounded-full border-2 border-[#AEC90A]' />
                        <div className="flex flex-col">
        <p>{post.userName}</p>
        
        <p className="text-[#AEC90A]">{post.position}</p>
    </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <HiOutlineDotsVertical className='text-[#AEC90A]' size={30}/>
                        <IoMdClose className='text-[#AEC90A]' size={30}/>
                    </div>
                </div>
                <div className="flex flex-col w-full mb-4">
                    <p>{post.caption}                     {post.link && <a href={post.link} className='text-[#AEC90A] underline' target="_blank" rel="noopener noreferrer">{post.link}</a>}

                    </p>

                    {post.image && <img src={post.image} alt="" className='border-1 border-[#AEC90A] w-full h-80 object-cover mt-3' />}
                </div>
            </div>
        </div>
    );
};

const NewsFeed = ({ posts }) => {
    return (
        <div className="bg-neutral-900 text-white p-2 min-h-screen">
            {posts.map((post, index) => (
                <Posts key={index} post={post} />
            ))}
        </div>
    );
};

const App = () => {
    const samplePosts = [
        {
            position: 'Secretary',
            userName: 'John Doe',
            userImage: "https://randomuser.me/api/portraits/men/3.jpg",
            caption: 'Are you ready to take the next step in your reidExtreme 3.0 journey? The reidExtreme 3.0  is the perfect  opportunity for students to explore potential career paths, network with industry professionals, and discover exciting job and internship opportunities',
            image: "src/assets//launch.jpg",
            link: 'Register now',
        },
        {
            position: 'President',
            userName: 'Veron',
            userImage: "https://randomuser.me/api/portraits/men/2.jpg",
            caption: 'Are you ready to take the next step in your reidExtreme 3.0 journey? The reidExtreme 3.0  is the perfect  opportunity for students to explore potential career paths, network with industry professionals, and discover exciting job and internship opportunities',
            image: "src/assets/speaker.jpg",
            link: 'Join the OC',
        }, {
            position: 'OC',
            userName: 'Sarah',
            userImage: "https://randomuser.me/api/portraits/women/7.jpg",
            caption: 'Are you ready to take the next step in your reidExtreme 3.0 journey? The reidExtreme 3.0  is the perfect  opportunity for students to explore potential career paths, network with industry professionals, and discover exciting job and internship opportunities',
            image: "src/assets/speaker.jpg",
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
