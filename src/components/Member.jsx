import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import Remove from "./Remove";
import { useLocation } from "react-router-dom";
import RegistrationService from '../service/registrationService'; // Adjust the path as needed

const chartConfig = {
  type: "pie",
  width: 80,
  height: 80,
  series: [20, 80],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#1E1E1E", "#AEC90A"],
    legend: {
      show: false,
    },
  },
};

const Member = () => {
  const location = useLocation();
  const showRemoveButton = location.pathname.startsWith('/secretary') || location.pathname.startsWith('/president');

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      const token = localStorage.getItem('token') || '';

      try {
        const response = await RegistrationService.getAllRegistrations(token);
        if (response.data) {
          // Filter members with accepted value 1 and position 'Member'
          const filteredMembers = response.data.filter(
            (reg) => reg.accepted === 1 && reg.position === 'Member'
          );
          setMembers(filteredMembers);
        } else if (response.content) {
          const filteredMembers = response.content.filter(
            (reg) => reg.accepted === 1 && reg.position === 'Member'
          );
          setMembers(filteredMembers);
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        setError('Error fetching registrations. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleRemove = async (id) => {
    const token = localStorage.getItem('token') || '';
    const updatedRegistration = members.find((reg) => reg.registrationId === id);

    if (!updatedRegistration) {
      console.error('Registration not found for ID:', id);
      return;
    }

    const updates = {
      position: 'Removed', // Set 'position' to 'Removed'
      ...updatedRegistration, // Add all existing registration data
    };

    try {
      await RegistrationService.updateRegistration(id, updates, token);
      setMembers((prev) =>
        prev.map((reg) =>
          reg.registrationId === id ? { ...reg, position: 'Removed' } : reg
        )
      );
    } catch (err) {
      setError('Error updating registration. Please try again.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <Card className="w-full bg-neutral-900">
      <CardBody>
        {members.map((member) => (
          <div
            key={member.registrationId}
            className="relative flex items-start justify-between p-3 mb-5 bg-zinc-950 bg-opacity-80 rounded-2xl custom-3d-shadow"
            style={{ 
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
            }}
          >
            <div className="flex items-center gap-4">
              <Avatar
                size="xl"
                src={member.image}
                alt={member.name}
                className="border-2 border-black rounded-full w-24 h-24 custom-card"
              />
              <div>
                <Typography color="white" variant="h5" className="mb-1">
                  {member.name}
                </Typography>
                <Typography color="white" variant="subtitle1" className="mb-1">
                  From Team: {member.team}
                </Typography>
                {showRemoveButton && (
                  <Remove
                    onEdit={() => {}}
                    onDelete={() => handleRemove(member.registrationId)}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Typography color="white" variant="subtitle1" className="mb-1">
                Joined Event OCs:
              </Typography>
              <ul className="list-disc list-inside">
                {member.events.map((event, idx) => (
                  <li key={idx} className="text-[#AEC90A]">
                    {event}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <Typography color="white" variant="subtitle1" className="mb-1">
                  OC Participation
                </Typography>
                <Chart {...chartConfig} />
                <Typography color="white" variant="subtitle1">{member.ocPercentage}%</Typography>
              </div>
              <div className="flex items-center gap-2">
                <Typography color="white" variant="subtitle1" className="mb-1">
                  Attendance
                </Typography>
                <Chart {...chartConfig} />
                <Typography color="white" variant="subtitle1">{member.attendancePercentage}%</Typography>
              </div>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default Member;
