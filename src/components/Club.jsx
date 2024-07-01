import React, { useState } from 'react';
import { Card, CardBody, Typography, Avatar} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { MdSend } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
// import LeaveModal from './LeaveModal';
import {
  Dialog,
  Input,

} from "@material-tailwind/react";


const Club = () => {

 
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    const clubs = [
        {
            id: "1",
            name: "IEEE Student Group",
            image:
                "src/assets/clubs/ieee.png",
        },
        {
            id: "2",
            name: "ISACA Student Group",
            image:
                "src/assets/clubs/isaca.png",
        },
        {
            id: "3",
            name: "Gavel Club (Public Speaking and Leadership)",
            image:
                "src/assets/clubs/gavel.png",
        },
        {
            id: "4",
            name: "Pahasara Club (Innovation and Creativity)",
            image:
                "src/assets/clubs/pahasara.png",
        },
        {
            id: "5",
            name: "Rotaract Club of UCSC",
            image:
                "src/assets/clubs/rotaract.png",
        },
      ];


  return (

    <>
    
        <Card className="w-full bg-neutral-900">
            
            <CardBody>
                <div className="">
                {clubs.map(({ name, image }, index) => (
                    <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-xl mb-4"
                    >
                        <div className="flex items-center gap-x-3">
                            <Avatar size="sm" src={image} alt={name} className='border-2 border-white rounded-md w-10 h-10'/>
                            <div>
                            <Typography color="blue-gray" variant="h6">
                                {name}
                            </Typography>
                            </div>
                        </div>
                        <div className="flex flex-row gap-4"> 
                            <Button className='bg-white pt-1 pb-1 pl-5 pr-5 rounded-2xl text-black font-medium text-sm' onClick={handleOpen}>Leave</Button>
                            <Button className='bg-[#AEC90A] pt-1 pb-1 pl-5 pr-5 rounded-2xl text-black font-medium text-sm'>Explore</Button>
                            
                            {/* {console.log(isModalOpen)} */}
                           
                            
                        </div>
                    </div>
                ))}
                </div>
                {/* {open && <LeaveModal open={open} handleOpen={handleOpen}/>} */}
                {/* <LeaveModal open={open} handleOpen={handleOpen}>
                  fancy modal
                </LeaveModal> */}
                
            </CardBody>
        </Card>
        

      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent w-screen h-screen bg-opacity-30 backdrop-blur-sm flex items-center"
      >
        <Card className="mx-auto w-full max-w-[24rem] p-3">
            <IoIosCloseCircle className='absolute text-xl top-1 right-1 cursor-pointer' onClick={handleOpen}/>
            <CardBody className="flex flex-col">
              <Typography
                className="mb-3 font-normal font-[poppins]"
                variant="paragraph"
                color="gray"
              >
                Why are you Leaving, Let us know your problem ?
              </Typography>
              
              <div className="relative">
                  <Input type="text" size='lg' className='h-16 border-2 bg-slate-100' placeholder='Type your reason' variant="label-hidden" required/>
                  <MdSend className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"/>
              </div>
             

              {/* <Input label="Type your reason" size="lg" className='relative'/>
              <MdSend className='absolute '/> */}
              
            </CardBody>
            
          </Card>
      </Dialog>
     
        
    </>
  );
}

export default Club