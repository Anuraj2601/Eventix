import React, { useState, useEffect } from "react";
import { Card, CardBody, Typography, Button, Input } from "@material-tailwind/react";
import EditButton from "./EditButton"; // Import your EditDeleteButton component
import BudgetService from "../service/BudgetService";


const BudgetTable = ({ clubId, event, onUpdate, showTable = true, estimatedBudget = 4000 }) => {
  const [budgetItems, setBudgetItems] = useState([
    { id: 1, description: "Venue Rental", type: "cost", amount: 500 },
    { id: 2, description: "Sponsorship", type: "income", amount: 1000 },
    { id: 3, description: "Catering", type: "cost", amount: 300 },
  ]);

  const [newItem, setNewItem] = useState({ description: "", type: "cost", amount: 0 });

  const [allBudgets, setAllBudgets] = useState([]);

  //console.log("clubID in budget", clubId);
  //console.log("event in budget", event);

  const handleAddItem = (e) => {
    e.preventDefault();
    setBudgetItems([...budgetItems, { id: budgetItems.length + 1, ...newItem }]);
    setNewItem({ description: "", type: "cost", amount: 0 });
  };

  const handleNewItemChange = (field, value) => {
    setNewItem({ ...newItem, [field]: value });
  };

  const totalCosts = budgetItems
    .filter(item => item.type === "cost")
    .reduce((acc, item) => acc + parseFloat(item.amount), 0);
  const totalIncome = budgetItems
    .filter(item => item.type === "income")
    .reduce((acc, item) => acc + parseFloat(item.amount), 0);

  // Notify parent component about the updated totals
  useEffect(() => {
    if (onUpdate) {
      onUpdate(totalCosts, totalIncome, estimatedBudget);
    }
  }, [totalCosts, totalIncome, estimatedBudget, onUpdate]);

  useEffect(() => {

    const fetchBudgetItems = async () => {
        try{
            const token = localStorage.getItem('token');
            const response = await BudgetService.getAllBudgets(token) ;
            //console.log("budget response array", response);
            const budgetArray = response.content.filter(item => item.event_id === event.event_id ) || [];
            console.log("budget array", budgetArray);

          
            setAllBudgets(budgetArray);
            

        }catch(error){
            console.error("Error fetching budget items", error);
        }

    }

    fetchBudgetItems();

  
}, [])

  return (
    <div>
      {showTable && (
        <Card className="w-full bg-black mb-6">
          <CardBody>
          <Typography color="white" className="mb-4 flex items-center">
            
            Estimated Budget: $40,000<span className="mr-2">
                <EditButton />
            </span>
        </Typography>
            <Typography color="white" variant="h4" className="mb-4 text-center">
              Event Budget Tracker
            </Typography>
            <table className="w-full mb-4 text-white">
              <thead>
                <tr>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {allBudgets.map(item => (
                  <tr key={item.budget_id}>
                    <td className="p-2">{item.budget_name}</td>
                    <td className="p-2"
                     style={{
                      color: item.budget_type === "COST" ? "red" : item.budget_type === "INCOME" ? "green" : "white",
                    }}
                    >{item.budget_type}</td>
                    {/* <td className="p-2">${item.amount.toFixed(2)}</td> */}
                    <td className="p-2">Rs. {item.budget_amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <form onSubmit={handleAddItem} className="mb-4">
              <div className="flex items-center mb-4">
                <Input
                  type="text"
                  value={newItem.description}
                  onChange={(e) => handleNewItemChange("description", e.target.value)}
                  placeholder="Description"
                  className="bg-gray-800 text-white p-2 rounded-lg mr-2 w-48"
                />
                <select
                  value={newItem.type}
                  onChange={(e) => handleNewItemChange("type", e.target.value)}
                  className="bg-gray-800 text-white p-2 rounded-full mr-2 w-28"
                >
                  <option value="cost">Cost</option>
                  <option value="income">Income</option>
                </select>
                <Input
                  type="number"
                  value={newItem.amount}
                  onChange={(e) => handleNewItemChange("amount", e.target.value)}
                  placeholder="Amount"
                  className="bg-gray-800 text-white p-2 rounded-lg mr-2 w-28"
                />
              </div>
              <Button type="submit" className="bg-[#AEC90A] text-black p-2 rounded-full">
                Add Item
              </Button>
            </form>
            <div className="flex justify-between text-white mb-4">
              <Typography variant="h5">
                Total Costs: ${totalCosts.toFixed(2)}
              </Typography>
              <Typography variant="h5">
                Total Income: ${totalIncome.toFixed(2)}
              </Typography>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default BudgetTable;
