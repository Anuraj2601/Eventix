import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import Customswitch from "../Customswitch";
import EditDeleteButton from "../EditDeleteButton";
import { useLocation, useNavigate, useParams } from "react-router-dom"; // Import useLocation
import ElectionService from '../../service/ElectionService';


//const ElectionviewDetails = ({ clubName, electionId }) => {
const ElectionviewDetails = ({  electionId }) => {
  const [value, setValue] = useState(false);
  const location = useLocation(); // Get the current path

  const [electionName, setElectionName] = useState('');
  const [appOpens, setAppOpens] = useState(null);
  const [appCloses, setAppCloses] = useState(null);
  const [votingOpens, setVotingOpens] = useState(null);
  const [votingCloses, setVotingCloses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState('');

  const navigate = useNavigate();

  // Determine if the current path is one of the specified paths
  const isEditablePage = ['/president', '/secretary'].some(path => location.pathname.startsWith(path));

  const elections = [
    {
      id: "1",
      desc: "Club Board of 24/25",
      applicationDate: "05.06.2024-09.06.2024",
      votingDate: "10.06.2024-15.06.2024",
    },
  ];

  const handleEdit = (id) => {
    navigate(`/president/club/election/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Election?"
      );

      const token = localStorage.getItem("token");
      if (confirmDelete) {
        await ElectionService.deleteElection(id, token);

        //navigate(currentPath, {replace: true});
        navigate(-1);
        
      }
    } catch (error) {
      console.error("Error fetching elections:", error);
    }
  };

  const formatDateToYMD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  const fromUTC = (dateArray) => {
    const date = new Date(Date.UTC(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]));
    //const date = new Date(Date.UTC(...dateArray));
    const offset = date.getTimezoneOffset() * 60000;
  
    const localDate = new Date(date.getTime() - offset);

    // Format the localDate to a readable string
    //return localDate.toLocaleDateString();
    return formatDateToYMD(localDate);
  };


  useEffect(() =>{

    const fetchElectionDetails = async () => {

      if(electionId){

        try{

          const token = localStorage.getItem('token');
          const response = await ElectionService.getElectionById(electionId, token);
          console.log('Response getElectionbyID:', response); 
          const { content } = response; 
          if(content){
            setElectionName(content.election_name || '');

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

  }, [electionId]);

  return (
    <div className="flex justify-center items-center w-full mt-4">
      <Card className="w-156 bg-[#1E1E1E]" style={{ 
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                }}>
        <CardBody>
          
            <div key={electionId} className="p-4 bg- rounded-xl mb-4">
              <Typography className="text-center text-[#AEC90A] p-5" variant="h5">
                {electionName}
              </Typography>
              <div className="flex items-center justify-between mt-4">
                <Typography className="text-[#AEC90A] p-5" variant="h6">
                  Application Open Duration:
                </Typography>
                <Typography className="text-white p-5" variant="h6">
                  {appOpens} - {appCloses}
                </Typography>
                {/* {isEditablePage && (
                  <Customswitch
                    isOn={value}
                    handleToggle={() => setValue(!value)}
                  />
                )} */}
              </div>
              <div className="flex items-center justify-between mt-4">
                <Typography className="text-[#AEC90A] p-5" variant="h6">
                  Voting Open Duration:
                </Typography>
                <Typography className="text-white p-5" variant="h6">
                  {votingOpens} - {votingCloses}
                </Typography>
                {/* {isEditablePage && (
                  <Customswitch
                    isOn={value}
                    handleToggle={() => setValue(!value)}
                  />
                )} */}
              </div>
              {isEditablePage && (
                <div className="flex items-center justify-end mt-4 gap-4">
                  <EditDeleteButton
                    onEdit={() => handleEdit(electionId)}
                    onDelete={() => handleDelete(electionId)}
                  />
                </div>
              )}
            </div>
         
        </CardBody>
      </Card>
    </div>
  );
};

export default ElectionviewDetails;
