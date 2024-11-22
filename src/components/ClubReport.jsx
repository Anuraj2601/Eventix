import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import BudgetService from "../service/BudgetService";
import moment from "moment";
import EventRegistrationService from "../service/EventRegistrationService";


const BudgetTable = () => {
  const [allBudgets, setAllBudgets] = useState([]);
  const [groupedBudgets, setGroupedBudgets] = useState({});
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filteredBudgets, setFilteredBudgets] = useState([]);
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
        const budgetArray = response.content || [];

        // Group by event_id
        const groupedData = budgetArray.reduce((acc, item) => {
          if (!acc[item.event_id]) acc[item.event_id] = [];
          acc[item.event_id].push(item);
          return acc;
        }, {});
        setAllBudgets(budgetArray);
        setGroupedBudgets(groupedData);
      } catch (error) {
        console.error("Error fetching budget items", error);
      }
    };
    fetchBudgetItems();
  }, []);

  useEffect(() => {
    if (dateFrom && dateTo) {
      const filtered = allBudgets.filter(item => {
        const createdDate = moment(item.created_at);
        return createdDate.isBetween(dateFrom, dateTo, null, "[]");
      });
      setFilteredBudgets(filtered);
    }
  }, [dateFrom, dateTo, allBudgets]);

  const formatCreatedAt = (createdAtArray) => {
    if (Array.isArray(createdAtArray) && createdAtArray.length === 7) {
      const [year, month, day, hour, minute, second] = createdAtArray;
      const date = new Date(year, month - 1, day, hour, minute, second);
      return moment(date).format("YYYY-MM-DD");
    }
    return "Invalid Date";
  };

  const generateUniqueColor = (index) => {
    const colors = [
      "#FF5733", "#28A745",
      "#3498DB", "#E74C3C", "#F39C12", "#2ECC71", "#9B59B6",
    ];
    return colors[index % colors.length];
  };

  // Prepare Data for Charts
  const barChartData = Object.entries(groupedBudgets).map(([event_id, items]) => {
    const totalCost = items
      .filter((item) => item.budget_type === "COST")
      .reduce((total, item) => total + item.budget_amount, 0);
    const totalIncome = items
      .filter((item) => item.budget_type === "INCOME")
      .reduce((total, item) => total + item.budget_amount, 0);

    const totalRegistrations = items.reduce(
      (total, item) => total + (item.registration_count || 0),
      0
    );
    const checkedInCount = items.reduce(
      (total, item) => total + (item.checked_in_count || 0),
      0
    );

    return {
      event_id: `Event ${event_id}`,
      cost: totalCost,
      income: totalIncome,
      totalRegistrations,
      checkedInCount,
    };
  });

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "fromDate") setDateFrom(value);
    if (name === "toDate") setDateTo(value);
  };

  const isDateValid = dateFrom && dateTo && moment(dateFrom).isBefore(dateTo);

  return (
    <div>
      <Card className="w-full bg-black mb-6">
        <CardBody>
          <div className="mb-6">
            <Input
              type="date"
              name="fromDate"
              value={dateFrom}
              onChange={handleDateChange}
              className="mr-4"
            />
            <Input
              type="date"
              name="toDate"
              value={dateTo}
              onChange={handleDateChange}
            />
            <Button
              disabled={!isDateValid}
              className="ml-4"
              onClick={() => setFilteredBudgets(filteredBudgets)}
            >
              Filter
            </Button>
          </div>

          {/* Total Costs vs Incomes Bar Chart */}
          <Typography color="white" variant="h5" className="mb-4 text-center">
            Total Costs vs Incomes by Event
          </Typography>
          <div className="mb-6" style={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="event_id" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip />
                <Legend />
                {Object.entries(groupedBudgets).map(([event_id, items], index) => {
                  const costColor = generateUniqueColor(index);
                  const incomeColor = generateUniqueColor(index); // Light/Dark shades could be used if needed
                  return (
                    <React.Fragment key={event_id}>
                      <Bar
                        dataKey="cost"
                        fill={costColor}
                        barSize={40}
                        label={{ position: "top", fill: "white", fontWeight: "bold" }}
                      />
                      <Bar
                        dataKey="income"
                        fill={incomeColor}
                        barSize={40}
                        label={{ position: "top", fill: "white", fontWeight: "bold" }}
                      />
                    </React.Fragment>
                  );
                })}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Costs Scatter Plot */}
          <Typography color="white" variant="h5" className="mt-8 mb-4 text-center">
            Costs Over Time by Event
          </Typography>
          <div className="mb-6" style={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  type="category"
                  tickFormatter={(tick) => moment(tick).format("MMM D, YYYY")}
                  tick={{ fill: "white" }}
                  stroke="white"
                />
                <YAxis tick={{ fill: "white" }} stroke="white" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const { event_id, amount, date } = payload[0].payload;
                      return (
                        <div className="bg-black text-white p-2">
                          <p>{`For: ${event_id}`}</p>
                          <p>{`Amount: ${amount}`}</p>
                          <p>{`Date: ${date}`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                {Object.entries(groupedBudgets).map(([event_id, items], index) => (
                  <Line
                    key={event_id}
                    data={items
                      .filter((item) => item.budget_type === "COST")
                      .map((item) => ({
                        date: formatCreatedAt(item.created_at),
                        amount: item.budget_amount,
                      }))}
                    dataKey="amount"
                    name={`Event ${event_id}`}
                    stroke={generateUniqueColor(index)}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                    strokeWidth={3}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Income Scatter Plot */}
          <Typography color="white" variant="h5" className="mt-8 mb-4 text-center">
            Incomes Over Time by Event
          </Typography>
          <div className="mb-6" style={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  type="category"
                  tickFormatter={(tick) => moment(tick).format("MMM D, YYYY")}
                  tick={{ fill: "white" }}
                  stroke="white"
                />
                <YAxis tick={{ fill: "white" }} stroke="white" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const { event_id, amount, date } = payload[0].payload;
                      return (
                        <div className="bg-black text-white p-2">
                          <p>{`Event: ${event_id}`}</p>
                          <p>{`Amount: ${amount}`}</p>
                          <p>{`Date: ${date}`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                {Object.entries(groupedBudgets).map(([event_id, items], index) => (
                  <Line
                    key={event_id}
                    data={items
                      .filter((item) => item.budget_type === "INCOME")
                      .map((item) => ({
                        date: formatCreatedAt(item.created_at),
                        amount: item.budget_amount,
                      }))}
                    dataKey="amount"
                    name={`Event ${event_id}`}
                    stroke={generateUniqueColor(index)}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                    strokeWidth={3}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>

            
          </div>
          
        </CardBody>
      </Card>
    </div>
  );
};

export default BudgetTable;
