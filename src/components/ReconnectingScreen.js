// src/components/ReconnectingScreen.js
import React from 'react';
import './../styles/ReconnectingScreen.css'; // Optionally add some styling

const ReconnectingScreen = () => {
  return (
    <div className="reconnecting-screen">
      <div className="reconnecting-message">
        <span className="loading-spinner"></span>
        Reconnecting...
      </div>
    </div>
  );
};

export default ReconnectingScreen;
