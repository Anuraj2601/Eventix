import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Typography,
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

const BudgetTable = ({ clubId, onUpdate }) => {
  const [allBudgets, setAllBudgets] = useState([]);
  const [groupedBudgets, setGroupedBudgets] = useState({});

  // Fetch Budget Data
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

  const formatCreatedAt = (createdAtArray) => {
    if (Array.isArray(createdAtArray) && createdAtArray.length === 7) {
      const [year, month, day, hour, minute, second] = createdAtArray;
      const date = new Date(year, month - 1, day, hour, minute, second);
      return moment(date).format("YYYY-MM-DD");
    }
    return "Invalid Date";
  };

  // Prepare Data for Charts
  const barChartData = Object.entries(groupedBudgets).map(([event_id, items]) => {
    const totalCost = items
      .filter((item) => item.budget_type === "COST")
      .reduce((total, item) => total + item.budget_amount, 0);
    const totalIncome = items
      .filter((item) => item.budget_type === "INCOME")
      .reduce((total, item) => total + item.budget_amount, 0);

    return { event_id, cost: totalCost, income: totalIncome };
  });

  const lineChartData = Object.entries(groupedBudgets).flatMap(([event_id, items]) =>
    items.map((item) => ({
      event_id,
      date: formatCreatedAt(item.created_at),
      amount: item.budget_amount,
      type: item.budget_type,
    }))
  );

  return (
    <div>
      <Card className="w-full bg-black mb-6">
        <CardBody>
         

          {/* Bar Chart for Total Costs vs Incomes */}
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
                <Bar
                  dataKey="cost"
                  fill="#808080"
                  barSize={40}
                  label={{ position: "top", fill: "white", fontWeight: "bold" }}
                />
                <Bar
                  dataKey="income"
                  fill="#AEC90A"
                  barSize={40}
                  label={{ position: "top", fill: "white", fontWeight: "bold" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Scatter Plot for Costs */}
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
                <Tooltip />
                <Legend />
                {Object.entries(groupedBudgets).map(([event_id, items]) => (
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
                    stroke="#FF5733"
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Scatter Plot for Incomes */}
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
                <Tooltip />
                <Legend />
                {Object.entries(groupedBudgets).map(([event_id, items]) => (
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
                    stroke="#28A745"
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Registrations and Check-Ins Bar Chart */}
          <Typography color="white" variant="h5" className="mt-8 mb-4 text-center">
            Registrations vs Check-Ins
          </Typography>
          <div style={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="event_id" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="registrations"
                  fill="#6A1B9A"
                  barSize={40}
                  label={{ position: "top", fill: "white", fontWeight: "bold" }}
                />
                <Bar
                  dataKey="checkIns"
                  fill="#BA68C8"
                  barSize={40}
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
