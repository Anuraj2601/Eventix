
import React, { useState } from 'react'

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { HiArrowRightCircle } from "react-icons/hi2";



const ClubCard = () => {


  return (
    <>
        <Card className="bg-black" style={{ width: '23rem' }}>
            <CardHeader color="blue-gray" className="relative h-40"> {/* Reduced height */}
                <img
                src="src/assets/rotaract.png"
                alt="your-image-description"
                className="h-full w-full object-cover"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h5" className="mb-2 text-[#AEC90A] flex items-center"> {/* Adjusted variant */}
                Registrations are open
                <a href="#register-link" className="ml-4 h-auto w-9">
                    <HiArrowRightCircle className="text-2xl" /> {/* Adjusted text size */}
                </a>
                </Typography>
                <Typography className="text-sm"> {/* Adjusted font size */}
                Get the opportunity to learn from industry professionals, prepare
                for certifications like CISA and CRISC and network with
                professionals in the field.
                </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex justify-end">
                <a href="#explore-link">
                <Button variant="gradient" className="bg-[#AEC90A] text-black pt-1 pb-1 pl-3 pr-3 font-medium">
                    Explore
                </Button>
                </a>
            </CardFooter>
        </Card>

    </>
  )
}

export default ClubCard