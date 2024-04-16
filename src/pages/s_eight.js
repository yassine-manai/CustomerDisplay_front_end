import React from "react";
import '../styles/s_eight.css';

import { ClockIcon, CarIcon, ExitIcon } from "../components/icons";


export default function S_eight({
  name,
  thankYouMessage,
  licencePlate,
  entryTime,
  exitTime,
  lengthOfStay,
  amountDeducted,
  currency,
  carImage
}) {
  const orderSummaryData = {
    licencePlate,
    entryTime,
    exitTime,
    lengthOfStay,
    amountDeducted,
    currency,
  };

  function OrderSummary({
    licencePlate,
    entryTime,
    exitTime,
    lengthOfStay,
    amountDeducted,
    currency,

  }) {
    return (
      <div className="order-summary">
        <div className="order-summary-title">Order Summary</div>
        <div className="order-summary-divider" />
        <div className="order-summary-content">
          <div className="order-summary-row">
            <div className="order-summary-image-column">
              <img
                loading="lazy"
                src={carImage}
                className="order-summary-image"
                alt="Order summary"
                height={200}
                width={200}
              />
            </div>
            <div className="order-summary-details-column">
              <div className="order-summary-details">
                <div className="order-summary-detail">
                  <CarIcon />
                  <div className="order-summary-detail-label">Licence Plate</div>
                  <div className="order-summary-detail-value">{licencePlate}</div>
                </div>
                <div className="order-summary-detail">
                  <ClockIcon />
                  <div className="order-summary-detail-label">Entry Time</div>
                  <div className="order-summary-detail-value">{entryTime}</div>
                </div>
                <div className="order-summary-detail">
                  <ExitIcon />
                  <div className="order-summary-detail-label">Exit Time</div>
                  <div className="order-summary-detail-value">{exitTime}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-summary-footer">
          <div className="order-summary-footer-row">
            <div className="order-summary-footer-column">
              <div className="order-summary-length-of-stay">
                <div className="order-summary-length-of-stay-label">Length of Stay</div>
                <div className="order-summary-length-of-stay-value">{lengthOfStay}</div>
              </div>
            </div>
            <div className="order-summary-footer-column">
              <div className="order-summary-amount-deducted">
                <div className="order-summary-amount-deducted-label">Amount to Pay</div>
                <div className="order-summary-amount-deducted-value">
                  <span className="amount-deducted-value">{amountDeducted}</span>
                  <span className="amount-deducted-currency"> {currency}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function ThankYouMessage({ name, message }) {
    return (
      <div className="thank-you-message-container">
        <div className="thank-you-avatar-container">
          <img
            loading="lazy"
            alt="Avatar"
            className="thank-you-avatar"
          />
        </div>
        <div className="drive-safe-message">Hello {name}</div>
        <div className="thank-you-message">{message}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <main className="main-container">
        <div className="content-wrapper">
          <div className="column-container">
            <ThankYouMessage name={name} message={thankYouMessage} />
          </div>
          <div className="column-container">
            <OrderSummary {...orderSummaryData} />
          </div>
        </div>
      </main>
    </div>
  );
}

