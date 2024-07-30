import { FaRegCalendarPlus } from "react-icons/fa";
import { BiLogoZoom } from "react-icons/bi";
import { MdHowToVote } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";
import landingCover from "../assets/landingCover.png";

const HeroSection = () => {
    return (
        <div className="relative w-full h-full -mt-40 flex flex-col items-center justify-center">
            <img src={landingCover} alt="Landing Cover" className="w-full h-full mt-9 object-cover z-0" />
            <div className="relative  text-center mt-800">
                <h2 className="mt-5 px-3 py-2 font-medium text-4xl text-primary uppercase">WE GIVE,</h2>
                <span className="font-normal text-[15px] tracking-wide subpixel-antialiased leading-4 text-white">
                    Effortlessly organizing UCSC club events, meetings, elections, and announcements<br></br> in one place
                </span>
            </div>
            <div className="relative z-10 flex items-center justify-center w-full mt-20">
                <div className="gap-10 grid grid-cols-4" >
                    {[
                        { Icon: FaRegCalendarPlus, label: "Events" },
                        { Icon: BiLogoZoom, label: "Meetings" },
                        { Icon: MdHowToVote, label: "Votings" },
                        { Icon: HiSpeakerphone, label: "Announcements" }
                    ].map(({ Icon, label }) => (
                        <div key={label} className="flex flex-col items-center">
                            <div className="bg-dark-400 shadow-md rounded-md p-6 hover:bg-primary transition-colors group" style={{ 
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
          }}>
                                <Icon className="w-12 h-12 text-primary transition-colors group-hover:text-black"  />
                            </div>
                            <span className="text-white mt-3 font-normal text-base">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
