import React, { useState, useEffect } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  LabelList,
} from "recharts";
import BudgetService from "../service/BudgetService";
import moment from "moment";
import EventRegistrationService from "../service/EventRegistrationService";
import EventService from "../service/EventService";

const BudgetTable = () => {
  const [allBudgets, setAllBudgets] = useState([]);
  const eventColors = ["#FF5733", "#28A745", "#007BFF", "#FFC107"]; // Example color set for lines
  const [registrationsData, setRegistrationsData] = useState([]);
  const [checkedInStatus, setCheckedInStatus] = useState({});
  const [eventNames, setEventNames] = useState({}); // To store event names
  const [uniqueEvents, setUniqueEvents] = useState([]); // State for storing unique events
  const [events, setEvents] = useState([]);  // Initialize state with an empty array
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await EventService.getAllEventslanding();
        setEvents(eventsData.content); // Store the fetched events in state
  
        // Map through events and create an object with event_id as key and event_name as value
        const eventNamesObject = eventsData.content.reduce((acc, event) => {
          acc[event.event_id] = event.name; // Assuming event has `event_id` and `name`
          return acc;
        }, {});
        setEventNames(eventNamesObject); // Set the event names to state
  
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error.message);
      }
    };
  
    fetchEvents();
  }, []);
  

  if (error) {
    return <div>Error: {error}</div>;
  }// Dependency array: fetch again whenever allBudgets changes

  useEffect(() => {
    if (Object.keys(eventNames).length > 0 && allBudgets.length > 0) {
      const uniqueEventsList = allBudgets
        .map((budget) => ({
          event_id: budget.event_id,
          event_name: eventNames[budget.event_id] || `Event ${budget.event_id}`,
        }))
        .filter((value, index, self) =>
          index === self.findIndex((t) => t.event_id === value.event_id)
        );
      setUniqueEvents(uniqueEventsList);
    }

    console.log("Event Names:", eventNames);
    console.log("All Budgets:", allBudgets);
  }, [eventNames, allBudgets]);
  

useEffect(() => {
  const fetchData = async () => {
    const token = localStorage.getItem("token");

    try {
      // Fetch all budget items
      const budgetResponse = await BudgetService.getAllBudgets(token);
      setAllBudgets(budgetResponse.content || []);

      // Fetch event registrations
      const regResponse = await EventRegistrationService.getAllEventRegistrations(token);
      const registrationsArray = regResponse.content || [];

      // Process event registrations
      const groupedData = registrationsArray.reduce((acc, { event_id, _checked }) => {
        if (!acc[event_id]) {
          acc[event_id] = { event_id, registrations: 0, checkins: 0 };
        }
      
        // Increment registrations count
        acc[event_id].registrations += 1; // Assuming one entry per registration

        // Ensure _checked is defined, default to false if not available
        const checked = _checked === undefined ? false : _checked;

        // Increment checkins count if _checked is true
        if (checked === true) {  // Explicitly check if _checked is true (boolean)
          acc[event_id].checkins += 1;
        }
      
        return acc;
      }, {});
      
      setRegistrationsData(Object.values(groupedData));
      
      // Initialize checked-in status (optional)
      const initialCheckedInStatus = registrationsArray.reduce((acc, { e_reg_id, _checked }) => {
        const checked = _checked === undefined ? false : _checked; // Default to false if undefined
        acc[e_reg_id] = checked;
        return acc;
      }, {});
      
      setCheckedInStatus(initialCheckedInStatus);

    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  fetchData();
}, []);



  useEffect(() => {
    console.log("Fetched registrations data: ", registrationsData);
  }, [registrationsData]);

  const formatCreatedAt = (createdAtArray) => {
    if (Array.isArray(createdAtArray) && createdAtArray.length === 7) {
      const [year, month, day, hour, minute, second] = createdAtArray;
      const date = new Date(year, month - 1, day, hour, minute, second);
      return moment(date).format("YYYY-MM-DD");
    }
    return "Invalid Date";
  };

  // Grouped Bar Chart Data (Costs and Incomes by Event ID)
  const groupedBarData = [];
  allBudgets.forEach((item) => {
    const existingEvent = groupedBarData.find(
      (entry) => entry.event_id === item.event_id
    );
    if (existingEvent) {
      existingEvent.costs =
        item.budget_type === "COST"
          ? (existingEvent.costs || 0) + item.budget_amount
          : existingEvent.costs || 0;
      existingEvent.incomes =
        item.budget_type === "INCOME"
          ? (existingEvent.incomes || 0) + item.budget_amount
          : existingEvent.incomes || 0;
    } else {
      groupedBarData.push({
        event_id: item.event_id,
        costs: item.budget_type === "COST" ? item.budget_amount : 0,
        incomes: item.budget_type === "INCOME" ? item.budget_amount : 0,
      });
    }
  });

  const getEventName = (event_id) => {
    return eventNames[event_id] || `Event ${event_id}`; // Fallback if event name not found
  };


  // Generate a unique color for each event ID
  const generateColor = (index) => {
    const colors = ["#FF5733", "#28A745", "#1E90FF", "#FF1493", "#FFD700"];  // Add more colors if needed
    return colors[index % colors.length];  // Cycle through the colors
  };

  // Costs Data for each event
  const costsData = uniqueEvents.map((event) => {
    const eventBudgets = allBudgets
      .filter((item) => item.budget_type === "COST" && item.event_id === event.event_id)
      .map((item) => ({
        date: formatCreatedAt(item.created_at),
        amount: item.budget_amount,
        budget_name: item.budget_name,  // Show budget name instead of type
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sorting dates in descending order
    
      return {
        event_id: event.event_id,
        event_name: event.event_name,
        data: eventBudgets,
      };
  });

  // Incomes Data for each event
  const incomesData = uniqueEvents.map((event) => {
    const eventBudgets = allBudgets
      .filter((item) => item.budget_type === "INCOME" && item.event_id === event.event_id)
      .map((item) => ({
        date: formatCreatedAt(item.created_at),
        amount: item.budget_amount,
        budget_name: item.budget_name,  // Show budget name instead of type
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sorting dates in descending order
  
      return {
        event_id: event.event_id,
        event_name: event.event_name,
        data: eventBudgets,
      };
  });

  const CustomTooltip = ({ payload, label }) => {
    if (payload && payload.length) {
      const { event_id, amount, budget_name } = payload[0].payload; // Ensure color exists
      return (
        <div style={{ backgroundColor: "black", padding: "10px", color: "white" }}>
          <p>Event: {eventNames[event_id]}</p> {/* Display event name */}
          <p>Amount: {amount}</p>
          <p>Date: {label}</p>
          <p>Budget Name: {budget_name}</p>
        </div>
      );
    }
    return null;
  };
  



  // Colors for Bars and Lines
  const barColors = { costs: "#FF5733", incomes: "#28A745", registrations: "#007BFF", checkins: "#FFC107" };

  return (
    <div>
      <Card className="w-full bg-black mb-6">
        <CardBody>
        
         
       
       
          {uniqueEvents.length > 0 ? (
            uniqueEvents.map((event) => (
              <p key={event.event_id}>
               
              </p>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="px-4 py-2 text-center">No events found</td>
            </tr>
          )}
       
          {/* Grouped Bar Chart for Costs and Incomes */}
          <Typography color="white" variant="h5" className="mb-4 text-center">
            Costs and Incomes Grouped by Events
          </Typography>
          <div className="mb-8" style={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
  <BarChart data={groupedBarData} margin={{ top: 20, bottom: 20 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis
      dataKey="event_id"
      tick={{ fill: "white" }}
      stroke="white"
      label={{ value: "Event", position: "insideBottom", fill: "white" }}
      tickFormatter={getEventName} // Format tick labels as event names
    />
    <YAxis tick={{ fill: "white" }} stroke="white" />
    <Tooltip />
    <Legend />
    <Bar dataKey="costs" fill={barColors.costs} name="Costs" barSize={30}>
      <LabelList dataKey="costs" position="top" fill="white" formatter={(value) => `Cost: ${value}`} />
    </Bar>
    <Bar dataKey="incomes" fill={barColors.incomes} name="Incomes" barSize={30}>
      <LabelList dataKey="incomes" position="top" fill="white" formatter={(value) => `Income: ${value}`} />
    </Bar>
  </BarChart>
</ResponsiveContainer>
          </div>

            
          <Typography color="white" variant="h5" className="mb-4 text-center">
  Costs Over Time for All Events
</Typography>
<div style={{ height: 400 }}>
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={costsData[0]?.data || []}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        tickFormatter={(tick) => moment(tick).format("MMM D, YYYY")}
        tick={{ fill: "white" }}
        stroke="white"
      />
      <YAxis tick={{ fill: "white" }} stroke="white" />
      <Tooltip content={<CustomTooltip />} />
      <Legend
  content={({ payload }) => (
    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
      {payload.map((entry, index) => (
        <li
          key={index}
          style={{
            color: entry.color,
            display: 'flex',
            alignItems: 'center',
            marginBottom: '5px',
            justifyContent: 'center', // This will center align the legend
          }}
        >
          <span
            style={{
              width: '10px',
              height: '10px',
              backgroundColor: entry.color,
              borderRadius: '50%',
              marginRight: '5px',
            }}
          ></span>
          {entry.value} {/* This will display the event name */}
        </li>
      ))}
    </ul>
  )}
/>

      {costsData.map((event, index) => (
        <Line
          key={event.event_id}
          type="monotone"
          dataKey="amount"
          data={event.data || []} // Ensure there is data
          stroke={generateColor(index)}
          name={event.event_name}
          dot={{ r: 6 }}
          activeDot={{ r: 8 }}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
</div>

<Typography color="white" variant="h5" className="mb-4 text-center">
  Incomes Over Time for All Events
</Typography>
<div style={{ height: 400 }}>
  <ResponsiveContainer width="100%" height="100%">
    <LineChart>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        tickFormatter={(tick) => moment(tick).format("MMM D, YYYY")}
        tick={{ fill: "white" }}
        stroke="white"
      />
      <YAxis tick={{ fill: "white" }} stroke="white" />
      <Tooltip content={<CustomTooltip />} />
      <Legend
  content={({ payload }) => (
    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
      {payload.map((entry, index) => (
        <li
          key={index}
          style={{
            color: entry.color,
            display: 'flex',
            alignItems: 'center',
            marginBottom: '5px',
            justifyContent: 'center', // This will center align the legend
          }}
        >
          <span
            style={{
              width: '10px',
              height: '10px',
              backgroundColor: entry.color,
              borderRadius: '50%',
              marginRight: '5px',
            }}
          ></span>
          {entry.value} {/* This will display the event name */}
        </li>
      ))}
    </ul>
  )}
/>

      {incomesData.map((event, index) => (
        <Line
          key={event.event_id}
          type="monotone"
          dataKey="amount"
          data={event.data} // Use event-specific data
          stroke={generateColor(index)} // Assign color dynamically
          name={event.event_name}
          dot={{ r: 6 }}
          activeDot={{ r: 8 }}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
</div>


<Typography color="white" variant="h5" className="mb-4 text-center">
        Registrations and Check-ins Grouped by Events
      </Typography>
      <div style={{ height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
  <BarChart data={registrationsData} margin={{ top: 20, bottom: 20 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis
      dataKey="event_id"
      tick={{ fill: 'white' }}
      stroke="white"
      label={{ value: "Event", position: "insideBottom", fill: 'white' }}
      tickFormatter={getEventName} // Format tick labels as event names
    />
    <YAxis tick={{ fill: 'white' }} stroke="white" />
    <Tooltip />
    <Legend />
    <Bar
      dataKey="registrations"
      fill="#808080"  // Gray color for registrations
      name="Registrations"
      barSize={30}
    >
      <LabelList dataKey="registrations" position="top" fill="white" />
    </Bar>
    <Bar
      dataKey="checkins"
      fill="#AEC90A"  // Green color for check-ins
      name="Check-ins"
      barSize={30}
    >
      <LabelList dataKey="checkins" position="top" fill="white" />
    </Bar>
  </BarChart>
</ResponsiveContainer>
      </div>

        </CardBody>
      </Card>
    </div>
  );
};

export default BudgetTable;
