import React from 'react';
import {
    Card,
    CardBody,
    Typography,
    Avatar,
} from "@material-tailwind/react";

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

const StudentMiniNavMember = () => {
    const members = [
        {
          id: "1",
          name: "Sarah",
          team: teams[Math.floor(Math.random() * teams.length)],
          image: "https://randomuser.me/api/portraits/women/11.jpg",
          events: getRandomEvents(),
          ocPercentage: 80,
          attendancePercentage: 70,
          description: "Being part of the Content team has been a fantastic experience. I've had the chance to enhance my writing skills and collaborate on creative projects. It's been a great opportunity for personal and professional growth."
        },
        {
          id: "2",
          name: "John",
          team: teams[Math.floor(Math.random() * teams.length)],
          image: "https://randomuser.me/api/portraits/men/1.jpg",
          events: getRandomEvents(),
          ocPercentage: 70,
          attendancePercentage: 65,
          description: "Joining the tech events team has been incredibly rewarding. I've enjoyed working on the latest technologies and leading projects. The experience has broadened my skills and expanded my network."
        },
        {
          id: "3",
          name: "Jane",
          team: teams[Math.floor(Math.random() * teams.length)],
          image: "https://randomuser.me/api/portraits/women/2.jpg",
          events: getRandomEvents(),
          ocPercentage: 75,
          attendancePercentage: 68,
          description: "As a member of the Wellness team, I've been able to contribute to initiatives that improve student well-being. The role has allowed me to make a positive impact and work with passionate individuals."
        },
        {
          id: "4",
          name: "Alice",
          team: teams[Math.floor(Math.random() * teams.length)],
          image: "https://randomuser.me/api/portraits/women/3.jpg",
          events: getRandomEvents(),
          ocPercentage: 78,
          attendancePercentage: 72,
          description: "Being involved in the Design team has been a rewarding challenge. I love the creative process and the opportunity to experiment with new ideas. It's been a great environment for honing my design skills."
        },
        {
          id: "5",
          name: "Bob",
          team: teams[Math.floor(Math.random() * teams.length)],
          image: "https://randomuser.me/api/portraits/men/9.jpg",
          events: getRandomEvents(),
          ocPercentage: 72,
          attendancePercentage: 67,
          description: "Working in the Finance team has been an insightful experience. I've learned a lot about budgeting and financial planning. It's been a valuable part of my personal and professional development."
        },
        {
          id: "6",
          name: "Eve",
          team: teams[Math.floor(Math.random() * teams.length)],
          image: "https://randomuser.me/api/portraits/women/8.jpg",
          events: getRandomEvents(),
          ocPercentage: 76,
          attendancePercentage: 71,
          description: "Joining the Marketing team has allowed me to explore new strategies and tactics. I've enjoyed the creative aspects of the role and the chance to work on impactful campaigns."
        },
        {
          id: "7",
          name: "Mark",
          team: teams[Math.floor(Math.random() * teams.length)],
          image: "https://randomuser.me/api/portraits/men/3.jpg",
          events: getRandomEvents(),
          ocPercentage: 74,
          attendancePercentage: 69,
          description: "Being part of the Design team has given me the chance to work on diverse projects. I appreciate the collaborative atmosphere and the opportunity to push creative boundaries."
        },
        {
          id: "8",
          name: "Emily",
          team: teams[Math.floor(Math.random() * teams.length)],
          image: "https://randomuser.me/api/portraits/women/5.jpg",
          events: getRandomEvents(),
          ocPercentage: 77,
          attendancePercentage: 70,
          description: "The club's projects have been a great platform for me to apply my skills and learn new ones. I've enjoyed the collaborative spirit and the chance to make meaningful contributions."
        },
        {
          id: "9",
          name: "Alex",
          team: teams[Math.floor(Math.random() * teams.length)],
          image: "https://randomuser.me/api/portraits/men/4.jpg",
          events: getRandomEvents(),
          ocPercentage: 73,
          attendancePercentage: 68,
          description: "Working with the Finance team has been a valuable learning experience. I've gained insights into financial management and enjoyed working with a team of dedicated individuals."
        },
        {
          id: "10",
          name: "Grace",
          team: teams[Math.floor(Math.random() * teams.length)],
          image: "https://randomuser.me/api/portraits/women/9.jpg",
          events: getRandomEvents(),
          ocPercentage: 75,
          attendancePercentage: 69,
          description: "The Content team has provided me with numerous opportunities to grow. I've loved the creative challenges and the supportive team environment that has helped me develop my skills."
        },
    ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
        {members.map((member, index) => (
        <Card key={member.id} className="w-full bg-black bg-opacity-20 custom-3d-shadow relative custom-card">
        <CardBody className="flex flex-col items-center">
              <Avatar
                size="xl"
                src={member.image}
                alt={member.name}
                className="rounded-full w-30 h-30 mb-4 custom-card"
              />
              <Typography color="white" variant="h5" className="mb-2">
                {member.name}
              </Typography>
              <Typography color="white" variant="subtitle1" className="mb-2">
                From Team: {member.team}
              </Typography>
              <Typography color="white" className="mb-4 text-center">
                {member.description}
              </Typography>
              <div className="flex flex-col items-center">
                <Typography color="white" variant="subtitle1" className="mb-2">
                  Joined Event OCs:
                </Typography>
                <ul className="list-disc list-inside text-center">
                  {member.events.map((event, idx) => (
                    <li key={idx} className="text-[#AEC90A]">
                      {event}
                    </li>
                  ))}
                </ul>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
}

export default StudentMiniNavMember;
