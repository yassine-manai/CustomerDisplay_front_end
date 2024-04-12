import React, { useState, useEffect } from "react";
import '../styles/infocop.css';
import calenderIcon from "../assets/icons/calendar-time.svg";

function LocationInfo({ location }) {
  return (
    <div className="location-info">
      <img
        loading="lazy"
        src={location.iconSrc}
        alt="Location icon"
        className="location-icon"
      />
      <div className="location-details">
        <span className="location-name">{location.name}</span>
        &nbsp;        
        
        <span className="location-name">-</span>

        &nbsp;        

        <span className="location-exit">{location.exit}</span>
      </div>
    </div>
  );
}

function DateTimeInfo({ dateTime, timezone }) {
  const formattedDateTime = new Date(dateTime).toLocaleString(undefined, {
    timeZone: timezone,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // Use 24-hour format
  });

  return (
    <div className="date-time-info">
      <img
        loading="lazy"
        src={calenderIcon}
        alt="Calendar icon"
        className="calendar-icon"
      />
      <div className="date-time">{formattedDateTime}</div>
    </div>
  );
}

function InfoContainer({ location, timezone }) {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="info-container">
      <LocationInfo location={location} />
      <DateTimeInfo dateTime={dateTime} timezone={timezone} />
    </div>
  );
}

export default InfoContainer;
