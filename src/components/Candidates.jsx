import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import SelectRemove from "./SelectRemove";

// Predefined teams
const teams = ["Content", "Design", "Marketing", "Finance"];

// Predefined events
const predefinedEvents = [
  "Reid Extreme 3.0",
  "MadHack 2.0",
  "FreshHack 1.0"
];

const getRandomEvents = () => {
  const shuffledEvents = predefinedEvents.sort(() => 0.5 - Math.random());
  return shuffledEvents.slice(0, Math.floor(Math.random() * shuffledEvents.length) + 1);
};

const generateRandomMember = (status, position) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: status === "Selected" ? generateRandomName("male") : generateRandomName("female"),
    team: teams[Math.floor(Math.random() * teams.length)],
    image: `https://randomuser.me/api/portraits/${status === "Selected" ? "men" : "women"}/${Math.floor(Math.random() * 99)}.jpg`,
    events: getRandomEvents(),
    ocPercentage: Math.floor(Math.random() * (90 - 60 + 1)) + 60,
    attendancePercentage: Math.floor(Math.random() * (80 - 50 + 1)) + 50,
    status: status,
    position: position,
  };
};

const generateRandomName = (gender) => {
  const names = gender === "male" ?
    ["John", "Michael", "James", "David", "William", "Joseph", "Daniel", "George", "Anthony", "Charles"] :
    ["Mary", "Jennifer", "Linda", "Susan", "Karen", "Lisa", "Nancy", "Betty", "Helen", "Sandra"];
  return names[Math.floor(Math.random() * names.length)];
};

const Candidates = ({ activeTab }) => {
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

  // Generate random members for each tab and position
  const generateMembersForPosition = (status, position) => 
    Array.from({ length: 3 }, () => generateRandomMember(status, position));

  const selectedMembers = {
    President: generateMembersForPosition("Selected", "President"),
    Secretary: generateMembersForPosition("Selected", "Secretary"),
    Treasurer: generateMembersForPosition("Selected", "Treasurer"),
  };
  
  const rejectedMembers = {
    President: generateMembersForPosition("Rejected", "President"),
    Secretary: generateMembersForPosition("Rejected", "Secretary"),
    Treasurer: generateMembersForPosition("Rejected", "Treasurer"),
  };
  
  const applicantsMembers = {
    President: generateMembersForPosition("Applicants", "President"),
    Secretary: generateMembersForPosition("Applicants", "Secretary"),
    Treasurer: generateMembersForPosition("Applicants", "Treasurer"),
  };

  // Determine which members to display based on activeTab
  let displayMembers = {};
  if (activeTab === "Selected") {
    displayMembers = selectedMembers;
  } else if (activeTab === "Rejected") {
    displayMembers = rejectedMembers;
  } else {
    displayMembers = applicantsMembers;
  }

  const renderMembers = (members, position) => (
    <>
      <Typography color="white" variant="h4" className="mb-4 ">
        {position} Position
      </Typography>
      {members.map((member) => (
        <div
          key={member.id}
          className="relative flex items-start justify-between p-4 mb-4 bg-black rounded-2xl " style={{ 
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
          }}
        >
          <div className="flex items-center gap-4">
            <Avatar
              size="xl"
              src={member.image}
              alt={member.name}
              className="border-4 border-black rounded-full w-24 h-24 custom-card"
            />
            <div>
              <Typography color="white" variant="h5" className="mb-1">
                {member.name}
              </Typography>
              <Typography color="white" variant="subtitle1" className="mb-1">
                From Team: {member.team}
              </Typography>
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
              <Typography color="white" variant="subtitle1">
                {member.ocPercentage}%
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <Typography color="white" variant="subtitle1" className="mb-1">
                Attendance
              </Typography>
              <Chart {...chartConfig} />
              <Typography color="white" variant="subtitle1">
                {member.attendancePercentage}%
              </Typography>
            </div>
          </div>
          <div>
            {member.status === "Applicants" && (
              <SelectRemove onEdit={() => {}} onDelete={() => {}} />
            )}
            {member.status === "Selected" && (
              <button className="px-4 py-2 border-[#AEC90A] border-2 text-[#AEC90A] rounded-full custom-card">
                Selected
              </button>
            )}
            {member.status === "Rejected" && (
              <button className="px-4 py-2 border-red-700 border-2 text-red-700 rounded-full custom-card">
                Rejected
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="w-full bg-neutral-900">
      <Card className="w-full bg-neutral-900" >
        <CardBody>
          {Object.keys(displayMembers).map((position) =>
            renderMembers(displayMembers[position], position)
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Candidates;
