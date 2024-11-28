import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QrScanner = () => {
  const [scannedResult, setScannedResult] = useState(null); // State to hold the scanned result
  const [successMessage, setSuccessMessage] = useState(""); // State to hold the success message
  const [userId, clubId, meetingId] = scannedResult ? scannedResult.split("-") : [];

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10, // Frames per second
      qrbox: { width: 250, height: 250 }, // Scanning box dimensions
    });

    scanner.render(
      (decodedText) => {
        console.log("Scanned QR Code: ", decodedText);
        setScannedResult(decodedText); // Update the scanned result state
      },
      (error) => {
        console.error("Error Scanning QR Code: ", error);
      }
    );

    return () => scanner.clear(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (userId && meetingId) {
      // Function to send a PATCH request
      const markAttendance = async () => {
        const apiUrl = `http://localhost:8080/api/meeting-participants/attendance`;
        try {
          const response = await fetch(
            `${apiUrl}?userId=${userId}&meetingId=${meetingId}&attendanceStatus=1`,
            { method: "PATCH" }
          );

          if (response.ok) {
            const data = await response.text();
            console.log("Response from server:", data);
            setSuccessMessage("Attendance marked successfully!"); // Update the success message
          } else {
            setSuccessMessage("Failed to mark attendance. Please try again."); // Error handling
          }
        } catch (error) {
          console.error("Error updating attendance:", error);
          setSuccessMessage("An error occurred while updating attendance.");
        }
      };

      // Call the function
      markAttendance();
    }
  }, [userId, meetingId]); // Trigger whenever userId or meetingId changes

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-10"
      style={{ backgroundColor: "black", color: "white" }}
    >
      <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>
      <div
        id="qr-reader"
        style={{
          width: "600px",
          height: "300px",
          backgroundColor: "black", // Ensures the scanner box has a black background
          padding: "20px",
          borderRadius: "10px",
        }}
      ></div>

      {scannedResult && (
        <div
          className="mt-4 px-4 py-2 bg-[#AEC90A] text-white rounded"
          style={{ width: "300px" }}
        >
          <strong>QR Code scanned successfully:</strong>
          <div>
            <strong>User ID: </strong>
            {userId}
          </div>
          <div>
            <strong>Club ID: </strong>
            {clubId}
          </div>
          <div>
            <strong>Meeting ID: </strong>
            {meetingId}
          </div>
        </div>
      )}

      {successMessage && (
        <div
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          style={{ width: "300px" }}
        >
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default QrScanner;
