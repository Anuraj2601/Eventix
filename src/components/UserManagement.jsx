import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserIdFromToken } from "../utils/utils"; // Utility function to get user ID from token

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [selectedTreasurer, setSelectedTreasurer] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [currentTreasurer, setCurrentTreasurer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState(""); // Success or Error message type

  const userId = getUserIdFromToken(); // Get the current user ID from token
  const baseUrl = 'http://localhost:8080/api/users/';

  useEffect(() => {
    fetchUsers();
  }, [userId]); // Fetch users when the component mounts or when userId changes

  // Fetch all user records including the current user's details
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}getAllUsersIncludingCurrent`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization header with token
        },
      });

      // Extract relevant data and set in state
      const fetchedUsers = response.data.map((user) => ({
        image: user.photoUrl || "default-image-url.jpg", // Fallback image URL if no photoUrl
        name: `${user.firstname} ${user.lastname}`, // Full name
        id: user.id,
        email: user.email,
        role: user.role,
      }));

      setUsers(fetchedUsers);

      // Identify current admin and treasurer
      const admin = fetchedUsers.find((user) => user.role === "ADMIN");
      const treasurer = fetchedUsers.find((user) => user.role === "treasurer");

      setCurrentAdmin(admin ? admin.id : null);
      setCurrentTreasurer(treasurer ? treasurer.id : null);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false); // Stop loading on error
      setDialogMessage("Error fetching users, please try again later.");
      setDialogType("error");
      setShowDialog(true);
    }
  };

  // Show dialog for confirmation
  const confirmUpdate = () => {
    if (!selectedAdmin || !selectedTreasurer) {
      setDialogMessage("Please select both Admin and Treasurer before updating.");
      setDialogType("error");
      setShowDialog(true);
      return;
    }

    if (selectedAdmin === selectedTreasurer) {
      setDialogMessage("Select only one user per role.");
      setDialogType("error");
      setShowDialog(true);
      return;
    }

    setDialogMessage(
      `Are you sure you want to update roles? Assign User ID ${selectedAdmin} as Admin and User ID ${selectedTreasurer} as Treasurer.`
    );
    setDialogType("confirmation");
    setShowDialog(true);
  };

  // Update admin and treasurer roles
  const updateRoles = async () => {
    try {
      await axios.put(
        `${baseUrl}updateRoles`,
        null,
        {
          params: {
            currentAdminId: currentAdmin,
            currentTreasurerId: currentTreasurer,
            newAdminId: selectedAdmin,
            newTreasurerId: selectedTreasurer,
          },
        }
      );
      setShowDialog(false); // Close the confirmation dialog
      fetchUsers(); // Refetch the users after updating roles
      setDialogMessage("Roles updated successfully.");
      setDialogType("success");
      setShowDialog(true);
    } catch (error) {
      console.error("Error updating roles:", error);
      setDialogMessage("Error updating roles, please try again later.");
      setDialogType("error");
      setShowDialog(true);
    }
  };

  return (
    <div style={{ backgroundColor: "black", padding: "20px", color: "white" }}>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.role !== "ADMIN" && user.role !== "treasurer" && (
                      <button
                        onClick={() => setSelectedAdmin(user.id)}
                        style={{
                          backgroundColor: selectedAdmin === user.id ? "yellow" : "gray",
                          padding: "5px 10px",
                          border: "none",
                          cursor: "pointer",
                          marginRight: "5px",
                          color: "black",
                        }}
                        className="rounded-full"
                        disabled={user.role === "ADMIN"}
                      >
                        Set as Admin
                      </button>
                    )}
                    {user.role !== "ADMIN" && user.role !== "treasurer" && (
                      <button
                        onClick={() => setSelectedTreasurer(user.id)}
                        style={{
                          backgroundColor: selectedTreasurer === user.id ? "yellow" : "gray",
                          padding: "5px 10px",
                          border: "none",
                          cursor: "pointer",
                          color: "black",
                        }}
                        className="rounded-full"
                        disabled={user.role === "treasurer"}
                      >
                        Set as Treasurer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "20px" }} className="flex justify-end mt-4">
            <button
              onClick={confirmUpdate}
              disabled={!selectedAdmin || !selectedTreasurer}
              className={`${
                selectedAdmin && selectedTreasurer
                  ? "bg-[#AEC90A] cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              } text-black p-3 rounded-full`}
            >
              Update Roles
            </button>
          </div>
        </>
      )}

      {/* Dialog */}
      {showDialog && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white text-black rounded-lg shadow-lg">
          <p>{dialogMessage}</p>
          <div className="flex justify-center space-x-4 mt-4">
            {dialogType === "confirmation" && (
              <>
                <button
                  onClick={updateRoles}
                  className="bg-red-500 p-3 rounded-full"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowDialog(false)}
                  className="bg-gray-500 p-3 rounded-full"
                >
                  Cancel
                </button>
              </>
            )}
            {dialogType === "success" && (
              <button
                onClick={() => setShowDialog(false)}
                className="bg-green-500 p-3 rounded-full"
              >
                Close
              </button>
            )}
            {dialogType === "error" && (
              <button
                onClick={() => setShowDialog(false)}
                className="bg-gray-500 p-3 rounded-full"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
