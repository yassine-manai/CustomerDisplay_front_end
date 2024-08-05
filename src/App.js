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
import S_Eight from './pages/s_eight';
import S_Nine from './pages/s_nine';
import S_Ten from './pages/s_ten';
import S11 from './pages/s11';
import ERRSCRN from './pages/errorScreen';

import icon_PUMC from './assets/icon_PUMC.svg';
import img_noCar from './assets/img_noCar.png';

const {
  REACT_APP_SUPABASE_URL_WS: wsip,
  REACT_APP_SUPABASE_URL_PORT: wsport,
} = process.env;

let defaultMainScreenTimer = 10;
let defaultBannerScreenTimer = 10;
let defaultCronTimer = 60000;
let vissiblePage = "0"
let error = "false";


console.log("Before . . . ",defaultMainScreenTimer);

const savedMainScreenTimer = isNaN(parseInt(localStorage.getItem('MainScreenTimer'), 10))
  ? 10
  : parseInt(localStorage.getItem('MainScreenTimer'), 10);

console.log("Saved mainscreen timer  . . . ", savedMainScreenTimer);


let MainScreenTimer = savedMainScreenTimer;
let BannerScreenTimer = defaultBannerScreenTimer;
let cron = defaultCronTimer


const App = () => 
{
  const [infoData, setInfoData] = useState(
  {
    iconSrc: icon_PUMC,
    name_point: "",
    exit_point: "",
    timezone: "Asia/Kuwait",
    cron: defaultCronTimer,
  });

  const [pageData, setPageData] = useState(<S_ONE timerInterval={MainScreenTimer} />);
  console.log(MainScreenTimer)
  const [errorScreenMessage, setErrorScreenMessage] = useState("");
  const [showFooter, setShowFooter] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);



  const fetchImagesFromApiMain = async () => {
    try {
      const response = await fetch(`http://${wsip}:${wsport}/get_mainScreen`);
      const data = await response.json();
      console.log('Fetched images main:', data);
  
      const imagesArray = data.map(img => img.base64);
      localStorage.removeItem('mainScreenImages');
      localStorage.setItem('mainScreenImages', JSON.stringify(imagesArray));
  
  
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  
  
  const fetchTimerIntervals = async () => 
  {
    console.log("Fetching timer intervals...");
    try 
    {
      const response = await fetch(`http://${wsip}:${wsport}/ads_timer`);
      const data = await response.json();

      MainScreenTimer = data.main_time;
      BannerScreenTimer = data.banner_time;
      defaultCronTimer = data.cron;

      localStorage.setItem('MainScreenTimer', MainScreenTimer);
      localStorage.setItem('BannerScreenTimer', BannerScreenTimer);
      localStorage.setItem('CronTimer', defaultCronTimer);

      console.info("Main Screen Timer:", MainScreenTimer);
      console.info("Banner Screen Timer:", BannerScreenTimer);
      console.info("Cron Timer:", defaultCronTimer);
    }
    catch (error) 
    {
      console.error('Error fetching timer intervals:', error);
    }
  };

  // fetch location Data function
  const fetchLocationData = async () => 
  {
    console.log("Fetching location data...");
    try
    {
      const response = await fetch(`http://${wsip}:${wsport}/infos/get_location_data`);
      if (!response.ok) 
      {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      if (response.status == 200)
      { 
        const locationData = await response.json();
        console.log(locationData);

        localStorage.setItem('locationData', JSON.stringify(locationData));

        return {
          iconSrc: icon_PUMC,
          name_point: locationData.name_point,
          exit_point: locationData.exit_point,
          timezone: locationData.timezone,
        };
        error = "false";
      }

      if (response.status==404)
      {
        return {
          iconSrc: icon_PUMC,
          name_point: " ",
          exit_point: " ",
          timezone: " ",
        };  
        error = "true";
      }
    } 
    catch (error) 
    {
      console.error('Error fetching location data:', error);
    }
  };


  const initializeApp = async () => 
  {
    console.log("Initializing app...");

    await fetchTimerIntervals();
    await fetchImagesFromApiMain();

    const savedMainScreenTimer = parseInt(localStorage.getItem('MainScreenTimer'), 10);
    const savedBannerScreenTimer = parseInt(localStorage.getItem('BannerScreenTimer'), 10);
    const savedCronTimer = parseInt(localStorage.getItem('CronTimer'), 10);
    console.log("Saved mainscreen timer  . . . ",savedMainScreenTimer)

    if (savedMainScreenTimer && savedBannerScreenTimer) 
    {
      MainScreenTimer = savedMainScreenTimer;
      BannerScreenTimer = savedBannerScreenTimer;
      defaultCronTimer = savedCronTimer;

      console.log("Saved main screen timer wst el function . . . ",MainScreenTimer);

    }

    const locationData = await fetchLocationData();

    if (locationData) 
    {
      setInfoData(locationData);
    }
  };

  
  useEffect(() => {
    const fetchCronData = setInterval(() => {
      fetchImagesFromApiMain();
      fetchTimerIntervals();

      window.location.reload(true); 
      console.log("Cron job executed");

    }, defaultCronTimer);

    return () => clearInterval(fetchCronData);
  }, [defaultCronTimer]);


  const connectWebSocket = () => {
    const socket = new WebSocket(`ws://${wsip}:${wsport}/ws`);
    console.log("Connection established");

    socket.onopen = () => {
      console.log('Connected');
    };

    socket.onmessage = (event) => {
      try {
        console.log("WebSocket message received:", event.data);
        const { message, DispTime, ...extraData } = JSON.parse(event.data);
        handleWebSocketMessage(message, DispTime, extraData);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setErrorScreenMessage('Unable to connect to Ads backend');
    };

  };


  useEffect(() => 
  {
    connectWebSocket();
    
    if (connectWebSocket) 
    {
      initializeApp();
      connectWebSocket();
    }
    else 
    {
      return false
    }
  },
  []);


  const handleWebSocketMessage = (message, DispTime, extraData) => {
    console.log("Handling WebSocket message:", message, DispTime, extraData);

    if (timeoutId) 
    {
      clearTimeout(timeoutId);
      console.log("Cleared previous timeout:", timeoutId);
    }

    const timeoutDuration = DispTime * 1000;

    updatePageBasedOnMessage(message, extraData, timeoutDuration);
  };

  const updatePageBasedOnMessage = (message, extraData, timeoutDuration) => 
  {
    const updatePage = (pageComponent, showFooter) => {
      let timeAction = Date.now()
      console.log(timeAction)

      vissiblePage = pageComponent.type.name + timeAction

      console.log("Updating page to component:", vissiblePage);

      setPageData(pageComponent);
      setShowFooter(showFooter);

      console.log("Page finushed to run go back to idle after :" + timeoutDuration);

      const newTimeout = setTimeout(() => {
        //console.log("***************************show display 1:",pageComponent.type.name,'+++',vissiblePage);

        if (pageComponent.type.name + timeAction === vissiblePage) {
          // Revert to default screen
          setPageData(<S_ONE timerInterval={MainScreenTimer} />);
          setShowFooter(false);
        }

      }, timeoutDuration);

      // Update timeoutId with the new timeout
      setTimeoutId(newTimeout);
      console.log("New timeout set:", newTimeout);
    };

    switch (message) {
      case 1:
        updatePage(<S_ONE timerInterval={MainScreenTimer} />, false);
        break;

      case 2:
        updatePage(
          <S_TWO
            entryTime={extraData.entryTime}
            exitTime={extraData.exitTime}
            length={extraData.lenghtOfStay}
            amount={extraData.amount}
            currency={extraData.currency}
            licencePlate={extraData.licencePlate}
            carImage={(extraData.carImage === "string" || extraData.carImage === "") ? img_noCar : extraData.carImage}
          />,
          true
        );
        break;
      case 3:
        updatePage(
          <S_Three
            paymentSuccess={extraData.paymentSuccess}
            visitMessage={extraData.visitMessage}
          />,
          true
        );
        break;
      case 4:
        updatePage(
          <S_Four
            name={extraData.name}
            thankYouMessage={extraData.thankYouMessage}
            licencePlate={extraData.licencePlate}
            entryTime={extraData.entryTime}
            exitTime={extraData.exitTime}
            lengthOfStay={extraData.lenghtOfStay}
            currency={extraData.currency}
            amountLabel={extraData.amountLabel}
            amountDeducted={extraData.amount}
            carImage={(extraData.carImage === "string" || extraData.carImage === "") ? img_noCar : extraData.carImage}
          />,
          true
        );
        break;
      case 5:
        updatePage(
          <S_Five
            name={extraData.name}
            thankYouMessage={extraData.thankYouMessage}
            licencePlate={extraData.licencePlate}
            entryTime={extraData.entryTime}
            exitTime={extraData.exitTime}
            lengthOfStay={extraData.lenghtOfStay}
            carImage={(extraData.carImage === "string" || extraData.carImage === "") ? img_noCar : extraData.carImage}
          />,
          true
        );
        break;
      case 6:
        updatePage(
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
          />,
          true
        );
        break;
      case 7:
        updatePage(
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
          />,
          true
        );
        break;
      case 8:
        updatePage(
          <S_Eight
            name={extraData.name}
            thankYouMessage={extraData.thankYouMessage}
            licencePlate={extraData.licencePlate}
            entryTime={extraData.entryTime}
            exitTime={extraData.exitTime}
            lengthOfStay={extraData.lenghtOfStay}
            amountDeducted={extraData.amount}
            carImage={(extraData.carImage === "string" || extraData.carImage === "") ? img_noCar : extraData.carImage}
            currency={extraData.currency}
          />,
          true
        );
        break;
      case 9:
        updatePage(
          <S_Nine
            apologyMessage={extraData.apologyMessage}
            carImage={(extraData.carImage === "string" || extraData.carImage === "") ? img_noCar : extraData.carImage}
          />,
          true
        );
        break;
      case 10:
        updatePage(
          <S_Ten
            apologyTitle={extraData.apologyTitle}
            apologyDescription={extraData.apologyDescription}
            carImage={(extraData.carImage === "string" || extraData.carImage === "") ? img_noCar : extraData.carImage}
          />,
          true
        );
        break;
      case 11:
        updatePage(
          <S11
            apologyTitle={extraData.apologyTitle}
            apologyDescription={extraData.apologyDescription}
            helpDescription={extraData.helpDescription}
            carImage={(extraData.carImage === "string" || extraData.carImage === "") ? img_noCar : extraData.carImage}
          />,
          true
        );
        break;

      default:
        updatePage(<S_ONE timerInterval={MainScreenTimer} />, false);
        break;
    }

    //console.log("-----Message", message, "Display Time", timeoutDuration);
  };

  return (
    <div className="App">

      <InfoContainer iconSrc={infoData.iconSrc}
        name_point={infoData.name_point}
        exit={infoData.exit_point}
        timezone={infoData.timezone}
      />
      {errorScreenMessage 
      ?       
      (<ERRSCRN messageText={errorScreenMessage} />) 
      : 
      (
        <>
          {pageData}
          {showFooter && <Footer timerFooter={BannerScreenTimer} />}
        </>
      )}
    </div>
  );
};



export default App;
