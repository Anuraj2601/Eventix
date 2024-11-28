import React, { useState } from "react";

const QrScanner = () => {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl font-bold mb-4" style={{ color: "#AEC90A" }}>
        QR Code Scanner
      </h1>
      <div
        className="p-4 border-4 rounded-lg"
        style={{ borderColor: "#AEC90A", maxWidth: "400px", width: "100%" }}
      >
      
      </div>
      <div className="mt-4">
      
      </div>
    </div>
  );
};

export default QrScanner;
