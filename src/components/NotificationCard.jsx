import React, { useState, useEffect} from 'react';
import { MdDelete } from "react-icons/md";
import ieeeImage from "../assets/clubs/ieee.png";
import rotaractImage from "../assets/clubs/rotaract.png";
import acmImage from "../assets/clubs/acm.png";
import pahasaraImage from "../assets/clubs/pahasara1.png";
import isacaImage from "../assets/clubs/isaca1.png";
import wieImage from "../assets/clubs/wie.png";
import NotificationService from '../service/NotificationService';
import ClubsService from '../service/ClubsService';

import { FaCircle } from "react-icons/fa";

// const notifications = [
//   {
//     id: 1,
//     image: ieeeImage,
//     title: "(IEEE) Institute of Electrical and Electronics Engineers",
//     time: "4:45 pm",
//     message: "Applied for IEEE Student Chapter Club. Dear student, we received your application. Stay tuned for further updates regarding your interview schedule."
//   },
//   {
//     id: 2,
//     image: rotaractImage,
//     title: "(Rotaract) Rotaract Club",
//     time: "2:30 pm",
//     message: "Your membership application for Rotaract Club has been received. We will notify you about the upcoming orientation session."
//   },
//   {
//     id: 3,
//     image: acmImage,
//     title: "(ACM) Association for Computing Machinery",
//     time: "10:00 am",
//     message: "Thank you for applying to join ACM. We will review your application and get back to you soon with more information."
//   },
//   {
//     id: 4,
//     image: pahasaraImage,
//     title: "(Pahasara) Pahasara Club",
//     time: "1:15 pm",
//     message: "We have received your interest in joining Pahasara Club. Please keep an eye on your email for further details."
//   },
//   {
//     id: 5,
//     image: isacaImage,
//     title: "(ISACA) Information Systems Audit and Control Association",
//     time: "11:30 am",
//     message: "Your application for ISACA has been successfully submitted. We will notify you about the next steps soon."
//   },
//   {
//     id: 6,
//     image: wieImage,
//     title: "(WIE) Women in Engineering",
//     time: "3:00 pm",
//     message: "Thanks for your application to WIE. We will review your details and send you further instructions."
//   },
// ];

const NotificationCard = ({ image, title, time, message, is_read}) => {
  return (
    <div  className={`p-6 mx-4 my-2 rounded-2xl ${
      is_read ? 'bg-[#1E1E1E]' : 'bg-[#AEC90A33]'
    }`} style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}>
      <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-4">
          {!is_read && <FaCircle className='text-primary' size={10}/>}
          <img src={image} alt="" className='w-12 h-12 rounded-full'/>
          <span className='text-[#FFFFFFCC]'>{title} </span>
        </div>
        <span className='text-[#FFFFFFCC]'>{time}</span>
      </div>
      <div className="flex items-center justify-between p-3 ml-12">
        <p className='text-white w-4/5'>
          {message}
        </p>
        {/* <button
          className="relative align-middle select-none font-sans font-medium text-center uppercase bg-[#171717] transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-14 max-w-[40px] h-14 max-h-[40px] text-xs text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full"
          type="button">
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <MdDelete className='text-[#AEC90A99]' size={27}/>
          </span>
        </button> */}
     </div> </div>
    </div>
  );
}

const NotificationPage = () => {

  const [notification, setNotification] = useState([]);

  const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length < 6) {
      return "Invalid date format";
    }
  
    // Extract the date components
    const [year, month, day, hour, minute, second] = dateArray;
  
    // Create a JavaScript Date object (months are 0-indexed in JS)
    const date = new Date(year, month - 1, day, hour, minute, second);
  
    // Format the date into a readable string
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // For AM/PM format
    });
  };
  
  const toUTC = (date) => {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + offset);
  };

  const fromUTC = (dateArray) => {
    const date = new Date(Date.UTC(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]));
    //const date = new Date(Date.UTC(...dateArray));
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset);
  };

  useEffect(() => {

    const fetchNotifications = async () => {
        try{
            const token = localStorage.getItem('token');
            const session_id = localStorage.getItem('session_id');
            const response = await NotificationService.getNotificationByUserId(session_id, token) ;
            //console.log("notification response array", response);
            const notificationArray = response.content;
            //const notificationArray = response.content.filter(notification => notification.user_id === session_id ) || [];
            console.log("notification array", notificationArray);

          
            // Fetch club details for each notification
            const notificationsWithClubs = await Promise.all(
              notificationArray.map(async (notification) => {
                try {
                  const clubDetails = await ClubsService.getClubById(notification.club_id, token);
                  //console.log("club details with notifcation", clubDetails);
                  return { ...notification,
                            clubName: clubDetails.content.club_name, 
                            clubImage: clubDetails.content.club_image }; // Combine notification and club details
                } catch (clubError) {
                  console.error(`Error fetching club details for notification ID: ${notification.id}`, clubError);
                  return { ...notification, clubName: 'Club Name', clubImage: 'Club Image' }; 
                }
              })
            );

            const sortedNotifications = notificationsWithClubs.sort((a, b) => {
              // Reconstruct Date objects from date_posted array for both notifications
              const dateA = fromUTC(a.date_posted);
              const dateB = fromUTC(b.date_posted);
          
              // Sort in descending order (latest date first)
              return dateB - dateA;
            });
            
            console.log("sorted notification array with clubs", sortedNotifications);
            console.log("notification array with clubs", notificationsWithClubs);
            setNotification(sortedNotifications);

            
            

        }catch(error){
            console.error("Error fetching notifcations", error);
        }

    }

    fetchNotifications();

  
  }, [])

  const handleMarkAllAsRead = async () => {
    try{
      const token = localStorage.getItem('token');
      const session_id = localStorage.getItem('session_id');
      const response = await NotificationService.markAllAsRead(session_id, token) ;
      console.log(response);

      const updatedNotifications = notification.map(notification => ({
        ...notification,
        is_read: true,  // Mark all notifications as read
      }));
      
      // Update the state with the new notifications array
      setNotification(updatedNotifications);


    }catch(err){
      console.error("Error marking all notifications as read", err);
    }
  }

  return (
    <div className="flex flex-col">
      <div className='flex justify-end mx-5 mb-2'>
        <button type='submit' className='text-primary hover:underline' onClick={handleMarkAllAsRead}>Mark all as read</button>
      </div>
      
      {notification.map(notification => (
        <NotificationCard
          key={notification.notification_id}
          image={notification.clubImage}
          title={notification.clubName}
          time={formatDate(notification.date_posted)}
          message={notification.notification}
          is_read={notification._read}
        />
      ))}
    </div>
  );
}

export default NotificationPage;
