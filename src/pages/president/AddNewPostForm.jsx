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
// import { useNavigate, useParams } from "react-router-dom";
// import PostService from "../../service/PostService";

// const AddNewPostForm = () => {

//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [name, setName] = useState("");
//   const [position, setPosition] = useState("");
//   const [description, setDescription] = useState("");
//   const [postStatus, setPostStatus] = useState('PENDING');
//   const [postImage, setPostImage] = useState(null);
//   const [postImageUrl, setPostImageUrl] = useState(null);
//   const [errors, setErrors] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   //club id
//   //published user id

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedImage(URL.createObjectURL(e.target.files[0]));
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

//       }else{
//         console.log("User details are undefined or null");
//       }
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {

//     fetchPostDetails();


//   }, [])


//   return (
//     <>
//       <div className="fixed inset-0 flex flex-col md:flex-row">
//         <Sidebar className="flex-shrink-0 w-full md:w-auto" />
//         <div className="flex flex-col flex-1 overflow-auto">
//           <Navbar className="sticky top-0 z-10 p-4" />
//           <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-auto p-4 md:p-10">
//             <div className="flex flex-col items-center justify-center relative mt-10 w-full">
//               <div className="bg-[#AEC90A] text-[#0B0B0B] p-1 rounded-lg font-semibold absolute -top-4">
//                 Add a New Post
//               </div>
//               <div className="bg-[#0B0B0B] flex flex-col items-center justify-center border-2 border-[#AEC90A] rounded-xl w-full md:w-3/5 py-9">
//                 <form action="" className="w-full px-4 md:px-2">
//                   {/* Personal Information */}
//                   <div className="flex flex-col gap-3">
//                     <label htmlFor="name" className="text-white">
//                       Name
//                     </label>
//                     <input
//                       id="name"
//                       value={name}
//                       type="text"
//                       placeholder="Kamal Perera"
//                       className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
//                     />
//                   </div>
                  
//                   {/* Position Information */}
//                   <div className="flex flex-col gap-3 mt-5">
//                     <label htmlFor="position" className="text-white">
//                       Position
//                     </label>
//                     <input
//                       id="position"
//                       value={position}
//                       type="text"
//                       placeholder="Secretary"
//                       className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
//                     />
//                   </div>
                
//                   {/* Description */}
//                   <div className="flex flex-col gap-3 mt-5">
//                     <label htmlFor="description" className="text-white">
//                       Description*
//                     </label>
//                     <textarea
//                       id="description"
//                       value={description}
//                       placeholder="Description"
//                       className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
//                     ></textarea>
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
//                     {selectedImage && (
//                       <img
//                         src={selectedImage}
//                         alt="Selected"
//                         className="mt-3 max-h-50"
//                       />
//                     )}
//                   </div>

//                   <div className="flex items-center justify-center mt-6 gap-4">
//                     <Button className="border-2 border-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#AEC90A]">
//                       Cancel
//                     </Button>
//                     <Button className="bg-[#AEC90A] border-2 border-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#0B0B0B]">
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

// export default AddNewPostForm;

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
import { useNavigate, useParams } from "react-router-dom";
import PostService from "../../service/PostService";

const AddNewPostForm = () => {

  const navigate = useNavigate();
  const { id } = useParams(); //post id

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [postStatus, setPostStatus] = useState('PENDING');
  const [postImage, setPostImage] = useState(null);
  const [postImageUrl, setPostImageUrl] = useState(null);
  const [errors, setErrors] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  //club id
  //published user id

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      //setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setPostImage(e.target.files[0]);
    }
  };

  const currentUserDetails = async () => {
    const session_id = localStorage.getItem("session_id");
    const token = localStorage.getItem("token");
    const userDetails = await UsersService.getUserById(session_id, token);
    //console.log("uuser details in post", userDetails);
    const { users } = userDetails;
    if(users){
      setName(users.firstname + " " + users.lastname);
      setPosition(users.role);

    }else{
      console.log("User details are undefined or null");
    }
   

  }

  const fetchPostDetails = async () => {
    if (id) {
      try {
        const token = localStorage.getItem('token');
        const response = await PostService.getPostById(id, token);
        console.log('Response getPosts:', response); 
        const { content } = response; 
        if (content) {
          setName(content.name || '');
          setPosition(content.position || '');
          setDescription(content.description || '');
          setPostStatus(content.post_status || 'PENDING');
          setPostImageUrl(content.post_image || '');
         
        } else {
          console.warn('Content is undefined or null');
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching post details:", error);
        setErrors("Failed to fetch post details");
        setIsLoading(false);
      }
    } else {
      const session_id = localStorage.getItem("session_id");
      const token = localStorage.getItem("token");
      const userDetails = await UsersService.getUserById(session_id, token);
      //console.log("uuser details in post", userDetails);
      const { users } = userDetails;
      if(users){
        setName(users.firstname + " " + users.lastname);
        setPosition(users.role);

      }else{
        console.log("User details are undefined or null");
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {

    fetchPostDetails();


  }, [])

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
        case "name":
            if (!value) error = "Name is required.";
            break;
        case "position":
            if (!value) error = "Position is required.";
            break;
        case "description":
            if (!value) error = "Description is required.";
            break;
        case "postImage":
          if (!value && !postImageUrl) error = "Post Image is required.";
          break;
        default:
            break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
};

useEffect(() => {
    if (isSubmitted) {
      validateField("name", name);
    }
}, [name]);

useEffect(() => {
    if (isSubmitted) {
      validateField("position", position);
    }
}, [position]);

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

  validateField("name", name);
  validateField("position", position);
  validateField("description", description);
  validateField("postImage", postImage);
  

  if (Object.values(errors).every((error) => error === "") && Object.values({
      name,
      position,
      description,
      postImage
     
    }).every((field) => field !== "" || postImageUrl)) {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("data", new Blob([JSON.stringify({
          name,
          position,
          description,
          postStatus,
          //club id
          //published user id
         
        })], { type: "application/json" }));

      if (postImage) {
        formData.append("file", postImage);
      }

      if (id) {
        const response = await PostService.updatePost(
          id,
          name,
          position,
          description,
          postImage,
          postStatus,
          //club id,
          //published user id,
          token
        );
        alert("Post updated successfully");
        console.log("Post updated:", response);
        navigate(-1);

      } else {
        const response = await PostService.savePost(
          name,
          position,
          description,
          postImage,
          postStatus,
          //club id,
          //published user id,
          token
        );
        alert("Sponsor added successfully");
        console.log("Sponsor added:", response);
        navigate("/president/club");
      }
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
    return "Update Post";
  } else {
    return "Create a Post";
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
            <div className="flex flex-col items-center justify-center relative mt-10 w-full">
              <div className="bg-[#AEC90A] text-[#0B0B0B] p-1 rounded-lg font-semibold absolute -top-4">
                {pageTitle()}
              </div>
              <div className="bg-[#0B0B0B] flex flex-col items-center justify-center border-2 border-[#AEC90A] rounded-xl w-full md:w-3/5 py-9">
                <form onSubmit={handleSubmit} className="w-full px-4 md:px-2">
                  {/* Personal Information */}
                  <div className="flex flex-col gap-3">
                    <label htmlFor="name" className="text-white">
                      Name
                    </label>
                    <input
                      id="name"
                      value={name}
                      type="text"
                      placeholder="Kamal Perera"
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    />
                    {isSubmitted && errors.name && <div className="text-red-500">{errors.name}</div>}
                  </div>
                  
                  {/* Position Information */}
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="position" className="text-white">
                      Position
                    </label>
                    <input
                      id="position"
                      value={position}
                      type="text"
                      placeholder="Secretary"
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    />
                    {isSubmitted && errors.position && <div className="text-red-500">{errors.position}</div>}
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
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    ></textarea>
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
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    />
                    {postImage && (
                      <img
                        src={postImage}
                        alt="Selected"
                        className="mt-3 max-h-50"
                      />
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
    </>
  );
};

export default AddNewPostForm;

