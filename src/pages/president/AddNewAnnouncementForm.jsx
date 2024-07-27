import React, { useState} from 'react'
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Badge, Button } from "@material-tailwind/react";
import { Radio } from "@material-tailwind/react";
import AnnouncementService from '../../service/AnnouncementService';
import { Link, useNavigate } from 'react-router-dom';

const AddNewAnnouncementForm = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [announcementType, setAnnouncementType] = useState('PUBLIC');
    const [errors, setErrors] = useState('');
    
    const handleRadioChange = (e) => {
        setAnnouncementType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token'); 
        // const formData = new FormData();

        // formData.append('data', new Blob([JSON.stringify({
        //     title,
        //     content,
        //     announcementType,
      
        // })], { type: 'application/json' }));

        console.log("Announcement Type: ", announcementType);  // Debugging

        try {
            const response = await AnnouncementService.saveAnnouncement(
                title,
                content,
                announcementType,
                token
            );

            
            alert('Announcement added successfully');
            console.log('Announcement added:', response);
            navigate(-1);

        } catch(error) {
            console.error("Error Adding Announcement:", error);
            
            const errorMessages = error.response ? error.response.data.errors : { global: error.message };
            setErrors(errorMessages);
            setTimeout(() => setErrors({}), 5000);
        }
        
   
  };

  const handleCancel = () => {
    navigate(`/president/club/announcement/add`);

  }
   
  return (
    <div>
        <div className='fixed inset-0 flex'>
        <Sidebar className="flex-shrink-0"/>
        <div className='flex flex-col flex-1'>
            <Navbar className="sticky top-0 z-10 p-4"/>
            <div className='bg-neutral-900 text-white flex flex-col flex-1 overflow-auto'>
                {/* <div className='flex mx-5 my-6 relative'>
                    <Badge placement='top-end' className='w-4 h-4 rounded-full bg-[#AEC90A] absolute -top-1 -right-1'>
                        <Button className='bg-neutral-900 border-2 border-[#AEC90A] font-medium py-2 px-4 rounded-xl'></Button>
                    </Badge>
                  
                </div> */}
                <div className='my-16'>
                <div className='flex flex-col items-center justify-center relative'>
                    <div className='bg-[#AEC90A] text-[#0B0B0B] p-1 rounded-lg font-semibold absolute -top-4'>Add a New Announcement</div>
                    <div className="bg-[#0B0B0B] flex flex-col items-center justify-center border-2 border-[#AEC90A] rounded-xl w-1/2 py-9">
                        
                        <form onSubmit={handleSubmit} >
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col gap-3 w-96 mt-4">
                            <label htmlFor="title">Title</label>
                            <input type="text" placeholder='General Meeting' className='block p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'
                                id='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required/>
                            </div>
                            <div className="flex flex-col gap-3  w-96 mt-4">
                            <label htmlFor="content">Content</label>
                            <input type="text" placeholder='A meeting will be held on...' className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'
                                id='content'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required/>
                            </div>
                            <div className="flex flex-col gap-3  w-96 mt-4">
                            <label htmlFor="">Announcement Type</label>
                            <div className="flex gap-10 text-white">
                                {/* <Radio name="type" label="Public" className="checked:bg-primary checked:border-primary "
                                checked={announcementType === 'PUBLIC'}
                                onChange={(e) => setAnnouncementType(e.target.value)}/>
                                <Radio name="type" label="Only Members" className='checked:bg-primary checked:border-primary'  
                                value="ONLY_MEMBERS" 
                                checked={announcementType === 'ONLY_MEMBERS'}
                                onChange={(e) => setAnnouncementType(e.target.value)}/> */}
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
                            </div>
                           
                        </div>
                        
                        <div className="flex items-center justify-center mt-6 gap-4">
                            <Button onClick={handleCancel} className='border-2 border-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#AEC90A]'>Cancel</Button>
                            <Button type='submit' className='bg-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#0B0B0B]'>Add</Button>
                        </div>

                        </form>

                    </div>
                    
                </div>
                </div>

            </div>

        </div>

        </div>

    </div>
  )
}

export default AddNewAnnouncementForm