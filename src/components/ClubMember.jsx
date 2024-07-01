import React from 'react';
import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';


const ClubMember = () => {
    const navigate = useNavigate();

    const clubs = [
        { id: "1", name: "IEEE Student Group", image: "src/assets/clubs/ieee.png" },
        { id: "2", name: "ISACA Student Group", image: "src/assets/clubs/isaca.png" },
        { id: "3", name: "Gavel Club (Public Speaking and Leadership)", image: "src/assets/clubs/gavel.png" },
        { id: "4", name: "Pahasara Club (Innovation and Creativity)", image: "src/assets/clubs/pahasara.png" },
        { id: "5", name: "Rotaract Club of UCSC", image: "src/assets/clubs/rotaract.png" },
    ];

    const handleExplore = () => {
        navigate('/member/explore');
    };

    return (
        <Card className="w-full bg-neutral-900">
            <CardBody>
                <div className="">
                {clubs.map(({ name, image }, index) => (
                    <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-xl mb-4"
                    >
                        <div className="flex items-center gap-x-3">
                            <Avatar size="sm" src={image} alt={name} className='border-2 border-white rounded-md w-10 h-10'/>
                            <div>
                            <Typography color="blue-gray" variant="h6">
                                {name}
                            </Typography>
                            </div>
                        </div>
                        <div className="flex flex-row gap-4"> 
                            <Button className='bg-white pt-1 pb-1 pl-5 pr-5 rounded-2xl text-black font-medium text-sm'>Leave</Button>
                            <Button onClick={handleExplore} className='bg-[#AEC90A] pt-1 pb-1 pl-5 pr-5 rounded-2xl text-black font-medium text-sm'>Explore</Button>
                        </div>
                    </div>
                ))}
                </div>
            </CardBody>
        </Card>
    );
}

export default ClubMember;



