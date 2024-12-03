// import React, { useState, useEffect } from 'react';
// import { MdAdd } from "react-icons/md";
// import { FaCheck, FaTimes } from "react-icons/fa"; // Import icons for tick and wrong mark
// import { useLocation } from 'react-router-dom';

// // Import images
// import launchImage from '../assets/launch.jpg';
// import reid3Image from '../assets/reid3.jpg';
// import speakerImage from '../assets/speaker.jpg';
// import EventPostService from '../service/EventPostService';
// import UsersService from '../service/UsersService';


// const Posts = ({ post, isPresidentOrSecretaryPage }) => {
//     const [status, setStatus] = useState(post.post_status);
//     const [userImage, setuserImage] = useState('');
//     const [userName, setuserName] = useState('');

//     const fetchUser = async (post) => {

//         try{
//             const token = localStorage.getItem('token');
//             const response = await UsersService.getUserById(post.published_user_id ,token);
//             //console.log("user details in post", response);
//             const userImageUrl = response.users.photoUrl;
//             const publisherName = response.users.firstname + " " + response.users.lastname;
//             setuserImage(userImageUrl);
//             setuserName(publisherName);
//             // const User = response.content || [];
//             // console.log("all posts", postsArray);
//             // setPosts(postsArray);

//         }catch(error){
//             console.log("Error fetching user details for posts", error);
//         }
            
//     }

//     useEffect(() =>{

//         fetchUser(post);

//     }, [])

//     const handleApprove = () => {
//         setStatus('APPROVED');
//     };

//     const handleReject = () => {
//         setStatus('REJECTED');
//     };

//     return (
//         <div className="flex items-center justify-center mb-8 p-8 -mt-10">
//             <div className='bg-[#0b0b0b] p-10 w-full rounded-md' style={{ 
//                 boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
//             }}>
//                 <div className="flex flex-row items-center justify-between mb-4">
//                     <div className="flex items-center gap-2 custom-card">
//                         <img src={userImage} alt="" className='w-11 h-11 rounded-full border-2 border-[#AEC90A]' />
//                         <div className="flex flex-col">
//                             <p>{userName}</p>
//                             {/* <p className="text-[#AEC90A]">{post.position}</p> */}
//                         </div>
//                     </div>
//                     {isPresidentOrSecretaryPage && status === 'PENDING' && (
//                         <div className="flex items-center gap-4">
//                             <button onClick={handleApprove} className={`text-[#AEC90A] custom-card ${status === 'APPROVED' ? 'clicked-transition' : ''}`}><FaCheck size={30} /></button>
//                             <button onClick={handleReject} className={`text-red-500 custom-card ${status === 'REJECTED' ? 'clicked-transition' : ''}`}><FaTimes size={30} /></button>
//                         </div>
//                     )}
//                     {!isPresidentOrSecretaryPage && status === 'PENDING' && (
//                         <div className="flex items-center gap-4">
//                         </div>
//                     )}
//                     {isPresidentOrSecretaryPage && status !== 'PENDING' && (
//                         <div className="flex items-center gap-4">
//                             {status === 'APPROVED' && <FaCheck className='text-[#AEC90A] custom-card' size={30} />}
//                             {status === 'REJECTED' && <FaTimes className='text-red-500 custom-card' size={30} />}
//                         </div>
//                     )}
//                 </div>
//                 <div className="flex flex-col w-full mb-4">
//                     <p className='flex flex-col'>
//                         <span className='font-bold'>{post.title}</span>
//                         <span>{post.description}</span>
//                         {/* {post.link && <a href={post.link} className='text-[#AEC90A] underline custom-card' target="_blank" rel="noopener noreferrer">{post.link}</a>} */}
//                     </p>                  
//                     {post.post_image && <img src={post.post_image} alt="" className='border-1 border-[#AEC90A] w-full h-88 object-cover mt-3' />}
//                 </div>
//             </div>
//         </div>
//     );
// };

// const NewsFeed = ({ posts, setEventPosts, event }) => {
//     const location = useLocation();
//     const isPresidentOrSecretaryPage = location.pathname.startsWith('/president') || location.pathname.startsWith('/secretary');
//     const isOcPage = location.pathname.startsWith('/oc');
//     const isMemberPage = location.pathname.startsWith('/member') || !(isPresidentOrSecretaryPage || isOcPage);

//     const pendingPosts = posts.filter(post => post.post_status === 'PENDING');
//     const approvedPosts = posts.filter(post => post.post_status === 'APPROVED');
//     const rejectedPosts = posts.filter(post => post.post_status === 'REJECTED');

//     return (
//         <div className="bg-neutral-900 text-white min-h-screen relative">
//             <div className='relative'>
//                 {isOcPage && (
//                     <div className='flex justify-end mb-2'>
//                         <button
//                             className="bg-[#AEC90A] text-black flex items-center justify-center rounded-full hover:bg-[#AEC90A] hover:text-black p-2 absolute -top-3 right-8 z-10 custom-card"
//                         >
//                             <MdAdd size={24} />
//                         </button>
//                     </div>
//                 )}
//                 {(isPresidentOrSecretaryPage || isOcPage) && (
//                     <>
//                         <h2 className="text-2xl font-bold mb-4">Pending Posts</h2>
//                         {pendingPosts.map((post, index) => (
//                             <Posts key={index} post={post} isPresidentOrSecretaryPage={isPresidentOrSecretaryPage} />
//                         ))}
//                     </>
//                 )}
//                 {(isPresidentOrSecretaryPage || isOcPage) && (
//                     <>
//                         <h2 className="text-2xl font-bold mb-4">Approved Posts</h2>
//                         {approvedPosts.map((post, index) => (
//                             <Posts key={index} post={post} isPresidentOrSecretaryPage={isPresidentOrSecretaryPage} />
//                         ))}
//                         <h2 className="text-2xl font-bold mb-4">Rejected Posts</h2>
//                         {rejectedPosts.map((post, index) => (
//                             <Posts key={index} post={post} isPresidentOrSecretaryPage={isPresidentOrSecretaryPage} />
//                         ))}
//                     </>
//                 )}
//                 {isMemberPage && posts.map((post, index) => (
//                     <Posts key={index} post={post} isPresidentOrSecretaryPage={isPresidentOrSecretaryPage} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// const App = ({clubId, event}) => {

//     // const samplePosts = [
//     //     {
//     //         position: 'Secretary',
//     //         userName: 'John Doe',
//     //         userImage: "https://randomuser.me/api/portraits/men/3.jpg",
//     //         caption: 'Are you ready to take the next step in your reidExtreme 3.0 journey? The reidExtreme 3.0 is the perfect opportunity for students to explore potential career paths, network with industry professionals, and discover exciting job and internship opportunities',
//     //         image: launchImage,
//     //         link: 'Register now',
//     //         status: 'pending',
//     //     },
//     //     {
//     //         position: 'President',
//     //         userName: 'Veron',
//     //         userImage: "https://randomuser.me/api/portraits/men/2.jpg",
//     //         caption: 'While possessing knowledge is all well and good, if you have not the wisdom to wield it to your advantage, it becomes about as useful as soot. All but removing probability, one should not only be able to calculate every way forward, but should also be well-versed enough to choose the best path.Piqued your interest? Read further here - https://www.britannica.com/science/game-theory Register your team for ReidXtreme by visiting ',
//     //         image: reid3Image,
//     //         link: 'http://reidxtreme.ucscieee.com/',
//     //         status: 'approved',
//     //     }, 
//     //     {
//     //         position: 'OC',
//     //         userName: 'Sarah',
//     //         userImage: "https://randomuser.me/api/portraits/women/7.jpg",
//     //         caption: 'Are you ready to take the next step in your reidExtreme 3.0 journey? The reidExtreme 3.0 is the perfect opportunity for students to explore potential career paths, network with industry professionals, and discover exciting job and internship opportunities',
//     //         image: speakerImage,
//     //         link: 'Register now',
//     //         status: 'pending',
//     //     },
//     //     {
//     //         userName: 'Jane Smith',
//     //         userImage: "https://randomuser.me/api/portraits/men/9.jpg",
//     //         caption: 'Had a great time at the conference today!',
//     //         image: null,
//     //         link: null,
//     //         status: 'approved',
//     //     },
//     //     {
//     //         position: 'Treasurer',
//     //         userName: 'David Brown',
//     //         userImage: "https://randomuser.me/api/portraits/men/10.jpg",
//     //         caption: 'Our budget meeting was insightful. Thank you to all who participated!',
//     //         image: null,
//     //         link: null,
//     //         status: 'rejected',
//     //     }
//     // ];

//     const [eventPosts, setEventPosts] = useState([]);

//     useEffect(() => {

//         const fetchEventPosts = async () => {
//             try{
//                 const token = localStorage.getItem('token');
//                 const response = await EventPostService.getAllEventPosts(token);
//                 const eventPostsArray = response.content.filter(post => post.event_id === event.event_id) || [];
//                 console.log("all event posts", eventPostsArray);
//                 setEventPosts(eventPostsArray);
    
//             }catch(error){
//                 console.error("Error fetching event posts", error);
//             }

//         }

//         fetchEventPosts();

      
//     }, [])


//     return (
//         <NewsFeed posts={eventPosts} setEventPosts = {setEventPosts} event = {event}/>
//     );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import { MdAdd } from "react-icons/md";
import { FaCheck, FaTimes } from "react-icons/fa"; // Import icons for tick and wrong mark
import { useLocation, useNavigate } from 'react-router-dom';

// Import images
import launchImage from '../assets/launch.jpg';
import reid3Image from '../assets/reid3.jpg';
import speakerImage from '../assets/speaker.jpg';
import EventPostService from '../service/EventPostService';
import UsersService from '../service/UsersService';
import EventOcService from '../service/EventOcService';


const Posts = ({ post, isPresidentOrSecretaryPage }) => {
    const [status, setStatus] = useState(post.post_status);
    const [userImage, setuserImage] = useState('');
    const [userName, setuserName] = useState('');

    const fetchUser = async (post) => {

        try{
            const token = localStorage.getItem('token');
            const response = await UsersService.getUserById(post.published_user_id ,token);
            //console.log("user details in post", response);
            const userImageUrl = response.users.photoUrl;
            const publisherName = response.users.firstname + " " + response.users.lastname;
            setuserImage(userImageUrl);
            setuserName(publisherName);
            // const User = response.content || [];
            // console.log("all posts", postsArray);
            // setPosts(postsArray);

        }catch(error){
            console.log("Error fetching user details for posts", error);
        }
            
    }

    useEffect(() =>{

        fetchUser(post);

    }, [])

    const handleApprove = () => {
        setStatus('APPROVED');
    };

    const handleReject = () => {
        setStatus('REJECTED');
    };

    return (
        <div className="flex items-center justify-center mb-8 p-8 -mt-10">
            <div className='bg-[#0b0b0b] p-10 w-full rounded-md' style={{ 
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
            }}>
                <div className="flex flex-row items-center justify-between mb-4">
                    <div className="flex items-center gap-2 custom-card">
                        <img src={userImage} alt="" className='w-11 h-11 rounded-full border-2 border-[#AEC90A]' />
                        <div className="flex flex-col">
                            <p>{userName}</p>
                            {/* <p className="text-[#AEC90A]">{post.position}</p> */}
                        </div>
                    </div>
                    {isPresidentOrSecretaryPage && status === 'PENDING' && (
                        <div className="flex items-center gap-4">
                            <button onClick={handleApprove} className={`text-[#AEC90A] custom-card ${status === 'APPROVED' ? 'clicked-transition' : ''}`}><FaCheck size={30} /></button>
                            <button onClick={handleReject} className={`text-red-500 custom-card ${status === 'REJECTED' ? 'clicked-transition' : ''}`}><FaTimes size={30} /></button>
                        </div>
                    )}
                    {!isPresidentOrSecretaryPage && status === 'PENDING' && (
                        <div className="flex items-center gap-4">
                        </div>
                    )}
                    {isPresidentOrSecretaryPage && status !== 'PENDING' && (
                        <div className="flex items-center gap-4">
                            {status === 'APPROVED' && <FaCheck className='text-[#AEC90A] custom-card' size={30} />}
                            {status === 'REJECTED' && <FaTimes className='text-red-500 custom-card' size={30} />}
                        </div>
                    )}
                </div>
                <div className="flex flex-col w-full mb-4">
                    <p className='flex flex-col'>
                        <span className='font-bold'>{post.title}</span>
                        <span>{post.description}</span>
                        {/* {post.link && <a href={post.link} className='text-[#AEC90A] underline custom-card' target="_blank" rel="noopener noreferrer">{post.link}</a>} */}
                    </p>                  
                    {post.post_image && <img src={post.post_image} alt="" className='border-1 border-[#AEC90A] w-full h-88 object-cover mt-3' />}
                </div>
            </div>
        </div>
    );
};

const NewsFeed = ({ posts, setEventPosts, event }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isPresidentOrSecretaryPage = location.pathname.startsWith('/president') || location.pathname.startsWith('/secretary');
    const isOcPage = location.pathname.startsWith('/oc');
    const isMemberPage = location.pathname.startsWith('/member') || !(isPresidentOrSecretaryPage || isOcPage);

    const pendingPosts = posts.filter(post => post.post_status === 'PENDING');
    const approvedPosts = posts.filter(post => post.post_status === 'APPROVED');
    const rejectedPosts = posts.filter(post => post.post_status === 'REJECTED');


    const handleAdd = () => {
        navigate(`/event/new-post`, { state: { event } })
    }

    const [isOc, setIsOcMember] = useState(false);

    const isOcMember = async () => {
      const token = localStorage.getItem("token");
      const session_id = localStorage.getItem("session_id");
  
      try {
        const response2 = await EventOcService.getAllEventOcs(token);
        const isOcArray = response2.content
          ? response2.content.filter(
              (oc) =>
                oc.event_id == event.event_id && oc.user_id == session_id
            )
          : [];
        //console.log("is oc array ",isOcArray);
  
        if (isOcArray.length > 0) {
          setIsOcMember(true);
        }
      } catch (err) {
        console.log("Error while fetching event OCs details", err);
      }
    };
  
    useEffect(() => {
      isOcMember();
    }, []);

    return (
        <div className="bg-neutral-900 text-white min-h-screen relative">
            <div className='relative'>
                {/* {isOcPage && (
                    <div className='flex justify-end mb-2'>
                        <button
                            className="bg-[#AEC90A] text-black flex items-center justify-center rounded-full hover:bg-[#AEC90A] hover:text-black p-2 absolute -top-3 right-8 z-10 custom-card"
                        >
                            <MdAdd size={24} />
                        </button>
                    </div>
                )} */}
                {isOc && (
                    <div className='flex justify-end mb-2'>
                        <button
                            className="bg-[#AEC90A] text-black flex items-center justify-center rounded-full hover:bg-[#AEC90A] hover:text-black p-2 absolute -top-4 right-8 z-10 custom-card"
                        >
                            <MdAdd size={24} onClick={handleAdd}/>
                        </button>
                    </div>
                )}
                {(isPresidentOrSecretaryPage || isOc) && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Pending Posts</h2>
                        {pendingPosts.map((post, index) => (
                            <Posts key={index} post={post} isPresidentOrSecretaryPage={isPresidentOrSecretaryPage} />
                        ))}
                    </>
                )}
                {(isPresidentOrSecretaryPage || isOc) && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Approved Posts</h2>
                        {approvedPosts.map((post, index) => (
                            <Posts key={index} post={post} isPresidentOrSecretaryPage={isPresidentOrSecretaryPage} />
                        ))}
                        <h2 className="text-2xl font-bold mb-4">Rejected Posts</h2>
                        {rejectedPosts.map((post, index) => (
                            <Posts key={index} post={post} isPresidentOrSecretaryPage={isPresidentOrSecretaryPage} />
                        ))}
                    </>
                )}
                {isMemberPage && posts.map((post, index) => (
                    <Posts key={index} post={post} isPresidentOrSecretaryPage={isPresidentOrSecretaryPage} />
                ))}
            </div>
        </div>
    );
};

const App = ({clubId, event}) => {

    // const samplePosts = [
    //     {
    //         position: 'Secretary',
    //         userName: 'John Doe',
    //         userImage: "https://randomuser.me/api/portraits/men/3.jpg",
    //         caption: 'Are you ready to take the next step in your reidExtreme 3.0 journey? The reidExtreme 3.0 is the perfect opportunity for students to explore potential career paths, network with industry professionals, and discover exciting job and internship opportunities',
    //         image: launchImage,
    //         link: 'Register now',
    //         status: 'pending',
    //     },
    //     {
    //         position: 'President',
    //         userName: 'Veron',
    //         userImage: "https://randomuser.me/api/portraits/men/2.jpg",
    //         caption: 'While possessing knowledge is all well and good, if you have not the wisdom to wield it to your advantage, it becomes about as useful as soot. All but removing probability, one should not only be able to calculate every way forward, but should also be well-versed enough to choose the best path.Piqued your interest? Read further here - https://www.britannica.com/science/game-theory Register your team for ReidXtreme by visiting ',
    //         image: reid3Image,
    //         link: 'http://reidxtreme.ucscieee.com/',
    //         status: 'approved',
    //     }, 
    //     {
    //         position: 'OC',
    //         userName: 'Sarah',
    //         userImage: "https://randomuser.me/api/portraits/women/7.jpg",
    //         caption: 'Are you ready to take the next step in your reidExtreme 3.0 journey? The reidExtreme 3.0 is the perfect opportunity for students to explore potential career paths, network with industry professionals, and discover exciting job and internship opportunities',
    //         image: speakerImage,
    //         link: 'Register now',
    //         status: 'pending',
    //     },
    //     {
    //         userName: 'Jane Smith',
    //         userImage: "https://randomuser.me/api/portraits/men/9.jpg",
    //         caption: 'Had a great time at the conference today!',
    //         image: null,
    //         link: null,
    //         status: 'approved',
    //     },
    //     {
    //         position: 'Treasurer',
    //         userName: 'David Brown',
    //         userImage: "https://randomuser.me/api/portraits/men/10.jpg",
    //         caption: 'Our budget meeting was insightful. Thank you to all who participated!',
    //         image: null,
    //         link: null,
    //         status: 'rejected',
    //     }
    // ];

    const [eventPosts, setEventPosts] = useState([]);

    useEffect(() => {

        const fetchEventPosts = async () => {
            try{
                const token = localStorage.getItem('token');
                const response = await EventPostService.getAllEventPosts(token);
                const eventPostsArray = response.content.filter(post => post.event_id === event.event_id) || [];
                console.log("all event posts", eventPostsArray);
                setEventPosts(eventPostsArray);
    
            }catch(error){
                console.error("Error fetching event posts", error);
            }

        }

        fetchEventPosts();

      
    }, [])


    return (
        <NewsFeed posts={eventPosts} setEventPosts = {setEventPosts} event = {event}/>
    );
};

export default App;

