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

const AddNewPostForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
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

  useEffect(() => {

    currentUserDetails();


  }, [])


  return (
    <>
      <div className="fixed inset-0 flex flex-col md:flex-row">
        <Sidebar className="flex-shrink-0 w-full md:w-auto" />
        <div className="flex flex-col flex-1 overflow-auto">
          <Navbar className="sticky top-0 z-10 p-4" />
          <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-auto p-4 md:p-10">
            <div className="flex flex-col items-center justify-center relative mt-10 w-full">
              <div className="bg-[#AEC90A] text-[#0B0B0B] p-1 rounded-lg font-semibold absolute -top-4">
                Add a New Post
              </div>
              <div className="bg-[#0B0B0B] flex flex-col items-center justify-center border-2 border-[#AEC90A] rounded-xl w-full md:w-3/5 py-9">
                <form action="" className="w-full px-4 md:px-2">
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
                  </div>
                
                  {/* Description */}
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="description" className="text-white">
                      Description*
                    </label>
                    <textarea
                      id="description"
                      placeholder="Description"
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    ></textarea>
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
                    {selectedImage && (
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className="mt-3 max-h-50"
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-center mt-6 gap-4">
                    <Button className="border-2 border-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#AEC90A]">
                      Cancel
                    </Button>
                    <Button className="bg-[#AEC90A] border-2 border-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#0B0B0B]">
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

