import React from 'react';
import Instascan from 'react-instascan';

const QRScanner = () => {
  return (
    <div>
      <h2>QR Scanner</h2>
      <Instascan
        onScan={(data) => alert(data)}
        onError={(error) => console.error(error)}
      />
    </div>
  );
};

export default QRScanner;
