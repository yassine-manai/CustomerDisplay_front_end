import React, { useState, useEffect } from "react";

function LocationInfo({ location }) {
  return (
    <div className="location-info">
      <img
        loading="lazy"
        src={location.iconUrl}
        alt="Location icon"
        className="location-icon"
      />
      <div className="location-details">
        <span className="location-name">{location.name}</span>
        <span className="location-exit">{location.exit}</span>
      </div>
    </div>
  );
}

function DateTimeInfo({ dateTime }) {
  return (
    <div className="date-time-info">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/58abe014bb706cf21db43820b039c47e1bb9196153111be016a0c1c7d2ddd849?apiKey=3a9f9b98de3f493789d8094471d44942&"
        alt="Calendar icon"
        className="calendar-icon"
      />
      <div className="date-time">{dateTime}</div>
    </div>
  );
}

function InfoContainer({ location }) {
  const [dateTime, setDateTime] = useState(getFormattedDateTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(getFormattedDateTime());
    }, 60000); // Update every minute (60000 milliseconds)

    return () => clearInterval(interval);
  }, []);

  function getFormattedDateTime() {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  return (
    <div className="info-container">
      <LocationInfo location={location} />
      <DateTimeInfo dateTime={dateTime} />
    </div>
  );
}

export default InfoContainer;
