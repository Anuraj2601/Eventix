// Import required dependencies
import React, { useState } from "react";
import axios from "axios";

const UserImportComponent = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8080/api/users/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus(`Upload successful: ${response.data.message}`);
    } catch (error) {
      setUploadStatus(`Upload failed: ${error.response?.data?.message || "Server error"}`);
    }
  };

  return (
    <div className="user-import-component">
      <h2>Import Users from Excel</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default UserImportComponent;
