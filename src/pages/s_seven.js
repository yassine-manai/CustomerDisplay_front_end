import '../styles/s_seven.css';

import {ClockIcon , CarIcon ,ExitIcon } from "../components/icons";
import * as React from "react";
import entry from "../assets/icons/ENTRY.svg"
import exit from "../assets/icons/EXIT.svg"
import clock from "../assets/icons/clock.svg"



import { useState } from "react";

function S_seven() {

  const orderSummaryData = {
    licencePlate: "E22714",
    entryTime: "21-02-2024 14:36",
    exitTime: "21-02-2024 14:36",
    lengthOfStay: "3 hours 31 minutes",
    amountDeducted: "2.500",
  };

  function OrderSummary({
    licencePlate,
    entryTime,
    exitTime,
    lengthOfStay,
    amountDeducted,
  }) {
    return (
      <div className="order-summary">
        {" "}
        <div className="order-summary-title">Order Summary</div>{" "}
        <div className="order-summary-divider" />{" "}
        <div className="order-summary-content">
          {" "}
          <div className="order-summary-row">
            {" "}
            <div className="order-summary-image-column">
              {" "}
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/274d95565356b4f68717c93fe1f6a8558b08d62b56b5c5922090c936304b6b6c?apiKey=3a9f9b98de3f493789d8094471d44942&"
                className="order-summary-image"
                alt="Order summary"
              />{" "}
            </div>{" "}
            <div className="order-summary-details-column">
              {" "}
              <div className="order-summary-details">
                {" "}
                <div className="order-summary-detail">
                  {" "}
                  <CarIcon />{" "}
                  <div className="order-summary-detail-label">
                    Licence Plate
                  </div>{" "}
                  <div className="order-summary-detail-value">{licencePlate}</div>{" "}
                </div>{" "}
                <div className="order-summary-detail">
                  {" "}
                  <ClockIcon />{" "}
                  <div className="order-summary-detail-label">
                    Entry Time
                  </div>{" "}
                  <div className="order-summary-detail-value">{entryTime}</div>{" "}
                </div>{" "}
                <div className="order-summary-detail">
                  {" "}
                  <ExitIcon />{" "}
                  <div className="order-summary-detail-label">Exit time</div>{" "}
                  <div className="order-summary-detail-value">{exitTime}</div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="order-summary-footer">
          {" "}
          <div className="order-summary-footer-row">
            {" "}
            <div className="order-summary-footer-column">
              {" "}
              <div className="order-summary-length-of-stay">
                {" "}
                <div className="order-summary-length-of-stay-label">
                  {" "}
                  Length of stay{" "}
                </div>{" "}
                <div className="order-summary-length-of-stay-value">
                  {" "}
                  {lengthOfStay}{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="order-summary-footer-column">
              {" "}
              <div className="order-summary-amount-deducted">
                {" "}
                <div className="order-summary-amount-deducted-label">
                  {" "}
                  Amount to pay{" "}
                </div>{" "}
                <div className="order-summary-amount-deducted-value">
                  {" "}
                  <span className="amount-deducted-value">
                    {amountDeducted}
                  </span>{" "}
                  <span className="amount-deducted-currency">KWD</span>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
  function ThankYouMessage({ name }) {
    return (
      <div className="thank-you-message-container">
        {" "}
        <div className="thank-you-avatar-container">
          {" "}
          <img
            loading="lazy"
            alt=""
            height={200}
            width={200}
            className="thank-you-avatar"
          />{" "}
        </div>{" "}   
          
        <div className="drive-safe-message"> Hello {name} </div>{" "}

        <div className="thank-you-message">
          {" "}
          You exceed your   <br /> booking period {" "}
        </div>{" "}
      </div>
    );
  }

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
    <div className="container">
        

        <>
      {" "}
      <main className="main-container">
        {" "}
        <div className="content-wrapper">
          {" "}
          <div className="column-container">
            {" "}
            <ThankYouMessage name="Mr Rami Hedfi" />{" "}
          </div>{" "}
          <div className="column-container">
            {" "}
            <OrderSummary {...orderSummaryData} />{" "}
          </div>{" "}
        </div>{" "}
        
      </main>{" "}
    </>
        
    </div>
  );
}


export default S_seven;