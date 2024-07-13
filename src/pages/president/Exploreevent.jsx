import React from "react";
import { useLocation } from 'react-router-dom';
import { Card, CardBody, Typography } from "@material-tailwind/react";

const ExploreEvent = () => {
  const location = useLocation();
  const { name, image, date, clubName, clubImage } = location.state;

  return (
    <div className="flex justify-center items-center flex-col p-4 rounded-lg" style={{ backgroundColor: '#1E1E1E' }}>
      <Card className="w-full max-w-screen-lg bg-neutral-900">
        <CardBody>
          <div className="relative">
            <img src={clubImage} alt={clubName} className="w-full h-72 object-cover rounded-lg mb-4" />
            <Typography color="white" variant="h3" className="mb-4">
              {clubName}
            </Typography>
            <img src={image} alt={name} className="w-full h-72 object-cover rounded-lg" />
          </div>
          <div className="mt-4">
            <Typography color="white" variant="h3" className="mb-2">
              {name}
            </Typography>
            <Typography color="white" variant="subtitle1" className="mb-1">
              Date: {date}
            </Typography>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ExploreEvent;
