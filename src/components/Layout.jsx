// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '/src/components/Sidebar';  // Your Sidebar component
import Navbar from '/src/components/Navbar';    // Your Navbar component

/*const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <Sidebar />
      
      <Outlet />
    
    </div>
  );
};*/

const Layout = () => {
    return (
      <div className="layout flex">
        <Sidebar />
        <div className="main-content flex flex-col w-full">
          <Navbar />
          <div className="content flex-grow" style={{ backgroundColor: '#171717' }}>
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

export default Layout;
