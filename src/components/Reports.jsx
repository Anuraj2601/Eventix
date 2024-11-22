import React, { useState, useEffect } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import BudgetService from "../service/BudgetService";
import moment from "moment";
import EventRegistrationService from "../service/EventRegistrationService";
import UsersService from "../service/UsersService";

const BudgetTable = ({ clubId, event, onUpdate, estimatedBudget = 4000 }) => {
  const [allBudgets, setAllBudgets] = useState([]);
  const [filteredBudgets, setFilteredBudgets] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventRegistrations, setEventRegisterations] = useState([]); 
  const [checkedInStatus, setCheckedInStatus] = useState({});

  const getRegistrationCounts = () => {
    const totalRegistrations = eventRegistrations.length;
    const checkedInCount = eventRegistrations.filter(reg => checkedInStatus[reg.ereg_id]).length;
    return { totalRegistrations, checkedInCount };
  };

  const { totalRegistrations, checkedInCount } = getRegistrationCounts();

  const fetchEventRegistrations = async () => {
    const token = localStorage.getItem("token");
    const session_id = localStorage.getItem('session_id');

    try{
      const response2 = await EventRegistrationService.getAllEventRegistrations(token);
      const eventRegArray = response2.content ? response2.content.filter(eReg => eReg.event_id == event.event_id) : [];

      const registrationsWithUserDetails = await Promise.all(
        eventRegArray.map(async (evReg) => {
          try {
            const userResponse = await UsersService.getUserById(evReg.user_id, token);
            return { ...evReg, user: userResponse.users }; 
          } catch (userError) {
            console.error(`Error fetching details for user_id ${evReg.user_id}:`, userError);
            return { ...evReg, user: null };
          }
        })
      );

      setEventRegisterations(registrationsWithUserDetails);

      const initialCheckedInStatus = registrationsWithUserDetails.reduce((acc, reg) => {
        acc[reg.ereg_id] = reg._checked;
        return acc;
      }, {});
      setCheckedInStatus(initialCheckedInStatus);
    } catch (err) {
      console.log("Error while fetching event registration details", err);
    }
  }

  useEffect(() => {
    fetchEventRegistrations();
  }, []);

  useEffect(() => {
    const fetchBudgetItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await BudgetService.getAllBudgets(token);
        const budgetArray = response.content.filter((item) => item.event_id === event.event_id) || [];
        setAllBudgets(budgetArray);
        setFilteredBudgets(budgetArray);
      } catch (error) {
        console.error("Error fetching budget items", error);
      }
    };
    fetchBudgetItems();
  }, [event.event_id]);

  const formatCreatedAt = (createdAtArray) => {
    if (Array.isArray(createdAtArray) && createdAtArray.length === 7) {
      const [year, month, day, hour, minute, second] = createdAtArray;
      const date = new Date(year, month - 1, day, hour, minute, second);
      return moment(date).format("YYYY-MM-DD");
    }
    return "Invalid Date";
  };

   const handleFilter = () => {
    if (!startDate || !endDate) return;

    const filtered = allBudgets.filter((item) => {
      const itemDate = moment(formatCreatedAt(item.created_at), "YYYY-MM-DD");
      const start = moment(startDate, "YYYY-MM-DD");
      const end = moment(endDate, "YYYY-MM-DD");
      return itemDate.isBetween(start, end, "day", "[]");
    });

    setFilteredBudgets(filtered.length > 0 ? filtered : allBudgets);
  };
  const sortedBudgets = [...filteredBudgets].sort((a, b) => {
    return moment(formatCreatedAt(a.created_at)).isBefore(moment(formatCreatedAt(b.created_at))) ? -1 : 1;
  });

  const lineData = sortedBudgets.map((item, index) => {    const prevCost = index > 0 ? sortedBudgets[index - 1].cost : 0;
    const prevIncome = index > 0 ? sortedBudgets[index - 1].income : 0;
  
    // Return the processed item with the appropriate values
    return {
    
    date: formatCreatedAt(item.created_at),
    cost: item.budget_type === "COST" ? item.budget_amount : prevCost,
    income: item.budget_type === "INCOME" ? item.budget_amount : prevIncome,
    label: item.budget_name,
  };
});  
  const costData = sortedBudgets
  .filter((item) => item.budget_type === "COST")
  .map((item) => ({
    date: formatCreatedAt(item.created_at),
    amount: item.budget_amount,
    label: item.budget_name,
  }));

const incomeData = sortedBudgets
  .filter((item) => item.budget_type === "INCOME")
  .map((item) => ({
    date: formatCreatedAt(item.created_at),
    amount: item.budget_amount,
    label: item.budget_name,
  }));


  
  const totalCosts = filteredBudgets
    .filter((item) => item.budget_type === "COST")
    .reduce((total, item) => total + item.budget_amount, 0);

  const totalIncomes = filteredBudgets
    .filter((item) => item.budget_type === "INCOME")
    .reduce((total, item) => total + item.budget_amount, 0);

  return (
    <div>
      <Card className="w-full bg-black mb-6">
        <CardBody>
          <Typography color="white" variant="h4" className="mb-4 text-center">
            Event Reports
          </Typography>
          <div className="flex gap-4 mb-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={moment().format("YYYY-MM-DD")}
              className="bg-black text-white p-2 rounded-full"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              className="bg-black text-white p-2 rounded-full"
            />
            <button
              onClick={handleFilter}
              disabled={!startDate || !endDate}
              className={`px-4 py-2 rounded-full ${
                startDate && endDate ? "bg-[#AEC90A] text-black" : "bg-gray-500 text-gray-200"
              }`}
            >
              Filter
            </button>
          </div>


          <div className="mb-4" style={{ height: 400 }}>
  {/* Scatter Plot for Costs */}
  <Typography color="white" variant="h5" className="mb-4 text-center">
    Costs Over Time
  </Typography>
  <ResponsiveContainer width="100%" height="50%">
    <LineChart data={costData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        name="Date"
        type="category"
        title="Date"
        tickFormatter={(tick) => moment(tick).format("MMM D, YYYY")}
        tick={{ fill: "white" }}
        stroke="white"
      />
      <YAxis
        name="Amount"
        title="Amount (Rs)"
        tick={{ fill: "white" }}
        stroke="white"
      />
      <Tooltip
        formatter={(value, name, props) => [`Rs. ${value}`, props.payload.label]}
        cursor={{ strokeDasharray: "3 3" }}
      />
      <Legend />
      <Line
        type="monotone"
        dataKey="amount"
        stroke="#808080"
        strokeWidth={2}
        dot={{ r: 6 }}
        activeDot={{ r: 8 }}
        label={{ position: "top", fill: "white", fontWeight: "bold" }}
      />
    </LineChart>
  </ResponsiveContainer>

  {/* Scatter Plot for Incomes */}
  <Typography color="white" variant="h5" className="mt-8 mb-4 text-center">
    Incomes Over Time
  </Typography>
  <ResponsiveContainer width="100%" height="50%">
    <LineChart data={incomeData} >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        name="Date"
        type="category"
        title="Date"
        tickFormatter={(tick) => moment(tick).format("MMM D, YYYY")}
        tick={{ fill: "white" }}
        stroke="white"
      />
      <YAxis
        name="Amount"
        title="Amount (Rs)"
        tick={{ fill: "white" }}
        stroke="white"
      />
      <Tooltip
        formatter={(value, name, props) => [`Rs. ${value}`, props.payload.label]}
        cursor={{ strokeDasharray: "3 3" }}
      />
      <Legend />
      <Line
        type="monotone"
        dataKey="amount"
        stroke="#AEC90A"
        strokeWidth={2}
        dot={{ r: 6 }}
        activeDot={{ r: 8 }}
        label={{ position: "top", fill: "white", fontWeight: "bold" }}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

         

<Typography color="white" variant="h5" className="mt-80  text-center">            Total Costs vs. Incomes
          </Typography>
          <div className="mb-4" style={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{ name: "Total", cost: totalCosts, income: totalIncomes }]}
 margin={{ top: 80,  }}>                <CartesianGrid strokeDasharray="3 3" className="mb-4 p-10"/>
                <XAxis />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="cost"
                  fill="#808080"
                  barSize={60}
                  label={{ position: "top", fill: "white", fontWeight: "bold" }}
                />
                <Bar
                  dataKey="income"
                  fill="#AEC90A"
                  barSize={60}
                  label={{ position: "top", fill: "white", fontWeight: "bold" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <Typography color="white" variant="h5" className="mb-4 p-5 text-center">
            Total Registrations vs Checked-in Count
          </Typography>
          <div className="mb-4 p-10" style={{ height: 400, overflow: "visible" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{ name: "Total Registrations", total: totalRegistrations, checkedIn: checkedInCount }]}
              margin={{ top: 80,  }}>
                <CartesianGrid strokeDasharray="3 3" className="mb-4 p-10"/>
                <XAxis />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="total"
                  fill="#808080"
                  barSize={60}
                  label={{ position: "top", fill: "white", fontWeight: "bold" }}
                />
                <Bar
                  dataKey="checkedIn"
                  fill="#AEC90A"
                  barSize={60}
                  label={{ position: "top", fill: "white", fontWeight: "bold" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BudgetTable;
