import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import Remove from "./Remove";

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

const Member = () => {
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

  const members = [
    {
      id: "1",
      name: "Sarah",
      team: teams[Math.floor(Math.random() * teams.length)],
      image: "https://randomuser.me/api/portraits/women/11.jpg",
      events: getRandomEvents(),
      ocPercentage: 80,
      attendancePercentage: 70,
    },
    {
      id: "2",
      name: "John",
      team: teams[Math.floor(Math.random() * teams.length)],
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      events: getRandomEvents(),
      ocPercentage: 70,
      attendancePercentage: 65,
    },
    {
      id: "3",
      name: "Jane",
      team: teams[Math.floor(Math.random() * teams.length)],
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      events: getRandomEvents(),
      ocPercentage: 75,
      attendancePercentage: 68,
    },
    {
      id: "4",
      name: "Alice",
      team: teams[Math.floor(Math.random() * teams.length)],
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      events: getRandomEvents(),
      ocPercentage: 78,
      attendancePercentage: 72,
    },
    {
      id: "5",
      name: "Bob",
      team: teams[Math.floor(Math.random() * teams.length)],
      image: "https://randomuser.me/api/portraits/men/9.jpg",
      events: getRandomEvents(),
      ocPercentage: 72,
      attendancePercentage: 67,
    },
    {
      id: "6",
      name: "Eve",
      team: teams[Math.floor(Math.random() * teams.length)],
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      events: getRandomEvents(),
      ocPercentage: 76,
      attendancePercentage: 71,
    },
    {
      id: "7",
      name: "Mark",
      team: teams[Math.floor(Math.random() * teams.length)],
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      events: getRandomEvents(),
      ocPercentage: 74,
      attendancePercentage: 69,
    },
    {
      id: "8",
      name: "Emily",
      team: teams[Math.floor(Math.random() * teams.length)],
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      events: getRandomEvents(),
      ocPercentage: 77,
      attendancePercentage: 70,
    },
    {
      id: "9",
      name: "Alex",
      team: teams[Math.floor(Math.random() * teams.length)],
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      events: getRandomEvents(),
      ocPercentage: 73,
      attendancePercentage: 68,
    },
    {
      id: "10",
      name: "Grace",
      team: teams[Math.floor(Math.random() * teams.length)],
      image: "https://randomuser.me/api/portraits/women/9.jpg",
      events: getRandomEvents(),
      ocPercentage: 75,
      attendancePercentage: 69,
    },
  ];

  return (
    <>
      <Card className="w-full bg-neutral-900">
        <CardBody>
          {members.map((member, index) => (
            <div
              key={member.id}
              className="relative flex items-start justify-between p-4 mb-4 bg-zinc-950 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <Avatar
                  size="xl"
                  src={member.image}
                  alt={member.name}
                  className="border-2 border-white rounded-full w-24 h-24"
                />
                <div>
                  <Typography color="white" variant="h5" className="mb-1">
                    {member.name}
                  </Typography>
                  <Typography color="white" variant="subtitle1" className="mb-1">
                    From Team: {member.team}
                  </Typography>
                  <div >
                  <Remove
                    onEdit={() => {}}
                    onDelete={() => {}}
                  />
                </div>
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
    </>
  );
};

export default Member;
