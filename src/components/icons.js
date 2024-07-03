import icon_EntryNF from "../assets/icon_EntryNF.svg";
import icon_ExitNF from "../assets/icon_ExitNF.svg";
import icon_cardSearch_NF from "../assets/icon_cardSearch_NF.svg";
import React from 'react'

export function CarIcon() {
    return (
      <div className="car-icon-container">
        {" "}
        <img
          loading="lazy"
          src={icon_cardSearch_NF}
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
          src={icon_EntryNF}
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
          src={icon_ExitNF}
          className="exit-icon"
          alt="Exit icon"
        />{" "}
      </div>
    );
  }
