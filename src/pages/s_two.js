import '../styles/s_two.css';
import * as React from "react";
import { useState } from "react";
import icon_cardSearch_NF from "../assets/icon_cardSearch_NF.svg";
import icon_EntryNF from "../assets/icon_EntryNF.svg";
import icon_ExitNF from "../assets/icon_ExitNF.svg";
import icon_clockNF from "../assets/icon_clockNF.svg"
import img_noCar from "../assets/img_noCar.png"

export default function S_TWO(
  {
    entryTime,
    exitTime,
    length,
    amount,
    currency,
    pathImage,
    licencePlate
  }
) {
  const [orderDetails] = useState([
    {
      icon: icon_EntryNF,
      label: "Entry Time",
      value: entryTime,
    },
    {
      icon: icon_ExitNF,
      label: "Exit time",
      value: exitTime,
    },
    {
      icon: icon_clockNF,
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
              <span className="currency2">{currency}</span>
            </div>
          </div>
        </div>
        <div className="separator2" />
        <div className="plate-number2">
          <div className="plate-label2">
            <div className="icon-container2">
              <img src={icon_cardSearch_NF}
                alt="" className="icon2" />
            </div>
            <div className="label2">{licencePlate}</div>
          </div>
          <br></br>
          <img
            src={pathImage ? pathImage : img_noCar}
            alt=" "
            height={460}
            width={300}
            className="plate-image2"
          />

        </div>
      </div>

    </div>
  );
}


