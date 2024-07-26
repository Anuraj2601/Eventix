// export default MemberOCJoinForm
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
} from "@material-tailwind/react";
// import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { HiChevronDown } from "react-icons/hi";

const menuItems = [
  {
    title: "Design Team",
  },
  {
    title: "Program Team",
  },
  {
    title: "Finance Team",
  },
];

const MemberOCJoinForm = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);

  return (
    <>
      <div className="fixed inset-0 flex flex-col md:flex-row">
        <Sidebar className="flex-shrink-0 w-full md:w-auto" />
        <div className="flex flex-col flex-1 overflow-auto">
          <Navbar className="sticky top-0 z-10 p-4" />
          <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-auto p-4 md:p-10">
            <div className="flex flex-col items-center justify-center relative mt-10 w-full">
              <div className="bg-[#AEC90A] text-[#0B0B0B] p-1 rounded-lg font-semibold absolute -top-4">
                Apply for Organizing Committee
              </div>
              <div className="bg-[#0B0B0B] flex flex-col items-center justify-center border-2 border-[#AEC90A] rounded-xl w-full md:w-3/5 py-9">
                <form action="" className="w-full px-4 md:px-2">
                  {/* Personal Information */}
                  <div className="flex flex-col gap-3">
                    <label htmlFor="name" className="text-white">
                      Name with Initials*
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Perera A.B.C."
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="email" className="text-white">
                      Student Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="2021cs001@stu.ucsc.cmb.ac.lk"
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="phone" className="text-white">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="text"
                      placeholder="Phone Number"
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    />
                  </div>

                  {/* Academic Information */}
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="student-id" className="text-white">
                      Registration No *
                    </label>
                    <input
                      id="student-id"
                      type="text"
                      placeholder="2021cs001"
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="" className="text-white">
                      Year of Study *
                    </label>
                    <Menu open={openMenu2} handler={setOpenMenu2} allowHover>
                      <MenuHandler>
                        <Button
                          variant="text"
                          className="flex items-center justify-between gap-3 text-base font-normal capitalize tracking-normal border-2 border-[#AEC90A] p-3 rounded-none w-80 text-[#9ca3af]"
                        >
                          Year{" "}
                          <HiChevronDown
                            strokeWidth={2.5}
                            className={`h-3.5 w-3.5 transition-transform ${
                              openMenu2 ? "rotate-180" : ""
                            }`}
                          />
                        </Button>
                      </MenuHandler>
                      <MenuList className="bg-[#0B0B0B] p-0 border-[#AEC90A]">
                        <ul className="col-span-4 flex w-80 flex-col gap-1 text-white ">
                          <MenuItem className="hover:bg-slate-900 p-2 ">
                            1st Year
                          </MenuItem>
                          <MenuItem className="hover:bg-slate-900 p-2 ">
                            2nd Year
                          </MenuItem>
                          <MenuItem className="hover:bg-slate-900 p-2 ">
                            3rd Year
                          </MenuItem>
                          <MenuItem className="hover:bg-slate-900 p-2 ">
                            4th Year
                          </MenuItem>
                        </ul>
                      </MenuList>
                    </Menu>
                  </div>

                  {/* <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="major" className="text-white">
                      Major/Department *
                    </label>
                    <input
                      id="major"
                      type="text"
                      placeholder="Major/Department"
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    />
                  </div> */}

                  {/* Position Information */}
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="position" className="text-white">
                      Position Applied For *
                    </label>
                    <input
                      id="position"
                      type="text"
                      placeholder="Position Applied For"
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="" className="text-white">
                      Team*
                    </label>
                    <Menu open={openMenu} handler={setOpenMenu} allowHover>
                      <MenuHandler>
                        <Button
                          variant="text"
                          className="flex items-center justify-between gap-3 text-base font-normal capitalize tracking-normal border-2 border-[#AEC90A] p-3 rounded-none w-80 text-[#9ca3af]"
                        >
                          Team{" "}
                          <HiChevronDown
                            strokeWidth={2.5}
                            className={`h-3.5 w-3.5 transition-transform ${
                              openMenu ? "rotate-180" : ""
                            }`}
                          />
                        </Button>
                      </MenuHandler>
                      <MenuList className="bg-[#0B0B0B] p-0 border-[#AEC90A]">
                        <ul className="col-span-4 flex w-80 flex-col gap-1 text-white">
                          {menuItems.map(({ title }) => (
                            <a href="#" key={title}>
                              <MenuItem className="hover:bg-slate-900 p-2 ">
                                {title}
                              </MenuItem>
                            </a>
                          ))}
                        </ul>
                      </MenuList>
                    </Menu>
                  </div>
                  {/* <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="team" className="text-white">
                      Team *
                    </label>
                    <input
                      id="team"
                      type="text"
                      placeholder="Team"
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    />
                  </div> */}

                  {/* Experience and Skills */}
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="experience" className="text-white">
                      Previous Experience
                    </label>
                    <textarea
                      id="experience"
                      placeholder="Describe your relevant experience"
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    ></textarea>
                  </div>
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="skills" className="text-white">
                      Skills and Qualifications
                    </label>
                    <textarea
                      id="skills"
                      placeholder="Describe your relevant skills and qualifications"
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    ></textarea>
                  </div>
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="resume" className="text-white">
                      Resume Upload
                    </label>
                    <input
                      id="resume"
                      type="file"
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    />
                  </div>

                  {/* Motivation and Goals */}
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="motivation" className="text-white">
                      Why do you want to join the organizing committee? *
                    </label>
                    <textarea
                      id="motivation"
                      placeholder="Describe your motivation"
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    ></textarea>
                  </div>
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="goals" className="text-white">
                      What do you hope to achieve in this role? *
                    </label>
                    <textarea
                      id="goals"
                      placeholder="Describe your goals"
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    ></textarea>
                  </div>

                  {/* Availability */}
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="availability" className="text-white">
                      Are you available for meetings and events? *
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        id="availability-yes"
                        name="availability"
                        value="yes"
                        className="text-[#AEC90A]"
                      />
                      <label htmlFor="availability-yes" className="text-white">
                        Yes
                      </label>
                      <input
                        type="radio"
                        id="availability-no"
                        name="availability"
                        value="no"
                        className="text-[#AEC90A]"
                      />
                      <label htmlFor="availability-no" className="text-white">
                        No
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="constraints" className="text-white">
                      Any time constraints or availability issues?
                    </label>
                    <textarea
                      id="constraints"
                      placeholder="Describe any time constraints or availability issues"
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    ></textarea>
                  </div>

                  {/* References
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="reference-1" className="text-white">
                      Reference 1: Name, Contact Information, Relationship *
                    </label>
                    <input
                      id="reference-1"
                      type="text"
                      placeholder="Reference 1"
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3 mt-5">
                    <label htmlFor="reference-2" className="text-white">
                      Reference 2: Name, Contact Information, Relationship *
                    </label>
                    <input
                      id="reference-2"
                      type="text"
                      placeholder="Reference 2"
                      className="p-3 border-2 border-[#AEC90A] bg-[#0B0B0B] text-white w-full"
                    />
                  </div> */}

                  {/* Agreement */}
                  <div className="flex items-center gap-3 mt-5">
                    <input
                      id="agreement"
                      type="checkbox"
                      className="text-[#AEC90A]"
                    />
                    <label htmlFor="agreement" className="text-white">
                      I agree to the terms and conditions *
                    </label>
                  </div>

                  <div className="flex items-center justify-center mt-6 gap-4">
                    <Button className="border-2 border-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#AEC90A]">
                      Cancel
                    </Button>
                    <Button className="bg-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#0B0B0B]">
                      Submit Application
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberOCJoinForm;
