import React, { useState } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Chart } from "react-google-charts";
import BudgetTable from "./BudgetTable";

const Reports = () => {
  const [totalCosts, setTotalCosts] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  // Chart data using the totals calculated by BudgetTable
  const budgetOverviewChartData = [
    ["Category", "Amount"],
    ["Total Costs", totalCosts],
    ["Total Income", totalIncome],
  ];

  // Data for Event Registration vs. Check-in Rates
  const registrationVsCheckinData = [
    ["Category", "Count"],
    ["Registrations", 500], // Replace with actual data
    ["Check-ins", 450], // Replace with actual data
  ];

  // Data for Estimated Budgets vs. Actual Costs
  const estimatedVsActualData = [
    ["Category", "Amount"],
    ["Estimated Budget", 40000], // Static estimated budget value
    ["Actual Costs", totalCosts], // Uses the total costs from BudgetTable
  ];

  // Function to update total costs and income from BudgetTable
  const handleUpdate = (costs, income) => {
    setTotalCosts(costs);
    setTotalIncome(income);
  };

  return (
    <div>
      {/* BudgetTable is used but not displayed */}
      <BudgetTable onUpdate={handleUpdate} showTable={false} />

      {/* Budget Overview Chart */}
      <Card className="w-full bg-neutral-900 rounded-2xl p-10 ">
        <CardBody>
          <Typography color="white" variant="h4" className="mb-4 text-center">
            Budget Overview
          </Typography>
          <div className="rounded-lg bg-black p-4">
            <Chart
              width={"100%"}
              height={"400px"}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data={budgetOverviewChartData}
              options={{
                backgroundColor: "black",
                chartArea: { width: "60%" },
                hAxis: {
                  titleTextStyle: { color: "white" },
                  title: "Category",
                  textStyle: { color: "white" },
                },
                vAxis: {
                  titleTextStyle: { color: "white" },
                  title: "Amount",
                  textStyle: { color: "white" },
                },
                legend: { position: "none" },
                colors: ["#AEC90A", "#AEC90A"],
              }}
            />
          </div>
        </CardBody>
      </Card>

      {/* Event Registration vs. Check-in Rates Chart */}
      <Card className="w-full bg-neutral-900 rounded-lg mt-6">
        <CardBody>
          <Typography color="white" variant="h4" className="mb-4 text-center">
            Event Registration vs. Check-in Rates
          </Typography>
          <div className="rounded-lg bg-black p-4">
            <Chart
              width={"100%"}
              height={"400px"}
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data={registrationVsCheckinData}
              options={{
                backgroundColor: "black",
                chartArea: { width: "60%" },
                hAxis: {
                  titleTextStyle: { color: "white" },
                  title: "Count",
                  textStyle: { color: "white" },
                },
                vAxis: {
                  titleTextStyle: { color: "white" },
                  title: "Category",
                  textStyle: { color: "white" },
                },
                legend: { position: "none" },
                colors: ["#AEC90A", "#FF5733"], // Different colors for contrast
              }}
            />
          </div>
        </CardBody>
      </Card>

      {/* Estimated Budget vs. Actual Costs Chart */}
      <Card className="w-full bg-neutral-900 rounded-lg mt-6">
        <CardBody>
          <Typography color="white" variant="h4" className="mb-4 text-center">
            Estimated Budget vs. Actual Costs
          </Typography>
          <div className="rounded-lg bg-black p-4">
            <Chart
              width={"100%"}
              height={"400px"}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data={estimatedVsActualData}
              options={{
                backgroundColor: "black",
                chartArea: { width: "60%" },
                hAxis: {
                  titleTextStyle: { color: "white" },
                  title: "Amount",
                  textStyle: { color: "white" },
                },
                vAxis: {
                  titleTextStyle: { color: "white" },
                  title: "Category",
                  textStyle: { color: "white" },
                },
                legend: { position: "none" },
                colors: ["#AEC90A", "#FF5733"], // Different colors for contrast
              }}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Reports;
