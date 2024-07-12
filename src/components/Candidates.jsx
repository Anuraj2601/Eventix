/* import React, { useState } from "react"; */
import {
    Card,
    CardBody,
    Typography,
    Avatar,
    /* Textarea, */
  } from "@material-tailwind/react";
  
  import Chart from "react-apexcharts";
  import SelectRemove from './SelectRemove';


  
  /* import { useNavigate } from "react-router-dom"; */
  
  const Candidates = () => {
   /*  const navigator = useNavigate(); */
  
   /*  const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
  
    const getClubDetails = (sname) => {
      navigator(`/club/${sname}`);
   */
      /* history.push(`/club/${sname}`, { name, image }); */
  
      //console.log(name);
   /*  }; */
  
    const chartConfig = {
      type: "pie",
      width: 80,
      height: 80,
      series: [20, 80],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        title: {
          show: "",
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#1E1E1E", "#AEC90A"],
        legend: {
          show: false,
        },
      },
    };
  
    const members = [
      {
        id: "1",
        name: "Kokulrajh",
        team: "Design",
        image: "../src/assets/dp.png",
      },
      {
        id: "2",
        name: "John",
        team: "Marketing",
        image: "../src/assets/dp.png",
      },
    ];
  
    return (
      <>
        <Card className="w-full bg-neutral-900">
          <CardBody>
            <div className="flex items-center justify-between p-4 mb-4 text-white">
              <div className="flex items-center gap-x-[178px]">
                <div></div>
                <div>Name</div>
                <div>Team</div>
                <div>OC Participation</div>
                <div>Attendance</div>
              </div>
            </div>
            <div className="">
              {members.map(({ name, image, team }, index) => (
              
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-xl mb-4"
                >
                  
                  <div className="flex items-center gap-x-[158px]">
                    <Avatar
                      size="sm"
                      src={image}
                      alt={name}
                      className="border-2 border-white rounded-full w-10 h-10"
                    />
                    <div>
                      <Typography color="white" variant="h6">
                        {name}
                      </Typography>
                    </div>
                    <div>
                      <Typography color="white" variant="h6" className="mt-5">
                        {team}
                      </Typography>
                    </div>
                    <div>
                      <Typography color="white" variant="h6" className="flex">
                        <Chart {...chartConfig} /> <span className="mt-4">80%</span> 
                      </Typography>
                    </div>
                    <div>
                      <Typography color="white" variant="h6" className="flex">
                        <Chart {...chartConfig} /> <span className="mt-4">80%</span>
                      </Typography>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                  <SelectRemove
                    onEdit={() => handleEdit(id)}
                    onDelete={() => handleDelete(id)}
                  />
                </div>
                </div>
              ))}
            </div>
            {/* {open && <LeaveModal open={open} handleOpen={handleOpen}/>} */}
            {/* <LeaveModal open={open} handleOpen={handleOpen}>
                    fancy modal
                  </LeaveModal> */}
          </CardBody>
        </Card>
  
  
  {/* <Card className="w-full bg-neutral-900">
    <CardBody>
        <table className="table-fixed border-separate border-spacing-2 border border-slate-500">
          <thead className="gap-x-40">
            <tr className="gap-40">
              <th>Song</th>
              <th>Artist</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table>
        </CardBody>
        </Card> */}
      </>
    );
  };
  
  export default Candidates;
  