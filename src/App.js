import React, { useState, useEffect } from 'react';
import './App.css';
import InfoContainer from './components/InfoComp';
import pumc from './assets/pumc.svg';
import Footer from './components/footer';
import S_one from './pages/s_one';
import S_two from './pages/s_two';
import S_three from './pages/s_three';
import S_four from './pages/s_four';
import S_five from './pages/s_five';
import S_six from './pages/s_six';
import S_seven from './pages/s_seven';
import S_eight from './pages/s_eight';
import S_nine from './pages/s_nine';
import S_ten from './pages/s_ten';
import S11 from './pages/s11';


function App() {
  const [responseMessage, setResponseMessage] = useState('');
  const [data, setData] = useState(null);
  const [ws, setWs] = useState(null);
  const lpn10 = "https://cdn.builder.io/api/v1/image/assets/TEMP/284ba0fe61dd9637f707740982d5deadca43a78ed31a2e3cb6818f9325b9efeb?apiKey=b0b1b89b83d343bbad71dadbf0c5ddb6&"

  const locationData = 
  {
    iconSrc: pumc,
    name: 'PUMC Carpark',
    exit: 'Exit 704'
  };

  useEffect(() => 
  {
    // Connect to WebSocket server
    const socket = new WebSocket('ws://127.0.0.1:8000/ws');

    socket.onopen = () => {
      console.log('WebSocket connected');
      setWs(socket);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      handleWebSocketMessage(message);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
      setWs(null);
    };

    return () => {
      // Clean up WebSocket connection
      if (socket) 
      {
        socket.close();
      }
    };
  }, []);

  const handleWebSocketMessage = (message) => {
    console.log('Received message from WebSocket:', message);

    if (message.type === 'number') {
      const number = parseInt(message.value);

      if (number === 1) {
        setData(1);
      } 
      
      if (number === 2) {
        setData(2);
        setResponseMessage('Hi');
      }
    }
  };

  return (
    <div className="App">
      <InfoContainer location={locationData} timezone="Africa/Tunis" />

      {
        data === 1 && 
        <S_two /> &&
        <Footer
          backgroundSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/df00f599d33fb991024f9a70e98e9f46d74e8e7d7a0a9d14f4a90d4241468e93?apiKey=b0b1b89b83d343bbad71dadbf0c5ddb6&"
          logoSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/2a3eeabbe4ea385ccd32fe92ab1a4ca2f5ee6b2b89345b4aa5d34108241e423e?apiKey=b0b1b89b83d343bbad71dadbf0c5ddb6&"
        />  
      }

      {
        data === 2 && 
        <S_five /> && 
        <Footer
        backgroundSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/df00f599d33fb991024f9a70e98e9f46d74e8e7d7a0a9d14f4a90d4241468e93?apiKey=b0b1b89b83d343bbad71dadbf0c5ddb6&"
        logoSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/2a3eeabbe4ea385ccd32fe92ab1a4ca2f5ee6b2b89345b4aa5d34108241e423e?apiKey=b0b1b89b83d343bbad71dadbf0c5ddb6&"
        />  
      }


       {/* Render S_ten with the specified imageUrl */}
        <S_ten imageUrl={lpn10} />
        <Footer
        backgroundSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/df00f599d33fb991024f9a70e98e9f46d74e8e7d7a0a9d14f4a90d4241468e93?apiKey=b0b1b89b83d343bbad71dadbf0c5ddb6&"
        logoSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/2a3eeabbe4ea385ccd32fe92ab1a4ca2f5ee6b2b89345b4aa5d34108241e423e?apiKey=b0b1b89b83d343bbad71dadbf0c5ddb6&"
        /> 


    </div>
  );
}

export default App;
