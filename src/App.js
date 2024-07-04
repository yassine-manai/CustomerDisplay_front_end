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
import icon_PUMC from './assets/icon_PUMC.svg';
import './'
import img_noCar from "./assets/img_noCar.png"
import fs from 'fs';


const {REACT_APP_SUPABASE_URL_WS: wsip, REACT_APP_SUPABASE_URL_PORT: wsport } = process.env;
// const { REACT_APP_SUPABASE_URL_IP: ip, REACT_APP_SUPABASE_URL_WS: wsip, REACT_APP_SUPABASE_URL_PORT: wsport } = process.env;


/* const ip = process.env.REACT_APP_SUPABASE_URL_IP;
const wsip = process.env.REACT_APP_SUPABASE_URL_WS;
const wsport = process.env.REACT_APP_SUPABASE_URL_PORT; */


function App() {

  const initialInfoData = {
    iconSrc: icon_PUMC,
    name: "CarPark Site",
    exit_point: "Point Name",
    timezone: "Asia/Kuwait"
  };


  const [infoData, setInfoData] = useState({ iconSrc: icon_PUMC, name_point: "CarPark Site", exit_point: "Point Name", timezone: "Africa/Tunis" });
  
  const [footerData, setFooterData] = useState(null);
  const [pageData, setPageData] = useState(<S_ONE timerInterval={6} />);
  const [showFooter, setShowFooter] = useState(false);
  const [ws, setWs] = useState(null);


  useEffect(() => {
    try {
      const savedLocationData = localStorage.getItem('locationData');
      if (savedLocationData) {
        const parsedData = JSON.parse(savedLocationData);
        setInfoData(parsedData);
      }
    } catch (error) {
      console.error('Error reading location data:', error);
    }
  }, []);
  

// this fucntion is used to create Websocket objects
  useEffect(() => {

    const socket = new WebSocket(`ws://${wsip}:${wsport}/ws`);
    console.log(socket);
    console.log("it works correctly");

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
  },    []);

  const handleWebSocketMessage = (message, DispTime, extraData) => {
    console.log('Received message from WebSocket:', extraData);


    localStorage.setItem('locationData', JSON.stringify(extraData));


    clearTimeout(DispTime);

    switch (message) {
      case 100:
        const newInfoData = {
          iconSrc: extraData.icon,
          name_point: extraData.name_point,
          exit_point: extraData.exit_point,
          timezone: extraData.timezone
        };
        localStorage.setItem('locationData', JSON.stringify(newInfoData));
        setInfoData(newInfoData);
        console.log('Location data saved successfully');
        break;
      
      case 110:
        setFooterData(<Footer timerInterval={extraData.timerFooter} />);
        break;

      case 1:
        setPageData(<S_ONE timerInterval={extraData.timerInterval} />);
        setShowFooter(false);
        break;

      case 2:
        setPageData(
          <S_TWO
            entryTime={extraData.entryTime}
            exitTime={extraData.exitTime}
            length={extraData.lenghtOfStay}
            amount={extraData.amount}
            currency={extraData.currency}
            licencePlate={extraData.licencePlate}
            carImage={(extraData.carImage === "string" || extraData.carImage === "") ? img_noCar : extraData.carImage}
          />
        );
        setShowFooter(true);
        break;

      case 3:
        setPageData(
          <S_Three
            paymentSuccess={extraData.paymentSuccess}
            visitMessage={extraData.visitMessage}
          />
        );
        setShowFooter(true);
        break;

      case 4:
        setPageData(
          <S_Four
            name={extraData.name}
            thankYouMessage={extraData.thankYouMessage}
            licencePlate={extraData.licencePlate}
            entryTime={extraData.entryTime}
            exitTime={extraData.exitTime}
            lengthOfStay={extraData.lenghtOfStay}
            currency={extraData.currency}
            amountDeducted={extraData.amount}
            carImage={(extraData.carImage === "string" || extraData.carImage === "") ? img_noCar : extraData.carImage}

          />
        );
        setShowFooter(true);
        break;
        
      case 5:
        setPageData(
          <S_Five
            name={extraData.name}
            thankYouMessage={extraData.thankYouMessage}
            licencePlate={extraData.licencePlate}
            entryTime={extraData.entryTime}
            exitTime={extraData.exitTime}
            lengthOfStay={extraData.lenghtOfStay}
            carImage={(extraData.carImage === "string" || extraData.carImage === "") ? img_noCar : extraData.carImage}
          />
        );
        setShowFooter(true);
        break;


      case 6:
        setPageData(
          <S_Six
            name={extraData.name}
            thankYouMessage={extraData.thankYouMessage}
            licencePlate={extraData.licencePlate}
            entryTime={extraData.entryTime}
            exitTime={extraData.exitTime}
            lengthOfStay={extraData.lenghtOfStay}
            amountDeducted={extraData.amount}
            carImage={(extraData.carImage === "string" || extraData.carImage === "") ? img_noCar : extraData.carImage}
            currency={extraData.currency}
          />
        );
        setShowFooter(true);
        break;

      case 7:
        setPageData(
          <S_Seven
            name={extraData.name}
            thankYouMessage={extraData.thankYouMessage}
            licencePlate={extraData.licencePlate}
            entryTime={extraData.entryTime}
            exitTime={extraData.exitTime}
            lengthOfStay={extraData.lenghtOfStay}
            amountDeducted={extraData.amount}
            carImage={(extraData.carImage === "string" || extraData.carImage === "") ? img_noCar : extraData.carImage}
            currency={extraData.currency}
          />
        );
        setShowFooter(true);
        break;

      case 8:
        setPageData(
          <S_eight
            name={extraData.name}
            thankYouMessage={extraData.thankYouMessage}
            licencePlate={extraData.licencePlate}
            entryTime={extraData.entryTime}
            exitTime={extraData.exitTime}
            lengthOfStay={extraData.lenghtOfStay}
            amountDeducted={extraData.amount}
            carImage={(extraData.carImage === "string" || extraData.carImage === "") ? img_noCar : extraData.carImage}
            currency={extraData.currency}
          />
        );
        setShowFooter(true);
        break;


      case 9:
        setPageData(
          <S_nine
            apologyMessage={extraData.apologyMessage}
            carImage={(extraData.carImage === "string" || extraData.carImage === "") ? img_noCar : extraData.carImage}
          />
        );
        setShowFooter(true);
        break;


      case 10:
        setPageData(
          <S_ten
            apologyTitle={extraData.apologyTitle}
            apologyDescription={extraData.apologyDescription}
            carImage={(extraData.carImage === "string" || extraData.carImage === "") ? img_noCar : extraData.carImage}
          />
        );
        setShowFooter(true);
        break;


      case 11:
        setPageData(
          <S11
            apologyTitle={extraData.apologyTitle}
            apologyDescription={extraData.apologyDescription}
            helpDescription={extraData.helpDescription}
            carImage={(extraData.carImage === "string" || extraData.carImage === "") ? img_noCar : extraData.carImage}
          />
        );
        setShowFooter(true);
        break;

        
      default:
        setPageData(
          <S_TWO
            entryTime={extraData.entryTime}
            exitTime={extraData.exitTime}
            length={extraData.lenghtOfStay}
            amount={extraData.amount}
            currency={extraData.currency}
            licencePlate={extraData.licencePlate}
            carImage={(extraData.carImage === "string" || extraData.carImage === "") ? img_noCar : extraData.carImage}
          />
        );
        setShowFooter(true);
        break;
    }

    if (message !== 1) {
      setTimeout(() => {
        setPageData(<S_ONE timerInterval={6} />);
        setShowFooter(false);

      }, DispTime * 1000);
    }
  };

  const sendMessage = (message, extraData = {}) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const messageObj = { message, ...extraData };
      ws.send(JSON.stringify(messageObj));
    } else {
      console.error('WebSocket connection is not open.');
    }
  };


  return (
    <div className="App">
      <InfoContainer iconSrc={infoData.iconSrc} name_point={infoData.name_point} exit={infoData.exit_point} timezone={infoData.timezone} />
      {pageData}
      {showFooter && <Footer timerFooter={6} />}
    </div>
  );
}

export default App;



