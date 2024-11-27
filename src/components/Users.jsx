import React, { useState } from "react";
import * as XLSX from "xlsx";
import UsersService from "../service/UsersService"; // Assuming the service is set up

const ExcelUpload = () => {
  const [fileData, setFileData] = useState([]);
  const [dialogMessage, setDialogMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  // Function to handle file upload and data extraction
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 }); // Read as array of arrays
        
        setFileData(jsonData);
      };

      reader.readAsBinaryString(file);
    }
  };

  // Function to validate and send data to UsersService
  const handleUploadAndRegister = async () => {
    if (fileData.length === 0) {
      setDialogMessage("No data uploaded.");
      setShowDialog(true);
      return;
    }

    // Skip the header row (if present) and start processing data from row 2
    const [headers, ...records] = fileData;

    // Loop through each record and validate the required fields
    for (let record of records) {
      const [firstname, lastname, email, regNo] = record;

      // Check if all required columns are filled
      if (!firstname || !lastname || !email || !regNo) {
        setDialogMessage("Missing required fields in one of the records.");
        setShowDialog(true);
        return;
      }

      // Pass data to the UsersService.register method
      try {
        const response = await UsersService.register(
          firstname,
          lastname,
          email,
          email, // Use email as password by default
          regNo,
          "student" // Default role is 'student'
        );

        // Handle the response after registration
        if (response.success) {
          setDialogMessage("User successfully registered.");
          setShowDialog(true);
        } else {
          setDialogMessage(`Failed to register user: ${response.message}`);
          setShowDialog(true);
        }
      } catch (error) {
        setDialogMessage(`Error occurred: ${error.message}`);
        setShowDialog(true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      </div>
      
      {fileData.length > 0 && (
        <div className="mt-4">
          <h3>Imported Data:</h3>
          <table className="table-auto border-collapse border border-gray-200">
            <thead>
              <tr>
                {fileData[0].map((header, index) => (
                  <th key={index} className="border border-gray-300 p-2">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fileData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border border-gray-300 p-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleUploadAndRegister}
      >
        Upload and Register Users
      </button>

      {showDialog && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded">
          {dialogMessage}
        </div>
      )}
    </div>
  );
};

export default ExcelUpload;
