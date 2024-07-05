import React from 'react'

import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { MdSend } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";

const LeaveModal = ({open, handleOpen, children}) => {
  if(!open) return null

  return (
      <>
       <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none font-[poppins]"
          
        >
          
          <Card className="mx-auto w-full max-w-[24rem]">
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
                  <Input type="text" label="Type your reason" size='lg'required/>
                  <MdSend className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"/>
              </div>
              {/* {console.log(children)} */}

              {/* <Input label="Type your reason" size="lg" className='relative'/>
              <MdSend className='absolute '/> */}
              
            </CardBody>
            
          </Card>
        </Dialog>
      </>
       
  );
}

export default LeaveModal