import React, { useEffect, useState } from "react";
import { getAllCandidates, updateCandidateSelection } from "../service/candidateService";
import { Card, CardBody, Typography, Avatar, Button } from "@material-tailwind/react";

const Candidates = () => {
    const [candidates, setCandidates] = useState([]);
    const [message, setMessage] = useState(""); // State for success or error message

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const data = await getAllCandidates();
                console.log("Fetched candidates:", data); // Log the fetched data
                setCandidates(data);
            } catch (error) {
                console.error("Error fetching candidates:", error);
            }
        };

        fetchCandidates();
    }, []);

    // Filter candidates based on position
    const presidents = candidates.filter(candidate => candidate.position.toLowerCase() === "president");
    const secretaries = candidates.filter(candidate => candidate.position.toLowerCase() === "secretary");
    const treasurers = candidates.filter(candidate => candidate.position.toLowerCase() === "treasurer");

    const handleSelect = async (id) => {
      console.log(`Attempting to update candidate with ID: ${id} to status: selected`);
  
      try {
          const status = "selected";
          const response = await updateCandidateSelection(id, status);
          console.log("Update response:", response);
  
          setCandidates(candidates.map(candidate =>
              candidate.id === id ? { ...candidate, selected: status } : candidate
          ));
  
          setMessage(`Candidate updated successfully to ${status}.`);
  
          setTimeout(() => {
              setMessage("");
          }, 3000);
      } catch (error) {
          console.error("Error updating candidate selection:", error.message);
          setMessage("Error updating candidate. Please try again.");
      }
  };
  
  const handleReject = async (id) => {
      console.log(`Attempting to update candidate with ID: ${id} to status: rejected`);
  
      try {
          const status = "rejected";
          const response = await updateCandidateSelection(id, status);
          console.log("Update response:", response);
  
          setCandidates(candidates.map(candidate =>
              candidate.id === id ? { ...candidate, selected: status } : candidate
          ));
  
          setMessage(`Candidate updated successfully to ${status}.`);
  
          setTimeout(() => {
              setMessage("");
          }, 3000);
      } catch (error) {
          console.error("Error updating candidate selection:", error.message);
          setMessage("Error updating candidate. Please try again.");
      }
  };
  
  
    return (
        <div className="text-white">
            {/* Display message */}
            {message && (
                <div className="bg-black text-yellow-500 p-4 mb-4">
                    <Typography>{message}</Typography>
                </div>
            )}

            {/* President Category */}
            <div className="mb-8">
                <Typography variant="h5" className="mb-2">
                    President
                </Typography>
                {presidents.length > 0 ? (
                    presidents.map(candidate => (
                        <Card key={candidate.id} className="mb-4 bg-black text-white">
                            <CardBody>
                                <div className="flex items-center gap-4">
                                    <Avatar src={candidate.imageUrl || `https://source.unsplash.com/random?sig=${candidate.id}`} />
                                    <div>
                                        <Typography variant="h6">{candidate.name || 'No Name'}</Typography>
                                        <Typography variant="body2">Position: {candidate.position}</Typography>
                                        <Typography variant="body2">Contribution: {candidate.contribution}</Typography>
                                        <Typography variant="body2">Selected: {candidate.selected}</Typography>
                                        <div className="mt-2 flex gap-2">
                                            <Button
                                                color="green"
                                                onClick={() => handleSelect(candidate.id)}
                                            >
                                                Select
                                            </Button>
                                            <Button
                                                color="red"
                                                onClick={() => handleReject(candidate.id)}
                                                >
                                                Reject
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                ) : (
                    <Typography>No candidates for President.</Typography>
                )}
            </div>

            {/* Secretary Category */}
            <div className="mb-8">
                <Typography variant="h5" className="mb-2">
                    Secretary
                </Typography>
                {secretaries.length > 0 ? (
                    secretaries.map(candidate => (
                        <Card key={candidate.id} className="mb-4 bg-black text-white">
                            <CardBody>
                                <div className="flex items-center gap-4">
                                    <Avatar src={candidate.imageUrl || `https://source.unsplash.com/random?sig=${candidate.id}`} />
                                    <div>
                                        <Typography variant="h6">{candidate.name || 'No Name'}</Typography>
                                        <Typography variant="body2">Position: {candidate.position}</Typography>
                                        <Typography variant="body2">Contribution: {candidate.contribution}</Typography>
                                        <Typography variant="body2">Selected: {candidate.selected}</Typography>
                                        <div className="mt-2 flex gap-2">
                                            <Button
                                                color="green"
                                                onClick={() => handleSelection(candidate.id, "selected")}
                                            >
                                                Select
                                            </Button>
                                            <Button
                                                color="red"
                                                onClick={() => handleSelection(candidate.id, "rejected")}
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                ) : (
                    <Typography>No candidates for Secretary.</Typography>
                )}
            </div>

            {/* Treasurer Category */}
            <div className="mb-8">
                <Typography variant="h5" className="mb-2">
                    Treasurer
                </Typography>
                {treasurers.length > 0 ? (
                    treasurers.map(candidate => (
                        <Card key={candidate.id} className="mb-4 bg-black text-white">
                            <CardBody>
                                <div className="flex items-center gap-4">
                                    <Avatar src={candidate.imageUrl || `https://source.unsplash.com/random?sig=${candidate.id}`} />
                                    <div>
                                        <Typography variant="h6">{candidate.name || 'No Name'}</Typography>
                                        <Typography variant="body2">Position: {candidate.position}</Typography>
                                        <Typography variant="body2">Contribution: {candidate.contribution}</Typography>
                                        <Typography variant="body2">Selected: {candidate.selected}</Typography>
                                        <div className="mt-2 flex gap-2">
                                            <Button
                                                color="green"
                                                onClick={() => handleSelection(candidate.id, "selected")}
                                            >
                                                Select
                                            </Button>
                                            <Button
                                                color="red"
                                                onClick={() => handleSelection(candidate.id, "rejected")}
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                ) : (
                    <Typography>No candidates for Treasurer.</Typography>
                )}
            </div>
        </div>
    );
};

export default Candidates;
