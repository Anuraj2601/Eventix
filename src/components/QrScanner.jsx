import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QrScanner = () => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10, // Frames per second
      qrbox: { width: 250, height: 250 }, // Scanning box dimensions
    });

    scanner.render(
      (decodedText) => {
        console.log("Scanned QR Code: ", decodedText);
        alert(`QR Code Scanned: ${decodedText}`);
      },
      (error) => {
        console.error("Error Scanning QR Code: ", error);
      }
    );

    return () => scanner.clear(); // Cleanup on unmount
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: "black", color: "white" }}
    >
      <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>
      <div
        id="qr-reader"
        style={{
          width: "300px",
          backgroundColor: "black", // Ensures the scanner box has a black background
          padding: "20px",
          borderRadius: "10px",
        }}
      ></div>
    </div>
  );
};

export default QrScanner;
