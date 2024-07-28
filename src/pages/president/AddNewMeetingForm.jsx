import React, { useState} from 'react'
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from 'react-router-dom';
import MeetingService from '../../service/MeetingService';

const AddNewMeetingForm = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [meetingType, setMeetingType] = useState('PHYSICAL');
    const [participantType, setParticipantType] = useState('');
    const [errors, setErrors] = useState('');
    
    const handleRadioChange = (e) => {
        setMeetingType(e.target.value);
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

        try {
            const response = await MeetingService.saveMeeting(
                title,
                date,
                time,
                meetingType,
                participantType,
                token
            );

            
            alert('Meeting added successfully');
            console.log('Meeting added:', response);
            navigate(-1);

        } catch(error) {
            console.error("Error Adding Meeting:", error);
            
            const errorMessages = error.response ? error.response.data.errors : { global: error.message };
            setErrors(errorMessages);
            setTimeout(() => setErrors({}), 5000);
        }
        
   
  };

  const handleCancel = () => {
    navigate(-1);

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
                        <div className='bg-[#AEC90A] text-[#0B0B0B] p-1 rounded-lg font-semibold absolute -top-4'>Create a New Meeting</div>
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
                                <label htmlFor="date">Meeting Date</label>
                                <input type="date" name='date' className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'
                                    id='date'
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required/>
                                </div>
                                <div className="flex flex-col gap-3  w-96 mt-4">
                                <label htmlFor="date">Meeting Time</label>
                                <input type="time" name='time' className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'
                                    id='time'
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    required/>
                                </div>
                                <div className="flex flex-col gap-3  w-96 mt-4">
                                <label htmlFor="">Meeting Type</label>
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
                                            value="PHYSICAL" 
                                            checked={meetingType === 'PHYSICAL'}
                                            onChange={handleRadioChange}
                                            className="form-radio checked:bg-primary checked:border-primary"
                                        />
                                        Physical
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input 
                                            type="radio" 
                                            name="type" 
                                            value="ONLINE" 
                                            checked={meetingType === 'ONLINE'}
                                            onChange={handleRadioChange}
                                            className="form-radio checked:bg-primary checked:border-primary"
                                        />
                                        Online
                                    </label>
                                </div>
                                </div>
                                <div className="flex flex-col gap-3  w-96 mt-4">
                                <label htmlFor="participantType" className="text-lg font-semibold">
                                    Participant Type
                                </label>
                                <select
                                    id="participantType"
                                    value={participantType}
                                    onChange={(e) => setParticipantType(e.target.value)}
                                    className="p-2 bg-black text-white rounded"
                                /*  required */
                                >
                                    <option value="">Select participant type</option>
                                    <option value="EVERYONE">Everyone</option>
                                    <option value="CLUB_BOARD">Club Board</option>
                                    <option value="CLUB_MEMBERS">Club Members</option>
                                </select>
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

export default AddNewMeetingForm