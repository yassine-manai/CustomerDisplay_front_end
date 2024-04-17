import '../styles/s_two.css';
import * as React from "react";
import { useState } from "react";
import carIcon from "../assets/icons/carIcon.svg"
import entry from "../assets/icons/ENTRY.svg"
import exit from "../assets/icons/EXIT.svg"
import clock from "../assets/icons/clock.svg"


export default function S_TWO(
  {
    entryTime,
    exitTime,
    length,
    amount,
    curreny,
    pathImage,
    licencePlate
  }
) {


  const [orderDetails] = useState([
    {
      icon: entry,
      label: "Entry Time",
      value: entryTime,
    },
    {
      icon: exit,
      label: "Exit time",
      value: exitTime,
    },
    {
      icon: clock, 
      label: "Length of stay",
      value: length,
    },
  ]);

  return (

        <div className="container2">

        <div className="order-summary2">
      <div className="order-details2">
        <h2 className="order-title2">Order Summary</h2>
        <div className="separator_vertical2" />

        {orderDetails.map((detail, index) => (
          <div key={index} className="detail-row2">
            <div className="detail-label2">
              <div className="icon-container2">
                <img src={detail.icon} alt="" className="icon" />
              </div>
              <div className="label2">{detail.label}</div>
            </div>
            <div className="detail-value2">{detail.value}</div>
          </div>
        ))}
        <div className="amount-container2">
          <div className="amount-label2">Amount to pay</div>
          <div className="amount-value2">
            <span className="amount2">{amount}</span>{" "}
            <span className="currency2">{curreny}</span>
          </div>
        </div>
      </div>
      <div className="separator2" />
      <div className="plate-number2">
        <div className="plate-label2">
          <div className="icon-container2">
            <img src={carIcon}
             alt="" className="icon2" />
          </div>
          <div className="label2">{licencePlate}</div>
        </div>
        <img src={pathImage} 
        alt="Plate number"
        height={440}
        width={400}
        className="plate-image2"
         />
      </div>
     </div>

     </div>
  );
}


