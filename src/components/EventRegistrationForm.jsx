import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from "@material-tailwind/react";

const EventRegistrationForm = () => {
  const location = useLocation();
  const { eventName } = location.state || { eventName: "Event" };

  return (
    <div className="flex-1 overflow-y-auto  ">
      <div className="flex flex-col items-center justify-center  rounded-xl w-full ">
        <h2 className="text-white text-2xl mb-6">Register Now for the {eventName}</h2>
        <form action="">
          <div className="grid gap-x-10 gap-y-6 mb-6 md:grid-cols-2">
          <div className="flex flex-col space-y-2">
              <label htmlFor="Name" className="text-lg font-semibold">Full Name</label>
              <input type="text" placeholder='Kokulrajh Sivarasa'                 className="p-2 bg-black text-white rounded"
/>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="Name" className="text-lg font-semibold">Email Address</label>
              <input type="text" placeholder='2021is013@stu.ucsc.cmb.ac.lk'   className="p-2 bg-black text-white font-bold"/>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="">Register No</label>
              <input type="text" placeholder='2021cs100'   className="p-2 bg-black text-white rounded"/>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="">Mobile Number</label>
              <input type="number" placeholder='0712345416'   className="p-2 bg-black text-white rounded"/>
            </div>
          </div>
          <div className="flex flex-col items-center mt-9 gap-3">
            <label htmlFor="">Why you are participating?</label>
            <input type="text" placeholder='Why you are participating ?...'   className="p-2 bg-black text-white rounded" />
          </div>
          <div className="flex items-center justify-center mt-6 gap-4">
            <Button className='border-2 border-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#AEC90A]'>Clear Form</Button>
            <Button className='bg-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#0B0B0B]'>Register</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventRegistrationForm;
