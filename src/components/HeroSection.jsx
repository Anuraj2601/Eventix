import { FaRegCalendarPlus } from "react-icons/fa";
import { BiLogoZoom } from "react-icons/bi";
import { MdHowToVote } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";
import landingCover from "../assets/landingCover.png";

const HeroSection = () => {
    return (
        <div className="relative w-full h-screen mt-20 flex flex-col items-center justify-center">
            <img src={landingCover} alt="Landing Cover" className="w-full h-full object-cover z-0" />
            <div className="relative z-10 text-center">
                <h2 className="mt-5 px-3 py-2 font-medium text-4xl text-primary uppercase">WE GIVE,</h2>
                <span className="font-normal text-base tracking-wide subpixel-antialiased">
                    Effortlessly organizing UCSC club events, meetings, elections, and announcements in one place
                </span>
            </div>
            <div className="relative z-10 flex items-center justify-center w-full mt-20">
                <div className="gap-10 grid grid-cols-4">
                    {[
                        { Icon: FaRegCalendarPlus, label: "Events" },
                        { Icon: BiLogoZoom, label: "Meetings" },
                        { Icon: MdHowToVote, label: "Votings" },
                        { Icon: HiSpeakerphone, label: "Announcements" }
                    ].map(({ Icon, label }) => (
                        <div key={label} className="flex flex-col items-center">
                            <div className="bg-dark-400 shadow-md rounded-md p-6 hover:bg-primary transition-colors group">
                                <Icon className="w-12 h-12 text-primary transition-colors group-hover:text-black" />
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
