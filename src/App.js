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
import img_noCar from './assets/img_noCar.png';

const {
  REACT_APP_SUPABASE_URL_WS: wsip,
  REACT_APP_SUPABASE_URL_PORT: wsport,
} = process.env;

let MainScreenTimer = 10;
let BannerScreenTimer = 10;
let CronTimer = 1;

// Fetch and set timer intervals
const fetchTimerIntervals = async () => {
  try {
    const response = await fetch(`http://${wsip}:${wsport}/ads_timer`);
    const data = await response.json();

    MainScreenTimer = data.main_time;
    BannerScreenTimer = data.banner_time;
    CronTimer = data.cron;
    
    localStorage.setItem('MainScreenTimer', MainScreenTimer);
    localStorage.setItem('BannerScreenTimer', BannerScreenTimer);
    localStorage.setItem('CronTimer', CronTimer);

    console.info("Main Screen Timer:", MainScreenTimer);
    console.info("Banner Screen Timer:", BannerScreenTimer);
    console.info("Cron Timer:", CronTimer);

  } catch (error) {
    console.error('Error fetching timer intervals:', error);
  }
};

// Fetch and set location data
const fetchLocationData = async () => {
  try {
    const response = await fetch(`http://${wsip}:${wsport}/infos/get_location_data`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const locationData = await response.json();
    console.log(locationData);
    localStorage.setItem('locationData', JSON.stringify(locationData));
    return {
      iconSrc: icon_PUMC,
      name_point: locationData.name_point,
      exit_point: locationData.exit_point,
      timezone: locationData.timezone,
      cron: locationData.cron
    };
  } catch (error) {
    console.error('Error fetching location data:', error);
    return null;
  }
};

const App = () => {
  const [infoData, setInfoData] = useState({
    iconSrc: icon_PUMC,
    name_point: "CarPark Site",
    exit_point: "Point Name",
    timezone: "Africa/Tunis",
    cron: 1
  });

  const [pageData, setPageData] = useState(<S_ONE timerInterval={MainScreenTimer} />);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      await fetchTimerIntervals();

      const savedMainScreenTimer = parseInt(localStorage.getItem('MainScreenTimer'), 10);
      const savedBannerScreenTimer = parseInt(localStorage.getItem('BannerScreenTimer'), 10);
      const savedCronTimer = parseInt(localStorage.getItem('CronTimer'), 10);

      if (savedMainScreenTimer && savedBannerScreenTimer) {
        MainScreenTimer = savedMainScreenTimer;
        BannerScreenTimer = savedBannerScreenTimer;
        CronTimer = savedCronTimer;
      }

      const locationData = await fetchLocationData();
      if (locationData) {
        setInfoData(locationData);
      }

      const intervalId = setInterval(fetchTimerIntervals, CronTimer * 3600000);
      return () => clearInterval(intervalId);
    };

    initializeApp();
  }, []);

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new WebSocket(`ws://${wsip}:${wsport}/ws`);
      console.log("WebSocket connection established");

      socket.onopen = () => {
        console.log('WebSocket connected');
      };

      socket.onmessage = (event) => {
        try {
          const { message, DispTime, ...extraData } = JSON.parse(event.data);
          handleWebSocketMessage(message, DispTime, extraData);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      socket.onclose = (event) => {
        console.log('WebSocket disconnected', event);
        if (!event.wasClean) {
          setTimeout(connectWebSocket, 5000);  // Retry after 5 seconds
        }
      };
    };

    connectWebSocket();

    return () => {
      // Cleanup WebSocket connection
    };
  }, []);

  const handleWebSocketMessage = (message, DispTime, extraData) => {
    console.log('Received message from WebSocket:', extraData);

    localStorage.setItem('locationData', JSON.stringify(extraData));

    clearTimeout(DispTime);

    switch (message) {
      case 100:
        const newInfoData = {
          iconSrc: icon_PUMC,
          name_point: extraData.name_point,
          exit_point: extraData.exit_point,
          timezone: extraData.timezone
        };
        localStorage.setItem('infoData', JSON.stringify(newInfoData));
        setInfoData(newInfoData);
        console.log('Location data saved successfully');
        break;

      case 110:
        setShowFooter(true);
        break;

      case 1:
        setPageData(<S_ONE timerInterval={MainScreenTimer} />);
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
        setPageData(<S_ONE timerInterval={MainScreenTimer} />);
        setShowFooter(false);
        break;
    }

    if (message !== 1) {
      setTimeout(() => {
        setPageData(<S_ONE timerInterval={MainScreenTimer} />);
        setShowFooter(false);
      }, (DispTime || MainScreenTimer) * 1000); 
    }
  };

  return (
    
    <div className="App">
      <InfoContainer iconSrc={infoData.iconSrc} name_point={infoData.name_point} exit={infoData.exit_point} timezone={infoData.timezone} />
      {pageData}
      {showFooter && <Footer timerFooter={BannerScreenTimer} />}
    </div>
  );
};

export default App;
