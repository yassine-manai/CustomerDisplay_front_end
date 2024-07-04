import React from "react";
import '../styles/s_four.css';

import { ClockIcon, CarIcon, ExitIcon } from "../components/icons";


export default function s_four({
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
      <div className="order-summary4">
        <div className="order-summary-title4">Order Summary</div>
        <div className="order-summary-divider4" />
        <div className="order-summary-content4">
          <div className="order-summary-row4">
            <div className="order-summary-image-column4">
              <img
                loading="lazy"
                src={carImage}
                className="order-summary-image4"
                alt=""
                height={450}
                width={500}
              />
            </div>
            <div className="order-summary-details-column4">
              <div className="order-summary-details4">
                <div className="order-summary-detail4">
                  <CarIcon />
                  <div className="order-summary-detail-label4">Licence Plate</div>
                  <div className="order-summary-detail-value4">{licencePlate}</div>
                </div>
                <div className="order-summary-detail4">
                  <ClockIcon />
                  <div className="order-summary-detail-label4">Entry Time</div>
                  <div className="order-summary-detail-value4">{entryTime}</div>
                </div>
                <div className="order-summary-detail4">
                  <ExitIcon />
                  <div className="order-summary-detail-label4">Exit Time</div>
                  <div className="order-summary-detail-value4">{exitTime}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-summary-footer4">
          <div className="order-summary-footer-row4">
            <div className="order-summary-footer-column4">
              <div className="order-summary-length-of-stay4">
                <div className="order-summary-length-of-stay-label4">Length of Stay</div>
                <div className="order-summary-length-of-stay-value4">{lengthOfStay}</div>
              </div>
            </div>
            <div className="order-summary-footer-column4">
              <div className="order-summary-amount-deducted4">
                <div className="order-summary-amount-deducted-label4">Amount Deduced From Wallet</div>
                <div className="order-summary-amount-deducted-value4">
                  <span className="amount-deducted-value4">{amountDeducted}</span>
                  <span className="amount-deducted-currency4"> {currency} </span>
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
      <div className="thank-you-message-container4">
        <div className="thank-you-avatar-container4">
          <img
            loading="lazy"
            alt=" "
            height={500}
            width={500}
            className="thank-you-avatar4"
          />
        </div>
        <div className="thank-you-message4">{message}</div>
        <div className="drive-safe-message42">{name}</div>
        <div className="drive-safe-message4">Drive Safe !</div>

      </div>
    );
  }

  return (
    <div className="container4">
      <main className="main-container4">
        <div className="content-wrapper4">
          <div className="column-container4">
            <ThankYouMessage name={name} message={thankYouMessage} />
          </div>
          <div className="column-container4">
            <OrderSummary {...orderSummaryData} />
          </div>
        </div>
      </main>
    </div>
  );
}

