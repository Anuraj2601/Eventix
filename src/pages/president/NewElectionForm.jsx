import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
import "../../css/DateTimePicker.css";
import DatePicker from "react-datepicker";
import ElectionService from '../../service/ElectionService';

const NewElectionForm = () => {

  const navigate = useNavigate();

  const { id } = useParams(); //election ID
  const location = useLocation();

  const [electionName, setElectionName] = useState('');
  const [appOpens, setAppOpens] = useState(null);
  const [appCloses, setAppCloses] = useState(null);
  const [votingOpens, setVotingOpens] = useState(null);
  const [votingCloses, setVotingCloses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState('');
  const [showAddSuccessPopup, setShowAddSuccessPopup] = useState(false);
  const [showUpdateSuccessPopup, setShowUpdateSuccessPopup] = useState(false);

  const { club } = location.state || {};
  //console.log('club in election form', club);

  // const toUTC = (date) => {
  //   // Get the local time zone offset in milliseconds
  //   const offset = date.getTimezoneOffset() * 60000;
    
  //   // Return the UTC date adjusted from local time
  //   return new Date(date.getTime() + offset);
  // };
  
  
  // const fromUTC = (dateArray) => {
  //   // Create a Date object from the UTC date array
  //   const date = new Date(Date.UTC(...dateArray));
    
  //   // Get the local time zone offset in milliseconds
  //   const offset = date.getTimezoneOffset() * 60000;
    
  //   // Return the local date adjusted from UTC
  //   return new Date(date.getTime() - offset);
  // };
  
  const handleClosePopup = () => {
    setShowAddSuccessPopup(false);
  };

  const handleClosePopup1 = () => {
    setShowUpdateSuccessPopup(false);
  };

  const toUTC = (date) => {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + offset);
  };

  const fromUTC = (dateArray) => {
    const date = new Date(Date.UTC(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]));
    //const date = new Date(Date.UTC(...dateArray));
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset);
  };



  useEffect(() =>{

    const fetchElectionDetails = async () => {

      if(id){

        try{

          const token = localStorage.getItem('token');
          const response = await ElectionService.getElectionById(id, token);
          console.log('Response getElectionbyID:', response); 
          const { content } = response; 
          if(content){
            setElectionName(content.election_name || '');
            // const formattedAppOpens = content.appOpens ? `${content.appOpens[0]}-${String(content.appOpens[1]).padStart(2, '0')}-${String(content.appOpens[2]).padStart(2, '0')}, ${String(content.appOpens[3]).padStart(2, '0')}:${String(content.appOpens[4]).padStart(2, '0')}` : '';
            // setAppOpens(formattedAppOpens);
            // const formattedAppCloses = content.appCloses ? `${content.appCloses[0]}-${String(content.appCloses[1]).padStart(2, '0')}-${String(content.appCloses[2]).padStart(2, '0')}, ${String(content.appCloses[3]).padStart(2, '0')}:${String(content.appCloses[4]).padStart(2, '0')}` : '';
            // setAppCloses(formattedAppCloses);
            // const formattedVotingOpens = content.votingOpens ? `${content.votingOpens[0]}-${String(content.votingOpens[1]).padStart(2, '0')}-${String(content.votingOpens[2]).padStart(2, '0')}, ${String(content.votingOpens[3]).padStart(2, '0')}:${String(content.votingOpens[4]).padStart(2, '0')}` : '';
            // setVotingOpens(formattedVotingOpens);
            // const formattedVotingCloses = content.votingCloses ? `${content.votingCloses[0]}-${String(content.votingCloses[1]).padStart(2, '0')}-${String(content.votingCloses[2]).padStart(2, '0')}, ${String(content.votingCloses[3]).padStart(2, '0')}:${String(content.votingCloses[4]).padStart(2, '0')}` : '';
            // setVotingCloses(formattedVotingCloses);


            // const appOpensDate = content.appOpens ? new Date(content.appOpens[0], content.appOpens[1] - 1, content.appOpens[2], content.appOpens[3], content.appOpens[4]) : null;
            // setAppOpens(appOpensDate);

            // const appClosesDate = content.appCloses ? new Date(content.appCloses[0], content.appCloses[1] - 1, content.appCloses[2], content.appCloses[3], content.appCloses[4]) : null;
            // setAppCloses(appClosesDate);

            // const votingOpensDate = content.votingOpens ? new Date(content.votingOpens[0], content.votingOpens[1] - 1, content.votingOpens[2], content.votingOpens[3], content.votingOpens[4]) : null;
            // setVotingOpens(votingOpensDate);

            // const votingClosesDate = content.votingCloses ? new Date(content.votingCloses[0], content.votingCloses[1] - 1, content.votingCloses[2], content.votingCloses[3], content.votingCloses[4]) : null;
            // setVotingCloses(votingClosesDate);

            const appOpensDate = content.appOpens ? fromUTC(content.appOpens) : null;
            setAppOpens(appOpensDate);

            const appClosesDate = content.appCloses ? fromUTC(content.appCloses) : null;
            setAppCloses(appClosesDate);

            const votingOpensDate = content.votingOpens ? fromUTC(content.votingOpens) : null;
            setVotingOpens(votingOpensDate);

            const votingClosesDate = content.votingCloses ? fromUTC(content.votingCloses) : null;
            setVotingCloses(votingClosesDate);



          }else{
            console.warn('Content is undefined or null');
          }
          setIsLoading(false);

        }catch(error){
          console.error("Error fetching election details:", error);
          setErrors("Failed to fetch election details");
          setIsLoading(false);
        }


      }else{
        setIsLoading(false);
      }


    };

    fetchElectionDetails();

  }, [id]);


  const validateField = (field, value) => {
    let error = "";
    switch (field) {
        case "electionName":
            if (!value) error = "Election Name is required.";
            break;
        case "appOpens":
            if (!value) error = "Application openning date is required.";
            break;
        case "appCloses":
            if (!value) error = "Application closing date is required.";
            break;
        case "votingOpens":
            if (!value) error = "Voting opening date is required.";
            break;
        case "votingCloses":
            if (!value) error = "Voting closing date is required.";
            break;
        default:
            break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
};

useEffect(() => {
    if (isSubmitted) {
      validateField("electionName", electionName);
    }
}, [electionName]);

useEffect(() => {
    if (isSubmitted) {
      validateField("appOpens", appOpens);
    }
}, [appOpens]);

useEffect(() => {
    if (isSubmitted) {
      validateField("appCloses", appCloses);
    }
}, [appCloses]);

useEffect(() => {
    if (isSubmitted) {
      validateField("votingOpens", votingOpens);
    }
}, [votingOpens]);

useEffect(() => {
    if (isSubmitted) {
      validateField("votingCloses", votingCloses);
    }
}, [votingCloses]);




  const handleSubmit = async (e) =>{
    e.preventDefault();
    setIsSubmitted(true);


    validateField("electionName", electionName);
    validateField("appOpens", appOpens);
    validateField("appCloses", appCloses);
    validateField("votingOpens", votingOpens);
    validateField("votingCloses", votingCloses);

    

    if(Object.values(errors).every((error) => error === "") && 
            Object.values({electionName, appOpens, appCloses, votingOpens, votingCloses}).every((field) => field !== "" && field !== null)){

            try{
                const token = localStorage.getItem('token'); 

                // const formattedAppOpens = appOpens.toISOString();
                // const formattedAppCloses = appCloses.toISOString();
                // const formattedVotingOpens = votingOpens.toISOString();
                // const formattedVotingCloses = votingCloses.toISOString();

                const formattedAppOpens = toUTC(appOpens) ;
                const formattedAppCloses = toUTC(appCloses) ;
                const formattedVotingOpens = toUTC(votingOpens);
                const formattedVotingCloses = toUTC(votingCloses) ;
                
                if(id){

                    const response = await ElectionService.updateElection(
                        id,
                        electionName,
                        formattedAppOpens,
                        formattedAppCloses,
                        formattedVotingOpens,
                        formattedVotingCloses,
                        club.club_id,
                        token
                    );
        
                    
                    //alert('Election updated successfully');
                    setShowUpdateSuccessPopup(true);
                    console.log('Election updated:', response);
                    setTimeout(() => {
                      navigate(-1);
                    }, 2000);
    
                }else{
    
                    const response = await ElectionService.saveElection(
                        electionName,
                        formattedAppOpens,
                        formattedAppCloses,
                        formattedVotingOpens,
                        formattedVotingCloses,
                        club.club_id,
                        token
                    );
        
                    
                    //alert('Election added successfully');
                    setShowAddSuccessPopup(true);
                    console.log('Election added:', response);
                    setTimeout(() => {
                      navigate(-1);
                    }, 2000);
    
                }



            }catch(error){
                console.error("Error Processing Election:", error);
            
                const errorMessages = error.response ? error.response.data.errors : { global: error.message };
                setErrors(errorMessages);
                setTimeout(() => setErrors({}), 5000);

            }

        }

  }


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
          <div className="bg-black bg-opacity-90 text-white flex-col md:p-20 overflow-y-auto min-h-screen">
                    <div variant="h3" className="mb-4 text-center">  {pageTitle()}</div>

                    <div className="grid grid-cols-1 gap-4">
              
             
              <div className=" rounded-xl w-full ">
                <form onSubmit={handleSubmit} >
                  <div className="flex flex-col gap-3">
                    <label htmlFor="electionFor" className="block mb-2">
                      Election For *
                    </label>
                    <input
                      id="electionFor"
                      value={electionName}
                      onChange={(e) => setElectionName(e.target.value)}
                      type="text"
                      placeholder="Club Board of 24/25"
                      className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                                
                      style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}                    />
                    {isSubmitted && errors.electionName && <div className="text-red-500">{errors.electionName}</div>}
                  </div>
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="candidatesOpen" className="block mb-2">
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
                          className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                                
                          style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}                   
                      
                      />
                 
                      {isSubmitted && errors.appOpens && <div className="text-red-500">{errors.appOpens}</div>}
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
                          minDate={appOpens? appOpens : new Date()}
                          showTimeSelect
                          timeFormat="hh:mm"
                          dateFormat="Pp"
                          className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                                
                          style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}                                         
                      />
                      {isSubmitted && errors.appCloses && <div className="text-red-500">{errors.appCloses}</div>}
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
                    <label htmlFor="votingsOpen" className="block mb-2">
                      Votings Open (time duration) *
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <DatePicker
                          selected={votingOpens}
                          onChange={e => setVotingOpens(e)}
                          minDate={appCloses? appCloses: new Date()}
                          showTimeSelect
                          timeFormat="hh:mm"
                          dateFormat="Pp"
                          className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                                
                          style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}                                         
                      />
                      {isSubmitted && errors.votingOpens && <div className="text-red-500">{errors.votingOpens}</div>}
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
                          minDate={votingOpens? votingOpens: new Date()}
                          showTimeSelect
                          timeFormat="hh:mm"
                          dateFormat="Pp"
                          className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                                
                          style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}                                         
                      />
                      {isSubmitted && errors.votingCloses && <div className="text-red-500">{errors.votingCloses}</div>}
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
                    <Button type='submit'         className="bg-[#AEC90A] hover:bg-[#9AB307] text-black font-bold py-2 px-4 rounded-full transition duration-300"
                    >
                      Submit
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
                Election created successfully
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
              Election updated successfully
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default NewElectionForm;


