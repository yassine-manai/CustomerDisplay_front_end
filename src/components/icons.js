import entryIcon from "../assets/icons/ENTRY.svg";
import exitIcon from "../assets/icons/EXIT.svg";
import CarIconwbg from "../assets/icons/CarIconwbg.svg";
import React from 'react'

export function CarIcon() {
    return (
      <div className="car-icon-container">
        {" "}
        <img
          loading="lazy"
          src={CarIconwbg}
          className="car-icon"
          alt="Car icon"
        />{" "}
      </div>
    );
  }
  export function ClockIcon() {
    return (
      <div className="clock-icon-container">
        {" "}
        <img
          loading="lazy"
          src={entryIcon}
          className="clock-icon"
          alt="Clock icon"
        />{" "}
      </div>
    );
  }
  export function ExitIcon() {
    return (
      <div className="exit-icon-container">
        {" "}
        <img
          loading="lazy"
          src={exitIcon}
          className="exit-icon"
          alt="Exit icon"
        />{" "}
      </div>
    );
  }
