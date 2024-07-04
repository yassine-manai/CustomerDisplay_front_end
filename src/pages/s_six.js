import React from "react";
import '../styles/s_six.css';

import { ClockIcon, CarIcon, ExitIcon } from "../components/icons";


export default function s_six({
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
      <div className="order-summary6">
        <div className="order-summary-title6">Order Summary</div>
        <div className="order-summary-divider6" />
        <div className="order-summary-content6">
          <div className="order-summary-row6">
            <div className="order-summary-image-column6">
              <img
                loading="lazy"
                src={carImage}
                className="order-summary-image6"
                alt=" "
                height={450}
                width={500}
              />
            </div>
            <div className="order-summary-details-column6">
              <div className="order-summary-details6">
                <div className="order-summary-detail6">
                  <CarIcon />
                  <div className="order-summary-detail-label6">Licence Plate</div>
                  <div className="order-summary-detail-value6">{licencePlate}</div>
                </div>
                <div className="order-summary-detail6">
                  <ClockIcon />
                  <div className="order-summary-detail-label6">Entry Time</div>
                  <div className="order-summary-detail-value6">{entryTime}</div>
                </div>
                <div className="order-summary-detail6">
                  <ExitIcon />
                  <div className="order-summary-detail-label6">Exit Time</div>
                  <div className="order-summary-detail-value6">{exitTime}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-summary-footer6">
          <div className="order-summary-footer-row6">
            <div className="order-summary-footer-column6">
              <div className="order-summary-length-of-stay6">
                <div className="order-summary-length-of-stay-label6">Length of Stay</div>
                <div className="order-summary-length-of-stay-value6">{lengthOfStay}</div>
              </div>
            </div>
            <div className="order-summary-footer-column6">
              <div className="order-summary-amount-deducted6">
                <div className="order-summary-amount-deducted-label6">Amount to Pay</div>
                <div className="order-summary-amount-deducted-value6">
                  <span className="amount-deducted-value6">{amountDeducted}</span>
                  <span className="amount-deducted-currency6"> {currency}</span>
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
      <div className="thank-you-message-container6">
        <div className="thank-you-avatar-container6">
          <img
            loading="lazy"
            height={500}
            width={500}
            className="thank-you-avatar6"
          />
        </div>
        <div className="drive-safe-message6">Hello {name}</div>
        <div className="thank-you-message6">{message}</div>
      </div>
    );
  }

  return (
    <div className="container6">
      <main className="main-container6">
        <div className="content-wrapper6">
          <div className="column-container6">
            <ThankYouMessage name={name} message={thankYouMessage} />
          </div>
          <div className="column-container6">
            <OrderSummary {...orderSummaryData} />
          </div>
        </div>
      </main>
    </div>
  );
}

