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
      <div className="order-summary8">
        <div className="order-summary-title8">Order Summary</div>
        <div className="order-summary-divider8" />
        <div className="order-summary-content8">
          <div className="order-summary-row8">
            <div className="order-summary-image-column8">
              <img
                src={carImage}
                className="order-summary-image8"
                alt="Order summary"
                height={450}
                width={500}
              />
            </div>
            <div className="order-summary-details-column8">
              <div className="order-summary-details8">
                <div className="order-summary-detail8">
                  <CarIcon />
                  <div className="order-summary-detail-label8">Licence Plate</div>
                  <div className="order-summary-detail-value88">{licencePlate}</div>
                </div>
                <div className="order-summary-detail8">
                  <ClockIcon />
                  <div className="order-summary-detail-label8">Entry Time</div>
                  <div className="order-summary-detail-value8">{entryTime}</div>
                </div>
                <div className="order-summary-detail8">
                  <ExitIcon />
                  <div className="order-summary-detail-label8">Exit Time</div>
                  <div className="order-summary-detail-value8">{exitTime}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-summary-footer8">
          <div className="order-summary-footer-row8">
            <div className="order-summary-footer-column8">
              <div className="order-summary-length-of-stay8">
                <div className="order-summary-length-of-stay-label8">Length of Stay</div>
                <div className="order-summary-length-of-stay-value8">{lengthOfStay}</div>
              </div>
            </div>
            <div className="order-summary-footer-column8">
              <div className="order-summary-amount-deducted8">
                <div className="order-summary-amount-deducted-label8">Amount to Pay</div>
                <div className="order-summary-amount-deducted-value8">
                  <span className="amount-deducted-value8">{amountDeducted}</span>
                  <span className="amount-deducted-currency8"> {currency}</span>
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
      <div className="thank-you-message-container8">
        <div className="thank-you-avatar-container8">
          <img
            loading="lazy"
            alt=" "
            height={300}
            width={300}
            className="thank-you-avatar8"
          />
        </div>
        <div className="drive-safe-message8">Hello {name}</div>
        <div className="thank-you-message8">{message}</div>
      </div>
    );
  }

  return (
    <div className="container8">
      <main className="main-container8">
        <div className="content-wrapper8">
          <div className="column-container8">
            <ThankYouMessage name={name} message={thankYouMessage} />
          </div>
          <div className="column-container8">
            <OrderSummary {...orderSummaryData} />
          </div>
        </div>
      </main>
    </div>
  );
}

