import React, { useState, useEffect } from "react";
import '../styles/infocop.css';
import icon_calendar from "../assets/icon_calendar.svg";

function LocationInfo({ iconSrc , name, exit_pt }) {
  return (
    <div className="location-info">
      <img
        loading="lazy"
        src={iconSrc}
        alt=" "
        className="location-icon"
      />
      <div className="location-details">
        <span className="location-name">{name}</span>
        &nbsp;        
        
        <span className="location-name">-</span>

        &nbsp;        

        <span className="location-exit">{exit_pt}</span>
      </div>
    </div>
  );
}

function DateTimeInfo({ dateTime, timezone }) {
  const formattedDateTime = new Date(dateTime).toLocaleString('en-GB', {
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
        src={icon_calendar}
        alt=""
        className="calendar-icon"
      />
      <div className="date-time">{formattedDateTime}</div>
    </div>
  );
}

export default function InfoContainer({ iconSrc, name, exit , timezone }) {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="info-container">
      <LocationInfo iconSrc={iconSrc} name={name} exit_pt={exit} />
      <DateTimeInfo dateTime={dateTime} timezone={timezone} />
    </div>
  );
}

