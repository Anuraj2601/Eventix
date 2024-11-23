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

const BudgetTable = () => {
  const [allBudgets, setAllBudgets] = useState([]);
  const eventColors = ["#FF5733", "#28A745", "#007BFF", "#FFC107"]; // Example color set for lines
  const [registrationsData, setRegistrationsData] = useState([]);
  const [checkedInStatus, setCheckedInStatus] = useState({});
   // Fetch budget and event registration data on mount
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
        const groupedData = registrationsArray.reduce((acc, { event_id, is_checked }) => {
          if (!acc[event_id]) {
            acc[event_id] = { event_id, registrations: 0, checkins: 0 };
          }

          // If registration count or check-in count is available, increment
          acc[event_id].registrations += 1; // Assuming one entry per registration
          if (is_checked) {
            acc[event_id].checkins += 1; // Only increment if checked-in
          }

          return acc;
        }, {});

        setRegistrationsData(Object.values(groupedData));

        // Initialize checked-in status (optional)
        const initialCheckedInStatus = registrationsArray.reduce((acc, { e_reg_id, is_checked }) => {
          acc[e_reg_id] = is_checked;
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

  const uniqueEvents = Array.from(
    new Set(allBudgets.map((item) => item.event_id))
  ).map((eventId) => {
    const event = allBudgets.find((item) => item.event_id === eventId);
    return { 
      event_id: eventId, 
      event_name: event ? event.event_name : `Event ${eventId}` // Ensure event_name exists
    };
  });

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
      data: eventBudgets
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
      data: eventBudgets
    };
  });

  const CustomTooltip = ({ payload, label }) => {
    if (payload && payload.length) {
      const { event_id, amount, budget_name, color } = payload[0].payload; // Make sure color exists
      return (
        <div style={{ backgroundColor: "black", padding: "10px", color: "white" }}>
          <p>Event ID: {event_id}</p>
          <p>Amount: {amount}</p>
          <p>Date: {label}</p>
          <p>Budget Name: {budget_name}</p>
          <p style={{ color: color }}>Event Color: {color}</p>
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
          <Typography color="white" variant="h4" className="mb-4 text-center">
            Event Reports
          </Typography>

          {/* Grouped Bar Chart for Costs and Incomes */}
          <Typography color="white" variant="h5" className="mb-4 text-center">
            Costs and Incomes Grouped by Event ID
          </Typography>
          <div className="mb-8" style={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={groupedBarData}
                margin={{ top: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="event_id"
                  tick={{ fill: "white" }}
                  stroke="white"
                  label={{ value: "Event ID", position: "insideBottom", fill: "white" }}
                />
                <YAxis tick={{ fill: "white" }} stroke="white" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="costs"
                  fill={barColors.costs}
                  name="Costs"
                  barSize={30}
                >
                  <LabelList dataKey="costs" position="top" fill="white" formatter={(value) => `Cost: ${value}`} />
                </Bar>
                <Bar
                  dataKey="incomes"
                  fill={barColors.incomes}
                  name="Incomes"
                  barSize={30}
                >
                  <LabelList dataKey="incomes" position="top" fill="white" formatter={(value) => `Income: ${value}`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

            
          <Typography color="white" variant="h5" className="mb-4 text-center">
  Costs Over Time
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

// Line Chart for Incomes
<Typography color="white" variant="h5" className="mb-4 text-center">
  Incomes Over Time
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
        Registrations and Check-ins Grouped by Event ID
      </Typography>
      <div style={{ height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={registrationsData} margin={{ top: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="event_id"
              tick={{ fill: 'white' }}
              stroke="white"
              label={{ value: "Event ID", position: "insideBottom", fill: 'white' }}
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
