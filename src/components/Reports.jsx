import React, { useState, useEffect } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Bar, Scatter } from "react-chartjs-2"; // Import chart components
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler } from 'chart.js';
import BudgetService from "../service/BudgetService";
import moment from 'moment';

// Register necessary Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler
);

const BudgetTable = ({ clubId, event, onUpdate, estimatedBudget = 4000 }) => {
  const [allBudgets, setAllBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgetItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await BudgetService.getAllBudgets(token);
        const budgetArray = response.content.filter(item => item.event_id === event.event_id) || [];
        setAllBudgets(budgetArray);
      } catch (error) {
        console.error("Error fetching budget items", error);
      }
    };

    fetchBudgetItems();
  }, [event.event_id]);

  // Process the data for bar chart and scatter chart
  const processChartData = () => {
    let labels = ['Total Cost', 'Total Income'];
    let costData = [0];
    let incomeData = [0];
    let scatterData = [];

    allBudgets.forEach((item) => {
      const formattedDate = moment(item.created_at).format("DD MMM YYYY, hh:mm A");
      if (item.budget_type === "COST") {
        costData[0] += item.budget_amount;
      } else if (item.budget_type === "INCOME") {
        incomeData[0] += item.budget_amount;
      }

      if (item.budget_type === "COST" || item.budget_type === "INCOME") {
        scatterData.push({
          x: moment(item.created_at).valueOf(), // timestamp as x value
          y: item.budget_amount,
          label: item.budget_name, // Label with budget name
        });
      }
    });

    return {
      barChartData: {
        labels,
        datasets: [
          {
            label: 'Costs',
            data: costData,
            backgroundColor: 'rgba(255, 221, 51, 0.7)', // Yellow color
            borderColor: 'rgba(255, 221, 51, 1)', // Yellow border color
            borderWidth: 1,
          },
          {
            label: 'Income',
            data: incomeData,
            backgroundColor: 'rgba(169, 169, 169, 0.7)', // Grey color
            borderColor: 'rgba(169, 169, 169, 1)', // Grey border color
            borderWidth: 1,
          },
        ],
      },
      scatterChartData: {
        datasets: [
          {
            label: 'Budget Items (Cost)',
            data: scatterData.filter(item => item.y > 0), // Only display positive costs
            backgroundColor: 'rgba(255, 99, 132, 1)', // Red for cost
            pointRadius: 5,
          },
          {
            label: 'Budget Items (Income)',
            data: scatterData.filter(item => item.y < 0), // Only display negative income
            backgroundColor: 'rgba(75, 192, 192, 1)', // Green for income
            pointRadius: 5,
          },
        ],
      },
    };
  };

  const { barChartData, scatterChartData } = processChartData();

  return (
    <div>
      <Card className="w-full bg-black mb-6">
        <CardBody>
          <Typography color="white" variant="h4" className="mb-4 text-center">
            Event Budget Tracker
          </Typography>
          
          {/* Bar Chart for Total Costs and Total Income */}
          <Typography color="white" variant="h5" className="mb-4">
            Total Cost vs Total Income
          </Typography>
          <div className="mb-4">
            <Bar data={barChartData} options={{
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.dataset.label}: Rs. ${context.raw}`, // Display the amount in tooltip
                  }
                }
              }
            }} />
          </div>

          {/* Scatter Plot for Budget Items over Time */}
          <Typography color="white" variant="h5" className="mb-4">
            Budget Items over Time (Scatter Plot)
          </Typography>
          <div className="mb-4">
            <Scatter data={scatterChartData} options={{
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.raw.label}: Rs. ${context.raw.y}`, // Show the budget name and amount
                  }
                }
              }
            }} />
          </div>

        </CardBody>
      </Card>
    </div>
  );
};

export default BudgetTable;
