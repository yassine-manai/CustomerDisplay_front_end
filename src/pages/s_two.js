import '../styles/s_two.css';
import * as React from "react";
import { useState } from "react";
import carIcon from "../assets/icons/carIcon.svg"
import entry from "../assets/icons/ENTRY.svg"
import exit from "../assets/icons/EXIT.svg"
import clock from "../assets/icons/clock.svg"


function S_TWO() {


  const [orderDetails, setOrderDetails] = useState([
    {
      icon: entry,
      label: "Entry Time",
      value: "21-02-2024 14:36",
    },
    {
      icon: exit,
      label: "Exit time",
      value: "21-02-2024 14:36",
    },
    {
      icon: clock, 
      label: "Length of stay",
      value: "2 hours 31 minutes",
    },
  ]);

  return (

        <div className="container2">

        <div className="order-summary">
      <div className="order-details">
        <h2 className="order-title">Order Summary</h2>
        <div className="separator_vertical" />

        {orderDetails.map((detail, index) => (
          <div key={index} className="detail-row">
            <div className="detail-label">
              <div className="icon-container">
                <img src={detail.icon} alt="" className="icon" />
              </div>
              <div className="label">{detail.label}</div>
            </div>
            <div className="detail-value">{detail.value}</div>
          </div>
        ))}
        <div className="amount-container">
          <div className="amount-label">Amount to pay</div>
          <div className="amount-value">
            <span className="amount">0.400</span>{" "}
            <span className="currency">KWD</span>
          </div>
        </div>
      </div>
      <div className="separator" />
      <div className="plate-number">
        <div className="plate-label">
          <div className="icon-container">
            <img src={carIcon}
             alt="" className="icon" />
          </div>
          <div className="label">E22714</div>
        </div>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/fdd590999e484b2609125fd20c5ce9b98f3b5d73d03954284cb3832ff751c513?apiKey=3a9f9b98de3f493789d8094471d44942&" 
        alt="Plate number" className="plate-image" />
      </div>
     </div>

     </div>
  );
}


export default S_TWO;
