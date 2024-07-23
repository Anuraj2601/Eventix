import { BsCalendar2EventFill } from "react-icons/bs";
import madhack2 from "../assets/madhack2.png";
import isaca from "../assets/isaca.png";
import gavel from "../assets/gavel.jpeg";
import rotract from "../assets/rotract.jpeg";
import { useState } from 'react';
import { RiTeamFill } from "react-icons/ri";
import { FaClock } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import { GrFormNext } from "react-icons/gr";


const UpcomingEvent = () => {
    const [activeButton, setActiveButton] = useState('IEEE');
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('');

    // Define content for each button with multiple events
    const contentData = {
        IEEE: [
            {
                name: 'MadHack 3.0',
                image: madhack2,
                deadline: "20 'th of June 2024",
                eventDate: "03 'rd of July 2024",
                time: "From 9 am to 4 pm",
                location: "UCSC Main Hall"
            },
            {
                name: 'MadHack 3.1',
                image: madhack2,
                deadline: "21 'st of June 2024",
                eventDate: "04 'th of July 2024",
                time: "From 10 am to 5 pm",
                location: "UCSC Main Hall"
            }
        ],
        ISACA: [
            {
                name: 'ISACA Event 1',
                image: isaca,
                deadline: "04 'th of July 2024",
                eventDate: "20'th of July 2024",
                time: "From 9 am to 4 pm",
                location: "UCSC Main Hall"
            },
            {
                name: 'ISACA Event 2',
                image: isaca,
                deadline: "05 'th of July 2024",
                eventDate: "21'th of July 2024",
                time: "From 10 am to 5 pm",
                location: "UCSC Main Hall"
            }
        ],
        Gavel: [
            {
                name: 'Gavel Event 1',
                image: gavel,
                deadline: "15 'th of Aug 2024",
                eventDate: "25 'th of Aug 2024",
                time: "From 9 am to 4 pm",
                location: "UCSC Main Hall"
            }
        ],
        Rotract: [
            {
                name: 'Rotract Event 1',
                image: rotract,
                deadline: "10 'th of Sep 2024",
                eventDate: "30 'th of Sep 2024",
                time: "From 9 am to 4 pm",
                location: "UCSC Main Hall"
            }
        ]
    };

    // Function to handle button click and update active state
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        setCurrentEventIndex(0); // Reset to the first event of the new active category
    };

    const handleNextClick = () => {
        const events = contentData[activeButton];
        const nextIndex = (currentEventIndex + 1) % events.length;
        setAnimationClass('slide-out');

        setTimeout(() => {
            setCurrentEventIndex(nextIndex);
            setAnimationClass('slide-in');
        }, 500);
    };

    const activeEvent = contentData[activeButton][currentEventIndex];

    return (
        <div className="flex flex-col items-center mt-3">
            <div className="flex items-center bg-dark-background p-4 rounded-lg">
                <BsCalendar2EventFill className="text-secondary w-9 h-9 shadow-lg" />
                <span className="text-lg font-normal pl-3 text-white uppercase">Upcoming events</span>
            </div>

            <div className="bg-dark-400 w-[82vw] h-[76vh] mt-2 rounded-lg flex items-center relative p-10 mb-20" style={{ 
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
          }}>
                <div className={`w-full h-full rounded-md p-0 flex items-start ${animationClass}`}>
                    <div className="w-[300px] h-[300px] mt-10">
                        <img src={activeEvent.image} alt={activeEvent.name} className="h-full rounded-xl border-4 border-white object-cover"  style={{ 
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
          }}/>
                    </div>
                    <div className="ml-10">
                        <div className="flex items-left space-x-6 mt-0 ml-0">
                            <div className="grid grid-cols-5 gap-1 ml-10">
                                {Object.keys(contentData).map((buttonName) => (
                                    <button
                                        key={buttonName}
                                        className={`relative text-[14px] font-normal w-24 h-12 p-1 rounded-md ${activeButton === buttonName ? 'text-primary after:content-[""] after:absolute after:bottom-[-5px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-2 after:h-2 after:bg-secondary after:rounded-full' : 'text-white'}`}
                                        onClick={() => handleButtonClick(buttonName)}
                                    >
                                        {buttonName}
                                    </button>
                                ))}
                                <a
                                    href="#"
                                    className="text-secondary text-[15px] mt-[8px] ml-6 font-normal opacity-50 hover:opacity-100"
                                >
                                    See all
                                </a>
                            </div>
                        </div>
                        <div className="mt-10 ml-0 flex justify-center items-center gap-4" >
                            <div className="text-[15px] text-white font-normal bg-dark-background w-1/2 h-12 p-2 rounded-md flex items-center justify-center hover:border border-secondary" style={{ 
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
          }}>
                                Deadline : <span className="ml-2 text-[15px] font-normal text-primary">{activeEvent.deadline}</span>
                            </div>

                            <div className="text-[15px] font-normal text-white bg-dark-background w-1/2 ml-0 h-12 p-2 rounded-md flex items-center justify-center hover:border border-secondary" style={{ 
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
          }}>
                                Event Date : <span className="ml-2 text-[15px] font-normal text-primary">{activeEvent.eventDate}</span>
                            </div>
                        </div>

                        <div className="relative mt-10 bg-dark-500 rounded-md w-[700px] mx-auto h-26 flex items-center p-5" style={{ 
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
          }}>
                            <div className="flex items-center h-full">
                                <div className="rounded-full w-12 h-12 bg-primary flex items-center justify-center ml-4 mb-16">
                                    <span className="text-dark-400 font-bold text-[16px] mb-0">10</span>
                                </div>
                                <div className="ml-3 flex flex-col justify-center" >
                                    <div className="flex items-center">
                                        <p className="text-[15px] text-white font-normal flex items-center mr-5 mt-0">
                                            {activeEvent.name}
                                            <RiTeamFill className="ml-3 w-6 h-6 mb-1 text-primary" />
                                        </p>
                                    </div>
                                    <div className="flex items-center text-[14px] text-white mt-5 ml-5">
                                        <FaClock className="mr-3 w-6 h-7 text-primary" />
                                        <span className="mr-8 text-[14px] font-normal">{activeEvent.time}</span>
                                        <MdLocationOn className="mr-2 w-6 h-7 text-primary" />
                                        <span className="mr-8 text-[14px] font-normal">{activeEvent.location}</span>
                                        <button className="bg-dark-400 text-white text-[14px] font-normal hover:font-semibold hover:bg-primary hover:text-dark-400 tracking-wide px-5 py-1 ml-10 rounded-full" style={{ 
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
          }}>
                                            Go with post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-4 right-[2px] mr-10 flex space-x-4">
                        <button className="bg-primary text-dark-400 text-[14px] font-base w-28 h-10 rounded-md">
                            Register
                        </button>
                        <button
                            className="bg-dark-500 text-white text-[14px] font-normal w-28 h-10 rounded-md flex items-center justify-center pl-4"
                            onClick={handleNextClick}
                        >
                            Next <GrFormNext className="ml-1 mt-[2px] text-secondary" size={20}></GrFormNext>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpcomingEvent;
