import { HiMiniUserGroup } from "react-icons/hi2";
import ieee from "../assets/ieee.jpeg";
import dp from "../assets/dp.png";
import gavel from "../assets/gavel.jpeg";
import rotract from "../assets/rotract.jpeg";
import pahasara from "../assets/pahasara.png";
import isaca from "../assets/isaca.png";
import { BsCalendar2EventFill } from 'react-icons/bs';
import { GrTechnology } from 'react-icons/gr';
import { RiDiscountPercentFill } from 'react-icons/ri';

const Clubsforu = () => {
    return (
        <div className="flex flex-col items-center mt-40">
            <div className="flex items-center bg-dark-background p-4 rounded-lg">
                <HiMiniUserGroup className="text-primary bg-dark-background rounded-full w-10 h-10 shadow-lg" />
                <span className="text-lg font-normal pl-3 text-primary uppercase">Clubs for you</span>
            </div>

            <div className="bg-dark-400 w-[82vw] h-[76vh] mt-2 rounded-lg flex items-center relative p-10" style={{ 
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
          }}>
                <img src={ieee} alt="IEEE" className="w-[300px] h-[300px] rounded-xl " style={{ 
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
          }}/>

                <div className="ml-5 flex flex-col w-full mt-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between w-full">

                            <h2 className="font-base text-lg tracking-wider text-white my-2">IEEE Student Chapter 25</h2>
                            <div className="flex space-x-4">
                                <button className="bg-gradient-to-r from-primary to-primary hover:bg-secondary text-dark-background font-medium text-[15px] w-28 h-10 py-1 px-5 rounded">
                                    Join
                                </button>
                                <button className="bg-dark-400 text-secondary font-medium tracking-wide text-[15px] w-28 h-10 rounded border border-primary hover:bg-dark-500">
                                    Ignore
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className="mt-4 space-y-4" >

                        <div className="flex items-center text-white mb-4 bg-dark-background p-4 rounded-lg hover:shadow-xl" style={{ 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
          }}>
                            <div className="bg-secondary w-12 h-12 rounded-full flex items-center justify-center mr-3">
                                <BsCalendar2EventFill className="text-2xl text-dark-background" />
                            </div>
                            <div>
                                <span className="font-base tracking-wider text-[16px] ml-4 leading-[30px] text-primary uppercase">Career Development:</span>
                                <p className="text-[14px] leading-[30px] tracking-wider ml-4 font-normal hover:shadow-xl">You will get opportunities for career advancement through workshops.</p>
                            </div>
                        </div>

                        <div className="flex items-center text-white mb-4 bg-dark-background p-4 rounded-lg hover:shadow-xl" style={{ 
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
          }}>
                            <div className="bg-secondary w-12 h-12 rounded-full flex items-center justify-center mr-3">
                                <GrTechnology className="text-2xl text-dark-background" />
                            </div>
                            <div>
                                <span className="font-base tracking-wider text-lg ml-4 leading-[30px] text-primary uppercase">Innovation and Research:</span>
                                <p className="text-[14px] leading-[30px] tracking-wider ml-4 font-normal">Stay updated with the latest advancements in technology and engineering.</p>
                            </div>
                        </div>

                        <div className="flex items-center text-white bg-dark-background p-4 rounded-lg hover:shadow-xl" style={{ 
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
          }}>
                            <div className="bg-secondary w-12 h-12 rounded-full flex items-center justify-center mr-3">
                                <RiDiscountPercentFill className="text-3xl text-dark-background" />
                            </div>
                            <div>
                                <span className="font-base tracking-wider text-lg ml-4 leading-[30px] text-primary uppercase">Discounts:</span>
                                <p className="text-[14px] leading-[30px] tracking-wider ml-4 font-normal">Reduced fees for IEEE events, publications, and continuing education courses.</p>
                            </div>
                        </div>


                    </div>

                    <div className="absolute bottom-10 right-[923px] shadow-lg mb-[81px] flex items-center bg-black rounded-full bg-opacity-80">
                        <div className=" w-[190px] h-8 flex items-center px-6 py-6 rounded-md">
                            <img src={dp} alt="Small Image 1" className="w-10 h-10 rounded-full border-2 border-black -ml-2" />
                            <img src={dp} alt="Small Image 2" className="w-10 h-10 rounded-full border-2 border-black -ml-2" />
                            <img src={dp} alt="Small Image 3" className="w-10 h-10 rounded-full border-2 border-black -ml-2" />
                            <span className="text-white text-lg font-normal ml-2">200+</span>
                        </div>
                    </div>


                </div>
            </div>

            <div className="bg-dark-400 mt-20 w-[82vw] h-72 rounded-lg grid grid-cols-4 gap-20 p-5 text-[14px] font-normal mb-40" style={{ 
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
          }}>
                {[
                    { img: gavel, title: "Gavel AGM 24", border: "border-red-800" },
                    { img: rotract, title: "Rotract of UCSC", border: "border-purple-800" },
                    { img: pahasara, title: "Pahasara Club", border: "border-yellow-800" },
                    { img: isaca, title: "ISACA student Group", border: "border-blue-600" }
                ].map((club, index) => (
                    <div key={index} className="relative flex flex-col items-center group">
                        <img
                            src={club.img}
                            alt={club.title}
                            className={`w-[200px] h-[200px] object-cover rounded-lg mt-2 ${club.border} transform transition-transform duration-500 group-hover:scale-110 group-hover:brightness-50`}
                            style={{ 
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                              }}
                        />
                        <span className="text-white text-center mt-2 tracking-wide">{club.title}</span>
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center space-x-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            <button className="bg-primary text-dark-400 font-bold px-3 py-1 rounded-full w-24">Join</button>
                            <button className="bg-white text-dark-400 font-bold px-3 py-1 rounded-full w-24">View</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Clubsforu;
