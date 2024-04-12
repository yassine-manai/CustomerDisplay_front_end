import React, { useState, useEffect } from 'react';
import './App.css';
import InfoContainer from "./components/InfoComp";
import pumc from "./assets/pumc.svg";


import Footer from "./components/footer";


import S_11 from './pages/s11.js';


function App() {
  const [responseMessage, setResponseMessage] = useState('');

  const locationData = {
    iconSrc: pumc,
    name: 'PUMC Carpark',
    exit: '- Exit 705'
  };

  return (
    <div className="App">
      <InfoContainer location={locationData} timezone="Africa/Tunis" />
      <S_11 />
      <Footer
        backgroundSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/df00f599d33fb991024f9a70e98e9f46d74e8e7d7a0a9d14f4a90d4241468e93?apiKey=b0b1b89b83d343bbad71dadbf0c5ddb6&"
        logoSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/2a3eeabbe4ea385ccd32fe92ab1a4ca2f5ee6b2b89345b4aa5d34108241e423e?apiKey=b0b1b89b83d343bbad71dadbf0c5ddb6&"
      />
    </div>
  );
}

export default App;
