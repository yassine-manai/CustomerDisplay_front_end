import React, { useState, useEffect } from 'react';
import InfoContainer from './components/InfoComp';
import Footer from './components/footer';
import S_ONE from './pages/s_one';
import S_TWO from './pages/s_two';
import S_Three from './pages/s_three';
import S_Four from './pages/s_four';
import S_Five from './pages/s_five';
import S_Six from './pages/s_six';
import S_Seven from './pages/s_seven';
import S_eight from './pages/s_eight';
import S_nine from './pages/s_nine';
import S_ten from './pages/s_ten';
import S11 from './pages/s11';
//import pumc from './assets/pumc.svg';
import kfc from './assets/kfc.png';
import readConfig from './Config/location_config.js'


function App() {
  const [data, setData] = useState(<S_ONE img={kfc} />);
  const [ws, setWs] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null); 

  /* const locationData = { readConfig };
  print(readConfig); */


  useEffect(() => {
    const socket = new WebSocket('ws://127.0.0.1:8200/ws');
    console.log(socket);

    socket.onopen = () => {
      console.log('WebSocket connected');
      setWs(socket);
    };

    socket.onmessage = (event) => {
      try {
        const { message, DispTime, ...extraData } = JSON.parse(event.data);
        handleWebSocketMessage(message, DispTime, extraData);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
      setWs(null);
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const handleWebSocketMessage = (message, DispTime, extraData) => {
    console.log('Received message from WebSocket:', extraData);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    switch (message) {
      case 1:
        setData(<S_ONE img={extraData.pathImage} />);
        break;
      case 2:
        setData(
          <S_TWO
            entryTime={extraData.entryTime}
            exitTime={extraData.exitTime}
            length={extraData.lenghtOfStay}
            amount={extraData.amount}
            currency={extraData.currency}
            licencePlate={extraData.licencePlate}
            pathImage={extraData.pathImage}
          />
        );
        break;
      case 3:
        setData(
          <S_Three
            paymentSuccess={extraData.paymentSuccess}
            visitMessage={extraData.visitMessage}
          />
        );
        break;
      case 4:
        setData(
          <S_Four
            name={extraData.name}
            thankYouMessage={extraData.thankYouMessage}
            licencePlate={extraData.licencePlate}
            entryTime={extraData.entryTime}
            exitTime={extraData.exitTime}
            lengthOfStay={extraData.lenghtOfStay}
            currency={extraData.currency}
            amountDeducted={extraData.amount}
            carImage={extraData.carImage}
          />
        );
        break;
      case 5:
        setData(
          <S_Five
            name={extraData.name}
            thankYouMessage={extraData.thankYouMessage}
            licencePlate={extraData.licencePlate}
            entryTime={extraData.entryTime}
            exitTime={extraData.exitTime}
            lengthOfStay={extraData.lenghtOfStay}
            carImage={extraData.carImage}
          />
        );
        break;
      case 6:
        setData(
          <S_Six
            name={extraData.name}
            thankYouMessage={extraData.thankYouMessage}
            licencePlate={extraData.licencePlate}
            entryTime={extraData.entryTime}
            exitTime={extraData.exitTime}
            lengthOfStay={extraData.lenghtOfStay}
            amountDeducted={extraData.amount}
            carImage={extraData.carImage}
            currency={extraData.currency}
          />
        );
        break;
      case 7:
        setData(
          <S_Seven
            name={extraData.name}
            thankYouMessage={extraData.thankYouMessage}
            licencePlate={extraData.licencePlate}
            entryTime={extraData.entryTime}
            exitTime={extraData.exitTime}
            lengthOfStay={extraData.lenghtOfStay}
            amountDeducted={extraData.amount}
            carImage={extraData.carImage}
            currency={extraData.currency}
          />
        );
        break;
      case 8:
        setData(
          <S_eight
            name={extraData.name}
            thankYouMessage={extraData.thankYouMessage}
            licencePlate={extraData.licencePlate}
            entryTime={extraData.entryTime}
            exitTime={extraData.exitTime}
            lengthOfStay={extraData.lenghtOfStay}
            amountDeducted={extraData.amount}
            carImage={extraData.carImage}
            currency={extraData.currency}
          />
        );
        break;
      case 9:
        setData(
          <S_nine
            apologyMessage={extraData.apologyMessage}
            carImage={extraData.carImage}
          />
        );
        break;
      case 10:
        setData(
          <S_ten
            apologyTitle={extraData.apologyTitle}
            apologyDescription={extraData.apologyDescription}
            carImage={extraData.carImage}
          />
        );
        break;
      case 11:
        setData(
          <S11
            apologyTitle={extraData.apologyTitle}
            apologyDescription={extraData.apologyDescription}
            helpDescription={extraData.helpDescription}
            carImage={extraData.carImage}
          />
        );
        break;
      default:
        setData(<S_ONE img={kfc} />);
        break;
    }

    if (message !== 1) {
      const newTimeoutId = setTimeout(() => {
        setData(<S_ONE img={kfc} />);
      }, DispTime);
      setTimeoutId(newTimeoutId);
    }
  };

  const sendMessage = (message, extraData = {}) => 
  {
    if (ws && ws.readyState === WebSocket.OPEN) 
    {
      const messageObj = { message, ...extraData };
      ws.send(JSON.stringify(messageObj));
    } else {
      console.error('WebSocket connection is not open.');
    }
  };

/*   async function main()
{
  await updateConfig();
  setInterval(updateConfig, 60000); // Update every minute, adjust as needed
} */

  return (
    <div className="App">
      <InfoContainer location={readConfig} timezone="Africa/Tunis" />
      {data}
      <Footer
        backgroundSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/df00f599d33fb991024f9a70e98e9f46d74e8e7d7a0a9d14f4a90d4241468e93?apiKey=b0b1b89b83d343bbad71dadbf0c5ddb6&"
      />
    </div>
  );
}

export default App;
