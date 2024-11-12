import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Button, Typography } from "@material-tailwind/react";
import AnnouncementService from '../../service/AnnouncementService';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const AddNewAnnouncementForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [announcementType, setAnnouncementType] = useState('PUBLIC');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();
    const { club } = location.state || {};

    const handleRadioChange = (e) => {
        setAnnouncementType(e.target.value);
    };

    const validate = () => {
        const newErrors = {};
    
        if (!title) newErrors.title = "Title is required.";
        if (!content) newErrors.content = "Announcement content is required.";
        if (!announcementType) newErrors.announcementType = "Announcement type is required.";
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        const fetchAnnouncementDetails = async () => {
            if (id) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await AnnouncementService.getAnnouncementById(id, token);
                    const { content } = response;

                    if (content) {
                        setTitle(content.title || '');
                        setContent(content.content || '');
                        setAnnouncementType(content.type || '');
                    } else {
                        console.warn('Content is undefined or null');
                    }
                    setIsLoading(false);
                } catch (error) {
                    console.error("Error fetching announcement details:", error);
                    setErrors("Failed to fetch announcement details");
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        fetchAnnouncementDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        const token = localStorage.getItem('token');

        try {
            if (id) {
                const response = await AnnouncementService.updateAnnouncement(
                    id,
                    title,
                    content,
                    announcementType,
                    club.club_id,
                    token
                );
                alert('Announcement updated successfully');
                console.log('Announcement updated:', response);
                navigate(-1);
            } else {
                const response = await AnnouncementService.saveAnnouncement(
                    title,
                    content,
                    announcementType,
                    club.club_id,
                    token
                );
                alert('Announcement added successfully');
                console.log('Announcement added:', response);
                navigate(-1);
            }
        } catch (error) {
            console.error("Error processing Announcement:", error);
            const errorMessages = error.response ? error.response.data.errors : { global: error.message };
            setErrors(errorMessages);
            setTimeout(() => setErrors({}), 5000);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div>
            <div className='fixed inset-0 flex'>
                <Sidebar className="flex-shrink-0"/>
                <div className='flex flex-col flex-1'>
                    <Navbar className="sticky top-0 z-10 p-4"/>
                    <div className='bg-neutral-900 text-white flex flex-col flex-1 overflow-auto'>
                        <Typography variant="h5" className="mb-4 text-center">
                            {id ? "Update Announcement" : "Add a New Announcement"}
                        </Typography>
                        <div className="grid grid-cols-1 gap-4 p-10 ">
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-x-10 gap-y-6 mb-6 md:grid-cols-2">
                                    <div className="flex flex-col gap-3">
                                        <label htmlFor="title" className="block mb-2">Title</label>
                                        <input
                                            type="text"
                                            placeholder="New announcement"
                                            className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                                            style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
                                            id='title'
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                        {errors.title && <div className="text-red-500">{errors.title}</div>}
                                    </div>
                                    <div className="flex flex-col gap-3  ">
                                        <label htmlFor="content" className="block mb-2">Content</label>
                                        <input
                                            type="text"
                                            placeholder="A workshop will be held on..."
                                            className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                                            style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
                                            id='content'
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                        />
                                        {errors.content && <div className="text-red-500">{errors.content}</div>}
                                    </div>
                                    <div className="flex flex-col gap-3 w-96 mt-4">
                                        <label>Announcement Type</label>
                                        <div className="flex gap-10 text-white">
                                            <label className="flex items-center gap-2">
                                                <input 
                                                    type="radio" 
                                                    name="type" 
                                                    value="PUBLIC" 
                                                    checked={announcementType === 'PUBLIC'}
                                                    onChange={handleRadioChange}
                                                    className="form-radio checked:bg-primary checked:border-primary"
                                                />
                                                Public
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input 
                                                    type="radio" 
                                                    name="type" 
                                                    value="ONLY_MEMBERS" 
                                                    checked={announcementType === 'ONLY_MEMBERS'}
                                                    onChange={handleRadioChange}
                                                    className="form-radio checked:bg-primary checked:border-primary"
                                                />
                                                Only Members
                                            </label>
                                        </div>
                                        {errors.announcementType && <div className="text-red-500">{errors.announcementType}</div>}
                                    </div>
                                </div>
                                <div className="flex items-center justify-center mt-6 gap-4">
                                    <Button onClick={handleCancel} className='border-2 border-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#AEC90A]'  style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}>Cancel</Button>
                                    <Button type='submit' className='bg-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#0B0B0B]'  style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}>Submit</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewAnnouncementForm;
