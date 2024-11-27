import React, { useState, useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const QrScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    
    const startScanner = async () => {
      try {
        const videoElement = videoRef.current;
        // Try to start the video stream
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }, // Use back camera
        });
        videoElement.srcObject = stream;

        // Start decoding the video stream
        codeReader.decodeFromVideoDevice(null, videoElement, (result, err) => {
          if (result) {
            setScannedData(result.getText());
            stream.getTracks().forEach(track => track.stop()); // Stop the stream once scanned
          }
          if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err);
          }
        });
      } catch (error) {
        console.error("Error starting the QR scanner:", error);
      }
    };

    startScanner();

    // Cleanup: stop video stream on unmount
    return () => {
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl font-bold mb-4" style={{ color: "#AEC90A" }}>
        QR Code Scanner
      </h1>
      <div
        className="p-4 border-4 rounded-lg"
        style={{ borderColor: "#AEC90A", maxWidth: "400px", width: "100%" }}
      >
        <video ref={videoRef} style={{ width: "100%", height: "auto" }}></video>
      </div>
      <div className="mt-4">
        {scannedData ? (
          <p className="text-green-400 font-semibold">Scanned Data: {scannedData}</p>
        ) : (
          <p className="text-red-400">Scanning QR code...</p>
        )}
      </div>
    </div>
  );
};

export default QrScanner;
