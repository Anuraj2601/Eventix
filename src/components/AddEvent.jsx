/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Button } from '@material-tailwind/react';

const AddEvent = () => {
  return (

    <div className="fixed inset-0 flex">
    <Sidebar className="flex-shrink-0" />
    <div className="flex flex-col flex-1">
      <Navbar className="sticky top-0 z-10 p-4" />
      <div className="bg-neutral-900 flex-1 text-white flex flex-col overflow-hidden">
       
      

     <form>
      <div className="flex justify-center items-center flex-col ml-20 mr-20 mt-10 border-2 rounded-3xl border-lime-400 space-y-12">
        
      <Button
        className="flex justify-center items-center gap-2 w-96 bg-[#AEC90A] h-10 mr-0 mt-2 ml-[30px]  pl-5 pr-5 rounded-2xl text-black font-medium text-sm" variant="gradient"
      >
        
        Create New Event
      </Button>
        <div className="border-b border-gray-900/10 w-full pl-4 pr-4">
         {/*  <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}

          <div className="mt-4 grid  gap-x-8 gap-y-8 md:grid-cols-9">
            <div className="sm:col-span-4">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-white">
                Name of the Event
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  placeholder='Enter Event Name'
                  className="block w-full rounded-md border-2 border-[#AEC90A] py-1.5 bg-[#171717] text-white shadow-sm ring-1 ring-inset placeholder:text-[#414141] focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-5">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-white">
                Budget
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  placeholder='000,000'
                  className="block w-full rounded-md border-2 border-[#AEC90A] bg-[#171717] py-1.5 text-white shadow-sm ring-1 ring-inset placeholder:text-[#414141] focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="date" className="block text-sm font-medium leading-6 text-white">
                Tentative Date
              </label>
              <div className="mt-2">
                <input
                  id="date"
                  name="date"
                  type="datetime-local"
                  autoComplete="date"
                  className="block w-auto rounded-md border-2 border-[#AEC90A] py-1.5 bg-[#171717] text-white shadow-sm ring-1 ring-inset placeholder:text-[#414141] focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="col-span-full">
          <label for="about" class="block text-sm font-medium leading-6 text-white">Description</label>
          <div class="mt-2">
            <textarea id="about" name="about" placeholder='Description of Event' rows="3" className="block w-full rounded-md  border-2 border-[#AEC90A] bg-[#171717] py-1.5 text-white shadow-sm ring-1 ring-inset  placeholder:text-[#414141] focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"></textarea>
          </div>
         
        </div>

           {/*  <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-white">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-2 border-[#AEC90A] py-1.5 bg-[#171717] text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div> */}

           

            {/* <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-white">
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-2 border-[#AEC90A] py-1.5 bg-[#171717] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}

            {/* <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-white">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="region"
                  name="region"
                  type="text"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-2 border-[#AEC90A] bg-[#171717] py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}

            {/* <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-white">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  id="postal-code"
                  name="postal-code"
                  type="text"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-2 border-[#AEC90A] py-1.5 bg-[#171717] text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}
          </div>
        </div>

        <div className="flex justify-center gap-8 items-center mb-4 m:col-span-2 sm:col-start-1 pb-4">
        <Button type="button" className="text-sm h-10 pl-5 pr-5 rounded-2xl font-medium leading-6 text-white bg-[#171717] border-2 border-[#AEC90A]">
          Cancel
        </Button>
        <Button
        className="flex items-center bg-[#AEC90A] h-10 pl-5 pr-5 rounded-2xl text-black font-medium text-sm" variant="gradient"
       
      >
        
        Create
      </Button>
      </div>

        </div>

      
    </form> 

    
</div>
    </div>
  </div>
  
  )
}

export default AddEvent;

