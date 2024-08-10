import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
import "../../css/DateTimePicker.css";
import DatePicker from "react-datepicker";

const NewElectionForm = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const [electionName, setElectionName] = useState('');
  const [appOpens, setAppOpens] = useState('');
  const [appCloses, setAppCloses] = useState('');
  const [votingOpens, setVotingOpens] = useState('');
  const [votingCloses, setVotingCloses] = useState('');


 function pageTitle() {
    if (id) {
      return "Update Election";
    } else {
      return "Create a New Election";
    }
  }

  const handleCancel = () => {
    navigate(-1);

  }

  return (
    <>
      <div className="fixed inset-0 flex">
        <Sidebar className="hidden md:flex flex-shrink-0" />
        <div className="flex flex-col flex-1">
          <Navbar className="sticky top-0 z-10 p-4" />
          <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-hidden">
            <div className="flex flex-col items-center justify-center relative mt-10 px-4 md:px-10">
              <div className="bg-[#AEC90A] text-[#0B0B0B] p-1 rounded-lg font-semibold absolute -top-4">
                {pageTitle()}
              </div>
              <div className="bg-[#0B0B0B] flex flex-col items-center justify-center border-2 border-[#AEC90A] rounded-xl w-full max-w-3xl py-9">
                <form action="" className="w-full px-4">
                  <div className="flex flex-col gap-3">
                    <label htmlFor="electionFor" className="text-white">
                      Election For *
                    </label>
                    <input
                      id="electionFor"
                      value={electionName}
                      onChange={(e) => setElectionName(e.target.value)}
                      type="text"
                      placeholder="Club Board of 24/25"
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="candidatesOpen" className="text-white">
                      Candidate Applications open (time duration) *
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <DatePicker
                          selected={appOpens}
                          onChange={e => setAppOpens(e)}
                          minDate={new Date()}
                          showTimeSelect
                          timeFormat="hh:mm"
                          dateFormat="Pp"
                          className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'
                      
                      />
                      {/* <input
                        id="candidatesOpenFrom"
                        name="candidatesOpenFrom"
                        type="datetime-local"
                        autoComplete="candidatesOpenFrom"
                        className="block w-full sm:w-auto rounded-md border-2 border-[#AEC90A] py-1.5 bg-[#171717] text-white shadow-sm ring-1 ring-inset placeholder:text-[#414141] focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                      /> */}
                      <span className="text-white">to</span>
                      <DatePicker
                          selected={appCloses}
                          onChange={e => setAppCloses(e)}
                          minDate={new Date()}
                          showTimeSelect
                          timeFormat="hh:mm"
                          dateFormat="Pp"
                          className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'
                      
                      />
                      {/* <input
                        id="candidatesOpenTo"
                        name="candidatesOpenTo"
                        type="datetime-local"
                        autoComplete="candidatesOpenTo"
                        className="block w-full sm:w-auto rounded-md border-2 border-[#AEC90A] py-1.5 bg-[#171717] text-white shadow-sm ring-1 ring-inset placeholder:text-[#414141] focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                      /> */}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="votingsOpen" className="text-white">
                      Votings Open (time duration) *
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <DatePicker
                          selected={votingOpens}
                          onChange={e => setVotingOpens(e)}
                          minDate={new Date()}
                          showTimeSelect
                          timeFormat="hh:mm"
                          dateFormat="Pp"
                          className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'
                      
                      />
                      {/* <input
                        id="votingsOpenFrom"
                        name="votingsOpenFrom"
                        type="datetime-local"
                        autoComplete="votingsOpenFrom"
                        className="block w-full sm:w-auto rounded-md border-2 border-[#AEC90A] py-1.5 bg-[#171717] text-white shadow-sm ring-1 ring-inset placeholder:text-[#414141] focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                      /> */}
                      <span className="text-white">to</span>
                      <DatePicker
                          selected={votingCloses}
                          onChange={e => setVotingCloses(e)}
                          minDate={new Date()}
                          showTimeSelect
                          timeFormat="hh:mm"
                          dateFormat="Pp"
                          className='p-3 border-2 border-[#AEC90A] bg-[#0B0B0B]'
                      
                      />
                      {/* <input
                        id="votingsOpenTo"
                        name="votingsOpenTo"
                        type="datetime-local"
                        autoComplete="votingsOpenTo"
                        className="block w-full sm:w-auto rounded-md border-2 border-[#AEC90A] py-1.5 bg-[#171717] text-white shadow-sm ring-1 ring-inset placeholder:text-[#414141] focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                      /> */}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center mt-6 gap-4">
                    <Button onClick={handleCancel} className="border-2 border-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#AEC90A]" >
                      Cancel
                    </Button>
                    <Button className="bg-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#0B0B0B]">
                      Create
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

export default NewElectionForm;


