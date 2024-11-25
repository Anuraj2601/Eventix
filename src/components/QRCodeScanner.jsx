import React, { useEffect, useRef } from 'react';

const QRScanner = () => {
  const videoRef = useRef(null); // Create a ref for the video element

  useEffect(() => {
    // Ensure that Instascan is available and videoRef is attached
    if (window.Instascan && videoRef.current) {
      const scanner = new window.Instascan.Scanner({ video: videoRef.current });

      window.Instascan.Camera.getCameras()
        .then(cameras => {
          if (cameras.length > 0) {
            scanner.start(cameras[0]); // Start the scanner with the first camera
          } else {
            console.error('No cameras found.');
          }
        })
        .catch(e => {
          console.error('Error accessing cameras:', e);
        });

      // Add event listener to handle scan results
      scanner.addListener('scan', content => {
        alert(content); // Show scanned content in an alert
      });

      // Cleanup the scanner when the component is unmounted
      return () => {
        scanner.stop();
      };
    }
  }, []); // Empty dependency array means this effect runs once after the component mounts

  return (
    <div>
      <h2>QR Scanner</h2>
      {/* Video element to display the camera feed */}
      <video ref={videoRef} width="100%" />
    </div>
  );
};

export default QRScanner;
