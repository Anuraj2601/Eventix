import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
} from "@material-tailwind/react";
// import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { HiChevronDown } from "react-icons/hi";
import UsersService from "../../service/UsersService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PostService from "../../service/PostService";
import EventPostService from "../../service/EventPostService";

const NewEventPost = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); //post id
  const { event } = location.state || {};

  console.log('event in event posts form', event);

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postStatus, setPostStatus] = useState('PENDING');
  const [postImage, setPostImage] = useState(null);
  const [postImageUrl, setPostImageUrl] = useState(null);
  const [clubId, setClubId] = useState('');
  const [publishedUserId, setPublishedUserId] = useState('');
  const [eventId, setEventId] = useState('');

  const [errors, setErrors] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAddSuccessPopup, setShowAddSuccessPopup] = useState(false);
  const [showUpdateSuccessPopup, setShowUpdateSuccessPopup] = useState(false);
  //club id
  //published user id

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      //setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setPostImage(e.target.files[0]);
    }
  };

  const handleClosePopup = () => {
    setShowAddSuccessPopup(false);
  };

  const handleClosePopup1 = () => {
    setShowUpdateSuccessPopup(false);
  };

  const currentUserDetails = async () => {
    const session_id = localStorage.getItem("session_id");
    const token = localStorage.getItem("token");
    const userDetails = await UsersService.getUserById(session_id, token);
    //console.log("uuser details in post", userDetails);
    const { users } = userDetails;
    if(users){
      setName(users.firstname + " " + users.lastname);
      

    }else{
      console.log("User details are undefined or null");
    }
   

  }

  const fetchPostDetails = async () => {
   
      const session_id = localStorage.getItem("session_id");
      const token = localStorage.getItem("token");
      const userDetails = await UsersService.getUserById(session_id, token);
      //console.log("uuser details in post", userDetails);
      const { users } = userDetails;
      if(users){
        setName(users.firstname + " " + users.lastname);
        setPostStatus('PENDING');
        setClubId(event.clubId);
        setPublishedUserId(session_id);
        setEventId(event.event_id);

      }else{
        console.log("User details are undefined or null");
      }
      setIsLoading(false);
    
  };

  
  useEffect(() => {

    fetchPostDetails();


  }, [])

  const validateField = (field, value) => {
    let error = "";
    let maxCharlength = 255;
    switch (field) {
        case "name":
            if (!value){
              error = "Name is required.";
            }else if(value.length > maxCharlength){
              error = `Name cannot exceed ${maxCharlength} characters.`;
            }
            break;
        case "title":
            if (!value){
              error = "title is required.";
            }else if(value.length > maxCharlength){
              error = `Title cannot exceed ${maxCharlength} characters.`;
            }
            break;
        case "description":
            if (!value){
              error = "Description is required.";
            }else if(value.length > maxCharlength){
              error = `Description cannot exceed ${maxCharlength} characters.`;
            }
            break;
        case "postImage":
          if (!value && !postImageUrl) error = "Post Image is required.";
          break;
        default:
            break;
    }
    //setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    return error;
  };

useEffect(() => {
    if (isSubmitted) {
      validateField("name", name);
    }
}, [name]);

useEffect(() => {
    if (isSubmitted) {
      validateField("title", title);
    }
}, [title]);

useEffect(() => {
    if (isSubmitted) {
      validateField("description", description);
    }
}, [description]);

useEffect(() => {
  if (isSubmitted) {
    validateField("postImage", postImage);
  }
}, [postImage]);


const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitted(true);

 

  // Perform synchronous validation and store errors locally
  const newErrors = {
    name: validateField("name", name),
    title: validateField("title", title),
    description: validateField("description", description),
    postImage: validateField("postImage", postImage),
  };

  setErrors(newErrors); // Update errors state at once

  // If there are validation errors, prevent form submission
  if (Object.values(newErrors).some((error) => error !== "")) {
    console.log("Form has errors:", newErrors);
    return;
  }

  // Proceed if no validation errors
  if (Object.values({
      name,
      title,
      description,
      postImage
    }).every((field) => field !== "" || postImageUrl)) {
    
    try {
      const token = localStorage.getItem("token");
      const session_id = localStorage.getItem("session_id");
      setPublishedUserId(session_id);
      const formData = new FormData();

      formData.append("data", new Blob([JSON.stringify({
        name,
        title,
        description,
        postStatus,
        clubId,
        publishedUserId
      })], { type: "application/json" }));

      if (postImage) {
        formData.append("file", postImage);
      }

        const response = await EventPostService.saveEventPost(
          title,
          description,
          postImage,
          postStatus,
          clubId,
          publishedUserId,
          eventId,
          token
        );

        setShowAddSuccessPopup(true);
        //alert("Post added successfully");
        setTimeout(() => {
          navigate(-1);
        }, 2000);
        
      
    } catch (error) {
      console.error("Error processing Post:", error);
      const errorMessages = error.response
        ? error.response.data.errors
        : { global: error.message };
      setErrors(errorMessages);
      setTimeout(() => setErrors({}), 5000);
    }
  }

  

};


function pageTitle() {
  if (id) {
    return "Update Event Post";
  } else {
    return "Create Event Post";
  }
}

const handleCancel = () => {
  navigate(-1);

}




  return (
    <>
      <div className="fixed inset-0 flex flex-col md:flex-row">
        <Sidebar className="flex-shrink-0 w-full md:w-auto" />
        <div className="flex flex-col flex-1 overflow-auto">
          <Navbar className="sticky top-0 z-10 p-4" />
          <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-auto p-4 md:p-10">
          <div className=" bg-opacity-90 text-white flex-col md:p-20 overflow-y-auto">
                                 <Typography variant="h3" className="mb-4 text-center"> {pageTitle()}</Typography>

                                 <div className="grid grid-cols-1 gap-4">
                <form onSubmit={handleSubmit} className="w-full px-4 md:px-2">
                  {/* Personal Information */}
                  <div className="flex flex-col gap-3">
                    <label htmlFor="name"                               className="block "
>
                      Name
                    </label>
                    <input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Kamal Perera"
                      className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                                
                      style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}                      readOnly
                    />
                    {isSubmitted && errors.name && <div className="text-red-500">{errors.name}</div>}
                  </div>
                  
                  {/* Position Information */}
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="position" className="text-white">
                      Title
                    </label>
                    <input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      placeholder="Title"
                      className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                                
                      style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}            
                                          
                    />
                    {isSubmitted && errors.title && <div className="text-red-500">{errors.title}</div>}
                  </div>
                
                  {/* Description */}
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="description" className="text-white">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      placeholder="Description"
                      onChange={(e) => setDescription(e.target.value)}
 className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                                
                      style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}                    ></textarea>
                    {isSubmitted && errors.description && <div className="text-red-500">{errors.description}</div>}
                  </div>

                  {/* Image Upload */}
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="image" className="text-white">
                      Upload Image
                    </label>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
 className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                                
                      style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}                    />
                    {/* {postImage && (
                      <img
                        src={postImage}
                        alt="Selected"
                        className="mt-3 max-h-50"
                      />
                    )} */}
                    {!postImage && postImageUrl ? ( // Show existing file if not replaced
                      <div className="mt-2">
                        <p className="text-white">Existing file:</p>
                        <img
                          src={postImageUrl}
                          alt="Existing Logo"
                          className="mt-2 w-32 h-32 object-cover rounded"
                        />
                      </div>
                    ) : (
                      postImage && (
                        <div className="mt-2">
                          <p className="text-white">Selected file: {postImage.name}</p>
                          <img
                            src={URL.createObjectURL(postImage)}
                            alt="Preview"
                            className="mt-2 w-32 h-32 object-cover rounded"
                          />
                        </div>
                      )
                    )}
                    {isSubmitted && errors.postImage && <div className="text-red-500">{errors.postImage}</div>}
                  </div>

                  <div className="flex items-center justify-center mt-6 gap-4">
                    <Button onClick={handleCancel} className="border-2 border-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#AEC90A]">
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-[#AEC90A] border-2 border-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#0B0B0B]">
                      Post
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddSuccessPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-dark-500 opacity-50"></div>
          <div className="bg-white w-[27vw] h-[20vh] p-8 rounded-lg text-center relative transition-transform duration-300 ease-in-out transform hover:scale-105">
            <span
              className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center cursor-pointer text-white text-[22px] font-medium hover:bg-dark-400"
              onClick={handleClosePopup}
            >
              &times;
            </span>
            <h2 className="text-[20px] font-semibold text-primary mt-4 mb-2">
               Event Post created successfully
            </h2>
          </div>
        </div>
      )}

      {showUpdateSuccessPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-dark-500 opacity-50"></div>
          <div className="bg-white w-[27vw] h-[20vh] p-8 rounded-lg text-center relative transition-transform duration-300 ease-in-out transform hover:scale-105">
            <span
              className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center cursor-pointer text-white text-[22px] font-medium hover:bg-dark-400"
              onClick={handleClosePopup1}
            >
              &times;
            </span>
            <h2 className="text-[20px] font-semibold text-primary mt-4 mb-2">
               Event Post updated successfully
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default NewEventPost;

