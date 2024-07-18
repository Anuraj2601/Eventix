import React from 'react'
import { Button } from "@material-tailwind/react";

const EventRegistrationForm = () => {
  return (
    <div className='flex flex-col items-center justify-center relative'>
      <div className='bg-[#AEC90A] text-[#0B0B0B] p-1 rounded-lg font-semibold absolute -top-4'>Event Registration Form</div>
      <div className="bg-[#0B0B0B] flex flex-col items-center justify-center border-2 border-[#AEC90A] rounded-xl w-3/5 py-9">
        
        <form action="">
          <div className="grid gap-x-10 gap-y-6 mb-6 md:grid-cols-2">
            <div className="flex flex-col gap-3 w-80">
              <label htmlFor="">Full Name</label>
              <input type="text" placeholder='Kokulrajh Sivarasa' className='block p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'/>
            </div>
            <div className="flex flex-col gap-3 w-80">
              <label htmlFor="">Email Address</label>
              <input type="text" placeholder='kokularajh32@gmail.com' className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'/>
            </div>
            <div className="flex flex-col gap-3 w-80">
              <label htmlFor="">Register No</label>
              <input type="text" placeholder='2021cs100' className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'/>
            </div>
            <div className="flex flex-col gap-3 w-80">
              <label htmlFor="">Mobile Number</label>
              <input type="text" placeholder='0712345416' className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'/>
            </div>
          </div>
          <div className="flex flex-col items-center mt-9 gap-3">
          <label htmlFor="">Why you are participating?</label>
            <input type="text" placeholder='Why you are participating ?...' className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] w-full h-24' />
          </div>
          <div className="flex items-center justify-center mt-6 gap-4">
            <Button className='border-2 border-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#AEC90A]'>Clear Form</Button>
            <Button className='bg-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#0B0B0B]'>Register</Button>
          </div>

        </form>

      </div>
     
    </div>
  )
}

export default EventRegistrationForm