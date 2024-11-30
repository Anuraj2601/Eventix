import { FaRegCalendarPlus } from "react-icons/fa";
import { BiLogoZoom } from "react-icons/bi";
import { MdHowToVote } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="b-0 border-t-2 w-full mt-0 bg-dark-500 text-white flex flex-col items-center py-0" >
      <div className="text-center mb-6 mt-10">
        <h2 className="text-[15px] text-[#AEC90A] tracking-wide font-normal">
          EventiX <span className="text-white tracking-wide">The Centralized System for UCSC</span>
        </h2>
        <p className="text-white text-[14px] font-thin tracking-wide leading-6">
          Our platform offers a robust set of features tailored to meet the needs of event organizers, <br />ensuring a seamless and successful event experience.
        </p>
      </div>
      <div className="flex space-x-4 mb-4 mt-3">
        <div className="flex items-center justify-center w-10 h-10 bg-[#AEC90A] rounded-full">
          <FaRegCalendarPlus className="w-6 h-6 text-dark-background" />
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-[#AEC90A] rounded-full">
          <BiLogoZoom className="w-6 h-6 text-dark-background" />
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-[#AEC90A] rounded-full">
          <MdHowToVote className="w-6 h-6 text-dark-background" />
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-[#AEC90A] rounded-full">
          <HiSpeakerphone className="w-6 h-6 text-dark-background" />
        </div>
      </div>
      <div className="text-white text-[14px] font-normal mt-5">
        <span>&copy; Copyright for EventiX</span>
      </div>
    </footer>
  );
}

export default Footer;
