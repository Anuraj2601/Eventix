/*import React from 'react'

const CurrentBoard = () => {
  return (
    <div>
      <h2>Current Board</h2>
      <p>Details about the current board members...</p>
    </div>
  )
}

export default CurrentBoard*/

import { Carousel } from "@material-tailwind/react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";

import { IconButton } from "@material-tailwind/react";

export function Event() {
  return (
    
    <div>
     {
     <div>
      <div className="flex justify-center items-center flex-col p-4 rounded-lg" style={{ backgroundColor: '#1E1E1E' }}>
      <h2>Events</h2>
      <p>Events of Club Member...</p>
      </div>
     </div>
     }
</div>

  );
};
