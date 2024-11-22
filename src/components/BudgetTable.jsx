import React, { useState, useEffect } from "react";
import { Card, CardBody, Typography, Button, Input } from "@material-tailwind/react";
import EditButton from "./EditButton"; // Import your EditDeleteButton component
import BudgetService from "../service/BudgetService";
import moment from 'moment';


const BudgetTable = ({ clubId, event, onUpdate, showTable = true, estimatedBudget = 4000 }) => {
  
  const [newItem, setNewItem] = useState({ description: "", type: "COST", amount: 0 });

  const [allBudgets, setAllBudgets] = useState([]);

  //console.log("clubID in budget", clubId);
  //console.log("event in budget", event);

  // const handleAddItem = (e) => {
  //   e.preventDefault();
  //   setBudgetItems([...budgetItems, { id: budgetItems.length + 1, ...newItem }]);
  //   setNewItem({ description: "", type: "cost", amount: 0 });
  // };

  const handleAddItem = async (e) => {
      e.preventDefault();


      const missingFields = [];

      // Check if each field is empty or not selected
      if (!newItem.description || newItem.description.trim() === '') {
          missingFields.push('Description');
      }



      if (!newItem.amount || newItem.amount.trim() === '') {
          missingFields.push('Amount');
      }

      // if (!selectedDate) {
      //     missingFields.push('Interview Slot');
      // }

      if (missingFields.length > 0) {
          alert(`Please fill in the following fields: ${missingFields.join(', ')}`);
          return;
      }

      const token = localStorage.getItem('token');
      const session_id = localStorage.getItem('session_id');
      //console.log("session id in event reg", session_id);

      if (!token) {
          alert('User not authenticated.');
          return;
      }

      //const token = localStorage.getItem('token'); 

      try{

          const response = await BudgetService.saveBudget(
              newItem.description,
              newItem.amount,
              newItem.type,
              event.event_id,
              token
          );

          
          alert('Event Budget added successfully');
          console.log('Event Budget added:', response);
          //navigate(-1);


      }catch(err){

          console.error("Error adding Event Budget:", err);
          
          // const errorMessages = err.response ? err.response.data.errors : { global: err.message };
          // setErrors(errorMessages);
          // setTimeout(() => setErrors({}), 5000);

      }

      //setBudgetItems([...budgetItems, { id: budgetItems.length + 1, ...newItem }]);
      setAllBudgets([...allBudgets, { id: allBudgets.length + 1, ...newItem }]);
      setNewItem({ description: "", type: "cost", amount: 0 });
  };

 

  const handleNewItemChange = (field, value) => {
    setNewItem({ ...newItem, [field]: value });
  };

  // const totalCosts = budgetItems
  //   .filter(item => item.type === "cost")
  //   .reduce((acc, item) => acc + parseFloat(item.amount), 0);
  // const totalIncome = budgetItems
  //   .filter(item => item.type === "income")
  //   .reduce((acc, item) => acc + parseFloat(item.amount), 0);

  const formatCreatedAt = (createdAtArray) => {
    // Ensure the createdAtArray has 7 elements (year, month, day, hour, minute, second, and timestamp)
    if (Array.isArray(createdAtArray) && createdAtArray.length === 7) {
      const [year, month, day, hour, minute, second] = createdAtArray;
  
      // Create a Date object from the array values
      const date = new Date(year, month - 1, day, hour, minute, second);
  
      // Return the formatted date using moment.js
      return moment(date).format("DD MMM YYYY, hh:mm A");
    }
  
    return 'Invalid Date'; // Return a fallback if the date array is invalid
  };
  

  const totalCosts = allBudgets
    .filter(item => item.budget_type === "COST")
    .reduce((acc, item) => acc + parseFloat(item.budget_amount), 0);
  const totalIncome = allBudgets
    .filter(item => item.budget_type === "INCOME")
    .reduce((acc, item) => acc + parseFloat(item.budget_amount), 0);

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

  
  }, [allBudgets])

  return (
    <div>
      {showTable && (
        <Card className="w-full bg-black mb-6">
          <CardBody>
          <Typography color="white" className="mb-4 flex items-center">
            
            Estimated Budget: <span className="mr-2">
                <EditButton />
            </span>
        </Typography>
            <Typography color="white" variant="h4" className="mb-4 text-center">
              Event Budget Tracker
            </Typography>
            <table className="w-full mb-4 text-white">
              <thead>
                <tr>
                <th className="p-2 text-left">On</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
  {allBudgets.map((item) => {
 const formattedDate = formatCreatedAt(item.created_at); 


    return (
      <tr key={item.budget_id}>
         <td>{formattedDate}</td>
        <td className="p-2">{item.budget_name}</td>
        <td
          className="p-2"
          style={{
            color:
              item.budget_type === "COST"
                ? "red"
                : item.budget_type === "INCOME"
                ? "#2ecc71"
                : "white",
          }}
        >
          {item.budget_type}
        </td>
        <td className="p-2">Rs. {item.budget_amount}</td>
             </tr>
    );
  })}
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
                  <option value="COST">Cost</option>
                  <option value="INCOME">Income</option>
                </select>
                <Input
                  type="number"
                  value={newItem.amount}
                  onChange={(e) => handleNewItemChange("amount", e.target.value)}
                  placeholder="Amount"
                  className="bg-gray-800 text-white p-2 rounded-lg mr-2 w-28"
                />
              </div>
              <Button type="submit" className="bg-[#AEC90A] text-black p-2 rounded-full cursor-pointer">
                Add Item
              </Button>
            </form>
            <div className="flex justify-between text-white mb-4">
              <Typography variant="h5">
                Total Costs: Rs. {totalCosts.toFixed(2)}
              </Typography>
              <Typography variant="h5">
                Total Income: Rs. {totalIncome.toFixed(2)}
              </Typography>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default BudgetTable;
