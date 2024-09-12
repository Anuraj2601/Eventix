// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Navbar from "../../components/Navbar";

// import {
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
//   Button,
//   Typography,
// } from "@material-tailwind/react";
// // import { ChevronDownIcon } from "@heroicons/react/24/outline";
// import { HiChevronDown } from "react-icons/hi";
// import UsersService from "../../service/UsersService";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import PostService from "../../service/PostService";

// const MemberAddNewPost = () => {

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = useParams(); //post id
//   const { club } = location.state || {};

//   //console.log('club in posts form', club);

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [name, setName] = useState("");
//   const [position, setPosition] = useState("");
//   const [description, setDescription] = useState("");
//   const [postStatus, setPostStatus] = useState('PENDING');
//   const [postImage, setPostImage] = useState(null);
//   const [postImageUrl, setPostImageUrl] = useState(null);
//   const [clubId, setClubId] = useState('');
//   const [publishedUserId, setPublishedUserId] = useState('');

//   const [errors, setErrors] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   //club id
//   //published user id

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       //setSelectedImage(URL.createObjectURL(e.target.files[0]));
//       setPostImage(e.target.files[0]);
//     }
//   };

//   const currentUserDetails = async () => {
//     const session_id = localStorage.getItem("session_id");
//     const token = localStorage.getItem("token");
//     const userDetails = await UsersService.getUserById(session_id, token);
//     //console.log("uuser details in post", userDetails);
//     const { users } = userDetails;
//     if(users){
//       setName(users.firstname + " " + users.lastname);
//       setPosition(users.role);

//     }else{
//       console.log("User details are undefined or null");
//     }
   

//   }

//   const fetchPostDetails = async () => {
//     if (id) {

//       try {
//         const token = localStorage.getItem('token');
//         const response = await PostService.getPostById(id, token);
//         console.log('Response getPosts:', response); 
//         const { content } = response; 
//         if (content) {
//           setName(content.name || '');
//           setPosition(content.position || '');
//           setDescription(content.description || '');
//           setPostStatus(content.post_status || 'PENDING');
//           setPostImageUrl(content.post_image || '');
//           setClubId(content.club_id || '');
//           setPublishedUserId(content.published_user_id || '');
         
//         } else {
//           console.warn('Content is undefined or null');
//         }
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching post details:", error);
//         setErrors("Failed to fetch post details");
//         setIsLoading(false);
//       }

//     } else {
//       const session_id = localStorage.getItem("session_id");
//       const token = localStorage.getItem("token");
//       const userDetails = await UsersService.getUserById(session_id, token);
//       //console.log("uuser details in post", userDetails);
//       const { users } = userDetails;
//       if(users){
//         setName(users.firstname + " " + users.lastname);
//         setPosition(users.role);
//         setPostStatus('PENDING');
//         setClubId(club.club_id);
//         setPublishedUserId(session_id);

//       }else{
//         console.log("User details are undefined or null");
//       }
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {

//     fetchPostDetails();


//   }, [])

//   const validateField = (field, value) => {
//     let error = "";
//     switch (field) {
//         case "name":
//             if (!value) error = "Name is required.";
//             break;
//         case "position":
//             if (!value) error = "Position is required.";
//             break;
//         case "description":
//             if (!value) error = "Description is required.";
//             break;
//         case "postImage":
//           if (!value && !postImageUrl) error = "Post Image is required.";
//           break;
//         default:
//             break;
//     }
//     setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
// };

// useEffect(() => {
//     if (isSubmitted) {
//       validateField("name", name);
//     }
// }, [name]);

// useEffect(() => {
//     if (isSubmitted) {
//       validateField("position", position);
//     }
// }, [position]);

// useEffect(() => {
//     if (isSubmitted) {
//       validateField("description", description);
//     }
// }, [description]);

// useEffect(() => {
//   if (isSubmitted) {
//     validateField("postImage", postImage);
//   }
// }, [postImage]);


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsSubmitted(true);

//   validateField("name", name);
//   validateField("position", position);
//   validateField("description", description);
//   validateField("postImage", postImage);
  

//   if (Object.values(errors).every((error) => error === "") && Object.values({
//       name,
//       position,
//       description,
//       postImage
     
//     }).every((field) => field !== "" || postImageUrl)) {
//     try {
//       const token = localStorage.getItem("token");
//       const session_id = localStorage.getItem("session_id")
//       setPublishedUserId(session_id);
//       const formData = new FormData();

//       formData.append("data", new Blob([JSON.stringify({
//           name,
//           position,
//           description,
//           postStatus,
//           clubId,
//           publishedUserId
         
//         })], { type: "application/json" }));

//       if (postImage) {
//         formData.append("file", postImage);
//       }

//       if (id) {
//         const response = await PostService.updatePost(
//           id,
//           name,
//           position,
//           description,
//           postImage,
//           postStatus,
//           clubId,
//           publishedUserId,
//           token
//         );

//         alert("Post updated successfully");
//         console.log("Post updated:", response);
//         navigate(-1);

//       } else {
//         const response = await PostService.savePost(
//           name,
//           position,
//           description,
//           postImage,
//           postStatus,
//           clubId,
//           publishedUserId,
//           token
//         );

//         alert("Post added successfully");
//         console.log("Post added:", response);
//         navigate(-1);
//       }
//     } catch (error) {
//       console.error("Error processing Post:", error);
//       const errorMessages = error.response
//         ? error.response.data.errors
//         : { global: error.message };
//       setErrors(errorMessages);
//       setTimeout(() => setErrors({}), 5000);

//     }
//   }
// };


// function pageTitle() {
//   if (id) {
//     return "Update Post";
//   } else {
//     return "Create a Post";
//   }
// }

// const handleCancel = () => {
//   navigate(-1);

// }


//   return (
//     <>
//       <div className="fixed inset-0 flex flex-col md:flex-row">
//         <Sidebar className="flex-shrink-0 w-full md:w-auto" />
//         <div className="flex flex-col flex-1 overflow-auto">
//           <Navbar className="sticky top-0 z-10 p-4" />
//           <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-auto p-4 md:p-10">
//             <div className="flex flex-col items-center justify-center relative mt-10 w-full">
//               <div className="bg-[#AEC90A] text-[#0B0B0B] p-1 rounded-lg font-semibold absolute -top-4">
//                 {pageTitle()}
//               </div>
//               <div className="bg-[#0B0B0B] flex flex-col items-center justify-center border-2 border-[#AEC90A] rounded-xl w-full md:w-3/5 py-9">
//                 <form onSubmit={handleSubmit} className="w-full px-4 md:px-2">
//                   {/* Personal Information */}
//                   <div className="flex flex-col gap-3">
//                     <label htmlFor="name" className="text-white">
//                       Name
//                     </label>
//                     <input
//                       id="name"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       type="text"
//                       placeholder="Kamal Perera"
//                       className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
//                       readOnly
//                     />
//                     {isSubmitted && errors.name && <div className="text-red-500">{errors.name}</div>}
//                   </div>
                  
//                   {/* Position Information */}
//                   <div className="flex flex-col gap-3 mt-5">
//                     <label htmlFor="position" className="text-white">
//                       Position
//                     </label>
//                     <input
//                       id="position"
//                       value={position}
//                       onChange={(e) => setPosition(e.target.value)}
//                       type="text"
//                       placeholder="Secretary"
//                       className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
//                       readOnly
//                     />
//                     {isSubmitted && errors.position && <div className="text-red-500">{errors.position}</div>}
//                   </div>
                
//                   {/* Description */}
//                   <div className="flex flex-col gap-3 mt-5">
//                     <label htmlFor="description" className="text-white">
//                       Description
//                     </label>
//                     <textarea
//                       id="description"
//                       value={description}
//                       placeholder="Description"
//                       onChange={(e) => setDescription(e.target.value)}
//                       className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
//                     ></textarea>
//                     {isSubmitted && errors.description && <div className="text-red-500">{errors.description}</div>}
//                   </div>

//                   {/* Image Upload */}
//                   <div className="flex flex-col gap-3 mt-5">
//                     <label htmlFor="image" className="text-white">
//                       Upload Image
//                     </label>
//                     <input
//                       id="image"
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
//                     />
//                     {/* {postImage && (
//                       <img
//                         src={postImage}
//                         alt="Selected"
//                         className="mt-3 max-h-50"
//                       />
//                     )} */}
//                     {!postImage && postImageUrl ? ( // Show existing file if not replaced
//                       <div className="mt-2">
//                         <p className="text-white">Existing file:</p>
//                         <img
//                           src={postImageUrl}
//                           alt="Existing Logo"
//                           className="mt-2 w-32 h-32 object-cover rounded"
//                         />
//                       </div>
//                     ) : (
//                       postImage && (
//                         <div className="mt-2">
//                           <p className="text-white">Selected file: {postImage.name}</p>
//                           <img
//                             src={URL.createObjectURL(postImage)}
//                             alt="Preview"
//                             className="mt-2 w-32 h-32 object-cover rounded"
//                           />
//                         </div>
//                       )
//                     )}
//                     {isSubmitted && errors.postImage && <div className="text-red-500">{errors.postImage}</div>}
//                   </div>

//                   <div className="flex items-center justify-center mt-6 gap-4">
//                     <Button onClick={handleCancel} className="border-2 border-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#AEC90A]">
//                       Cancel
//                     </Button>
//                     <Button type="submit" className="bg-[#AEC90A] border-2 border-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#0B0B0B]">
//                       Post
//                     </Button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MemberAddNewPost;

import React, { useState, useEffect} from 'react'
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Link, useNavigate, useParams } from 'react-router-dom';
import MeetingService from '../../service/MeetingService';
import { Button } from "@material-tailwind/react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const AddNewMeetingForm = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [meetingType, setMeetingType] = useState('PHYSICAL');
    const [participantType, setParticipantType] = useState('');
    const [errors, setErrors] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { id } = useParams();
    
    const handleRadioChange = (e) => {
        setMeetingType(e.target.value);
    };

    useEffect(() => {
        const fetchMeetingDetails = async () => {
          if (id) {
            try {
              const token = localStorage.getItem('token');
              const response = await MeetingService.getMeetingById(id, token);
              console.log('Response getMeetings:', response); 
              const { content } = response; 
              if (content) {
                setTitle(content.meeting_name || '');
                const formattedDate = content.date ? `${content.date[0]}-${String(content.date[1]).padStart(2, '0')}-${String(content.date[2]).padStart(2, '0')}` : '';
                setDate(formattedDate);
                const formattedTime = content.time ? `${String(content.time[0]).padStart(2, '0')}:${String(content.time[1]).padStart(2, '0')}` : '';
                setTime(formattedTime);
                setMeetingType(content.meeting_type || '');
                setParticipantType(content.participant_type || '');
               
              } else {
                console.warn('Content is undefined or null');
              }
              setIsLoading(false);
            } catch (error) {
              console.error("Error fetching meeting details:", error);
              setErrors("Failed to fetch meeting details");
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
          }
        };
    
        fetchMeetingDetails();
    }, [id]);


    const validateField = (field, value) => {
        let error = "";
        switch (field) {
            case "title":
                if (!value) error = "Meeting title is required.";
                break;
            case "date":
                if (!value) error = "Meeting date is required.";
                break;
            case "time":
                if (!value) error = "Meeting time is required.";
                break;
            case "meetingType":
                if (!value) error = "Meeting Type is required.";
                break;
            case "participantType":
                if (!value) error = "Participant Type is required.";
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    };

    useEffect(() => {
        if (isSubmitted) {
          validateField("title", title);
        }
    }, [title]);

    useEffect(() => {
        if (isSubmitted) {
          validateField("date", date);
        }
    }, [date]);

    useEffect(() => {
        if (isSubmitted) {
          validateField("time", time);
        }
    }, [time]);

    useEffect(() => {
        if (isSubmitted) {
          validateField("meetingType", meetingType);
        }
    }, [meetingType]);

    useEffect(() => {
        if (isSubmitted) {
          validateField("participantType", participantType);
        }
    }, [participantType]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        validateField("title", title);
        validateField("date", date);
        validateField("time", time);
        validateField("meetingType", meetingType);
        validateField("participantType", participantType);
       
        
        // const formData = new FormData();

        // formData.append('data', new Blob([JSON.stringify({
        //     title,
        //     content,
        //     announcementType,
      
        // })], { type: 'application/json' }));

        if(Object.values(errors).every((error) => error === "") && 
            Object.values({title, date, time, meetingType, participantType}).every((field) => field !== "")){

            try{
                const token = localStorage.getItem('token'); 
                if(id){

                    const response = await MeetingService.updateMeeting(
                        id,
                        title,
                        date,
                        time,
                        meetingType,
                        participantType,
                        token
                    );
        
                    
                    alert('Meeting updated successfully');
                    console.log('Meeting updated:', response);
                    navigate(-1);
    
                }else{
    
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
    
                }



            }catch(error){
                console.error("Error Processing Meeting:", error);
            
                const errorMessages = error.response ? error.response.data.errors : { global: error.message };
                setErrors(errorMessages);
                setTimeout(() => setErrors({}), 5000);

            }

        }

        // try {
        //     const response = await MeetingService.saveMeeting(
        //         title,
        //         date,
        //         time,
        //         meetingType,
        //         participantType,
        //         token
        //     );

            
        //     alert('Meeting added successfully');
        //     console.log('Meeting added:', response);
        //     navigate(-1);

        // } catch(error) {
        //     console.error("Error Adding Meeting:", error);
            
        //     const errorMessages = error.response ? error.response.data.errors : { global: error.message };
        //     setErrors(errorMessages);
        //     setTimeout(() => setErrors({}), 5000);
        // }
        
   
  };

  function pageTitle() {
    if (id) {
      return "Update Meeting";
    } else {
      return "Create a New Meeting";
    }
  }

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
                        <div className='bg-[#AEC90A] text-[#0B0B0B] p-1 rounded-lg font-semibold absolute -top-4'>{pageTitle()}</div>
                        <div className="bg-[#0B0B0B] flex flex-col items-center justify-center border-2 border-[#AEC90A] rounded-xl w-1/2 py-9">
                            
                            <form onSubmit={handleSubmit} >
                            <div className="flex flex-col w-full">
                                <div className="flex flex-col gap-3 w-96 ">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" placeholder='General Meeting' className='block p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'
                                        id='title'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        />
                                    {isSubmitted && errors.title && <div className="text-red-500">{errors.title}</div>}
                                </div>
                                <div className="flex flex-col gap-3  w-96 mt-4">
                                    <label htmlFor="date">Meeting Date</label>
                                    <DatePicker
                                        selected={date}
                                        onChange={e => setDate(e)}
                                        dateFormat="yyyy/MM/dd"
                                        minDate={new Date()}
                                        className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'
                                    
                                    />
                                    {/* <input type="date" name='date' className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'
                                        id='date'
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required/> */}
                                    {isSubmitted && errors.date && <div className="text-red-500">{errors.date}</div>}
                                </div>
                                <div className="flex flex-col gap-3  w-96 mt-4">
                                    <label htmlFor="date">Meeting Time</label>
                                    <input type="time" name='time' className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'
                                        id='time'
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        />
                                    {isSubmitted && errors.time && <div className="text-red-500">{errors.time}</div>}
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
                                    {isSubmitted && errors.meetingType && <div className="text-red-500">{errors.meetingType}</div>}
                                </div>
                                <div className="flex flex-col gap-3  w-96 mt-4">
                                    <label htmlFor="participantType" >
                                        Participant Type
                                    </label>
                                    <select
                                        id="participantType"
                                        value={participantType}
                                        onChange={(e) => setParticipantType(e.target.value)}
                                        className=" text-white rounded p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] "
                                    /*  required */
                                    >
                                        <option value="">Select participant type</option>
                                        <option value="EVERYONE">Everyone</option>
                                        <option value="CLUB_BOARD">Club Board</option>
                                        <option value="CLUB_MEMBERS">Club Members</option>
                                    </select>
                                    {isSubmitted && errors.participantType && <div className="text-red-500">{errors.participantType}</div>}
                                </div>

                               
                            </div>
                            
                            <div className="flex items-center justify-center mt-6 gap-4">
                                <Button onClick={handleCancel} className='border-2 border-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#AEC90A]'>Cancel</Button>
                                <Button type='submit' className='bg-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#0B0B0B]'>Submit</Button>
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