import React from 'react'
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Badge, Button } from "@material-tailwind/react";
import { Radio } from "@material-tailwind/react";

const AddNewAnnouncementForm = () => {
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
                        
                        <form action="">
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col gap-3 w-96">
                            <label htmlFor="">Title</label>
                            <input type="text" placeholder='General Meeting' className='block p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'/>
                            </div>
                            <div className="flex flex-col gap-3  w-96">
                            <label htmlFor="">Content</label>
                            <input type="text" placeholder='A meeting will be held...' className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'/>
                            </div>
                            <div className="flex flex-col gap-3  w-96">
                            <label htmlFor="">Announcement Type</label>
                            <div className="flex gap-10">
                                <Radio name="type" label="Public" className="checked:bg-primary checked:border-primary" defaultChecked/>
                                <Radio name="type" label="Only Members" className='checked:bg-primary checked:border-primary'  />
                            </div>
                            </div>
                           
                        </div>
                        
                        <div className="flex items-center justify-center mt-6 gap-4">
                            <Button className='border-2 border-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#AEC90A]'>Clear Form</Button>
                            <Button className='bg-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#0B0B0B]'>Add</Button>
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