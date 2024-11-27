import React, { useState, useEffect } from "react";
import { getPublicRegistrationsByEvent, updateCheckInStatus } from "../service/PublicService";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { IoPersonCircleOutline } from "react-icons/io5";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const PublicRegistration = ({ event }) => {
  const [eventRegistrations, setEventRegistrations] = useState([]);
  const [checkedInStatus, setCheckedInStatus] = useState({});
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  // Fetch event registrations when component mounts or event changes
  const fetchEventRegistrations = async () => {
    if (!event?.event_id) {
      setError("Event details are missing.");
      return;
    }

    try {
      const registrations = await getPublicRegistrationsByEvent(event.event_id);
      setEventRegistrations(registrations);
      console.log(registrations);


      const initialCheckedInStatus = registrations.reduce((acc, reg) => {
        acc[reg.id] = reg.checkedInStatus; // Use 'ereg_id' for unique identifier and '_checked' for status
        return acc;
      }, {});
      setCheckedInStatus(initialCheckedInStatus);
      
    } catch (error) {
      console.error("Error fetching event registration details", error);
      setError("Failed to fetch registration details.");
    }
  };

  // Handle check-in toggle
  const handleCheckInToggle = async (registrationId) => {
    try {
      // Optimistically update the local state
      const updatedRegistrations = eventRegistrations.map((registration) => {
        if (registration.id === registrationId) {
          // Toggle check-in status immediately
          registration.checkInStatus = registration.checkInStatus === 1 ? 0 : 1;
        }
        return registration;
      });
  
      setEventRegistrations(updatedRegistrations);
  
      // Optionally save to localStorage for persistence
      localStorage.setItem('registrations', JSON.stringify(updatedRegistrations));
  
      // Send the updated status to the backend
      const updatedStatus = updatedRegistrations.find(
        (reg) => reg.id === registrationId
      ).checkInStatus;
  
      await updateCheckInStatus(registrationId, updatedStatus);
    } catch (error) {
      console.error("Error updating check-in status", error);
      setError("Failed to update check-in status.");
  
      // Revert state in case of an error
      const revertedRegistrations = eventRegistrations.map((registration) => {
        if (registration.id === registrationId) {
          // Revert to previous state
          registration.checkInStatus = registration.checkInStatus === 1 ? 0 : 1;
        }
        return registration;
      });
  
      setEventRegistrations(revertedRegistrations);
    }
  };
  

  // Fetch registrations when event_id changes
  useEffect(() => {
    fetchEventRegistrations();
  }, [event?.event_id]);

  const getRegistrationCounts = () => {
    const totalRegistrations = eventRegistrations.length;
    const checkedInCount = eventRegistrations.filter(
      (reg) => reg.checkInStatus === 1    ).length;
    return { totalRegistrations, checkedInCount };
  };

  const { totalRegistrations, checkedInCount } = getRegistrationCounts();

  // Filter registrations based on search text
  const filteredRegistrations = eventRegistrations.filter((registration) => {
    const search = searchText.toLowerCase();
    return (
      registration.participantName.toLowerCase().includes(search) ||
      registration.email.toLowerCase().includes(search) ||
      registration.mobile.includes(search)
    );
  });

  // Data for the bar chart
  const chartData = {
    labels: ['Total Registrations', 'Checked-in'],
    datasets: [
      {
        label: 'Registrations',
        data: [totalRegistrations, checkedInCount],
        backgroundColor: ['#AEC90A', '#ffffff'], // Check-in bar color set to white
        borderRadius: 5, // Optional: For rounded bars
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // To control the aspect ratio
    scales: {
      x: {
        ticks: {
          display: true,
        },
        grid: {
          display: false,
        },
        // Adjust bar percentage and category percentage to center the bars
        barPercentage: 0.6, // Set the bar width to a percentage of the grid
        categoryPercentage: 1.0, // Ensure bars take up the full width of each category
      },
      y: {
        ticks: {
          beginAtZero: true,
          precision: 0, // Remove decimal places if needed
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: `Total Registrations: ${totalRegistrations} - Checked-in: ${checkedInCount}`,
        color: 'white',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw} registrations`;
          },
        },
      },
      // Add custom label above each bar with the value count
      datalabels: {
        display: true,
        align: 'end',
        anchor: 'end',
        color: '#ffffff', // Set the label color
        font: {
          weight: 'bold',
          size: 14,
        },
        formatter: (value) => value, // Display the raw value of each bar
      },
    },
  };

  return (
    <div className="p-6">
      <div className="justify-between mb-6">
        <h2 className="text-2xl text-white font-bold mb-4">Public Registrations</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <p className="mb-4 text-white">Total Registrations: {totalRegistrations}</p>
        <p className="mb-6 text-white">Checked-in: {checkedInCount}</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex justify-end">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by name, email, or mobile"
          className="p-2 border border-gray-300 bg-black rounded-full w-1/2"
        />
      </div>

      {/* Registrations List */}
      {filteredRegistrations.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="text-white p-4 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {filteredRegistrations.map((registration) => (
                <div
                  key={registration.ereg_id}
                  className="bg-black p-4 rounded-lg shadow-md flex justify-between items-center"
                  style={{ padding: "0 15px" }} // Adjust padding to avoid overflow
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-black text-[#AEC90A] rounded-full flex justify-center items-center">
                      {/* Default user icon */}
                      <span className="text-2xl text-[#AEC90A]">
                        <IoPersonCircleOutline size={80} />
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-lg font-medium">
                        {/* If participantName is null or empty, display "User" */}
                        {registration.participantName || "User"}
                      </p>
                      <p className="text-sm text-gray-400">{registration.email}</p>
                      <p className="text-sm text-gray-400">{registration.mobile}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={registration.checkInStatus === 1} 
                      onChange={() => handleCheckInToggle(registration.id)}
                      className="w-6 h-6 rounded-lg border-[#AEC90A] transition-all duration-300"
                      style={{
                        backgroundColor: registration.checkInStatus === 1 ? '#AEC90A' : '', // AE code color when checked
                        borderColor: registration.checkInStatus === 1 ? '#AEC90A' : '', // AE code color when checked
                      }}                   />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-white">No matching records found.</p>
      )}

      {/* Bar Chart for total registrations and checked-in counts */}
      <div className="mt-8">
        <h3 className="text-xl text-white font-semibold mb-3">Public Registration Status Chart</h3>
        <div className="bg-black" style={{ position: "relative", height: "250px" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default PublicRegistration;
